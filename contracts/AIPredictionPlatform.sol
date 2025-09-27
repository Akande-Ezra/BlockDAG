// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIPredictionPlatform is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    IERC20 public immutable paymentToken;
    uint256 public predictionCost;
    address public aiServiceWallet;

    Counters.Counter private _predictionIds;

    struct Prediction {
        uint256 id;
        address user;
        string symptomHash; // IPFS hash or encrypted symptoms
        uint256 timestamp;
        uint256 cost;
        bool fulfilled;
        string resultHash; // IPFS hash of AI prediction result
    }

    mapping(uint256 => Prediction) public predictions;
    mapping(address => uint256[]) public userPredictions;
    mapping(address => uint256) public userTokenBalance;

    event PredictionRequested(
        uint256 indexed predictionId,
        address indexed user,
        string symptomHash,
        uint256 cost
    );

    event PredictionFulfilled(
        uint256 indexed predictionId,
        address indexed user,
        string resultHash
    );

    event TokensDeposited(address indexed user, uint256 amount);
    event TokensWithdrawn(address indexed user, uint256 amount);
    event PredictionCostUpdated(uint256 newCost);
    event AIServiceWalletUpdated(address newWallet);

    constructor(
        address _paymentToken,
        uint256 _predictionCost,
        address _aiServiceWallet
    ) {
        paymentToken = IERC20(_paymentToken);
        predictionCost = _predictionCost;
        aiServiceWallet = _aiServiceWallet;
    }

    modifier onlyAIService() {
        require(msg.sender == aiServiceWallet, "Only AI service can call this");
        _;
    }

    function depositTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            paymentToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        userTokenBalance[msg.sender] += amount;
        emit TokensDeposited(msg.sender, amount);
    }

    function withdrawTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(userTokenBalance[msg.sender] >= amount, "Insufficient balance");

        userTokenBalance[msg.sender] -= amount;
        require(paymentToken.transfer(msg.sender, amount), "Token transfer failed");

        emit TokensWithdrawn(msg.sender, amount);
    }

    function requestPrediction(string memory _symptomHash) external nonReentrant returns (uint256) {
        require(bytes(_symptomHash).length > 0, "Symptom hash cannot be empty");
        require(userTokenBalance[msg.sender] >= predictionCost, "Insufficient token balance");

        _predictionIds.increment();
        uint256 newPredictionId = _predictionIds.current();

        userTokenBalance[msg.sender] -= predictionCost;

        predictions[newPredictionId] = Prediction({
            id: newPredictionId,
            user: msg.sender,
            symptomHash: _symptomHash,
            timestamp: block.timestamp,
            cost: predictionCost,
            fulfilled: false,
            resultHash: ""
        });

        userPredictions[msg.sender].push(newPredictionId);

        emit PredictionRequested(newPredictionId, msg.sender, _symptomHash, predictionCost);

        return newPredictionId;
    }

    function fulfillPrediction(uint256 _predictionId, string memory _resultHash)
        external
        onlyAIService
    {
        require(_predictionId <= _predictionIds.current(), "Invalid prediction ID");
        require(!predictions[_predictionId].fulfilled, "Prediction already fulfilled");
        require(bytes(_resultHash).length > 0, "Result hash cannot be empty");

        predictions[_predictionId].fulfilled = true;
        predictions[_predictionId].resultHash = _resultHash;

        emit PredictionFulfilled(_predictionId, predictions[_predictionId].user, _resultHash);
    }

    function requestPredictionWithPayment(string memory _symptomHash)
        external
        nonReentrant
        returns (uint256)
    {
        require(bytes(_symptomHash).length > 0, "Symptom hash cannot be empty");
        require(
            paymentToken.transferFrom(msg.sender, address(this), predictionCost),
            "Token transfer failed"
        );

        _predictionIds.increment();
        uint256 newPredictionId = _predictionIds.current();

        predictions[newPredictionId] = Prediction({
            id: newPredictionId,
            user: msg.sender,
            symptomHash: _symptomHash,
            timestamp: block.timestamp,
            cost: predictionCost,
            fulfilled: false,
            resultHash: ""
        });

        userPredictions[msg.sender].push(newPredictionId);

        emit PredictionRequested(newPredictionId, msg.sender, _symptomHash, predictionCost);

        return newPredictionId;
    }

    function getUserPredictions(address user) external view returns (uint256[] memory) {
        return userPredictions[user];
    }

    function getPrediction(uint256 _predictionId) external view returns (Prediction memory) {
        require(_predictionId <= _predictionIds.current(), "Invalid prediction ID");
        return predictions[_predictionId];
    }

    function getUserTokenBalance(address user) external view returns (uint256) {
        return userTokenBalance[user];
    }

    function getTotalPredictions() external view returns (uint256) {
        return _predictionIds.current();
    }

    function setPredictionCost(uint256 _newCost) external onlyOwner {
        require(_newCost > 0, "Cost must be greater than 0");
        predictionCost = _newCost;
        emit PredictionCostUpdated(_newCost);
    }

    function setAIServiceWallet(address _newWallet) external onlyOwner {
        require(_newWallet != address(0), "Invalid wallet address");
        aiServiceWallet = _newWallet;
        emit AIServiceWalletUpdated(_newWallet);
    }

    function withdrawAccumulatedFees() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        uint256 totalUserBalances = 0;

        for (uint256 i = 1; i <= _predictionIds.current(); i++) {
            if (predictions[i].user != address(0)) {
                totalUserBalances += userTokenBalance[predictions[i].user];
            }
        }

        uint256 accumulatedFees = balance - totalUserBalances;
        require(accumulatedFees > 0, "No fees to withdraw");

        require(paymentToken.transfer(owner(), accumulatedFees), "Transfer failed");
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(paymentToken.transfer(owner(), balance), "Transfer failed");
    }
}