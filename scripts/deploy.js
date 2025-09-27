const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy BDAGToken first
  const BDAGToken = await hre.ethers.getContractFactory("BDAGToken");
  const bdagToken = await BDAGToken.deploy(
    "BlockDAG Token",       // name
    "BDAG",                // symbol
    18,                    // decimals
    hre.ethers.utils.parseEther("50") // initial supply: 50 BDAG (user's current balance)
  );

  await bdagToken.deployed();
  console.log("BDAGToken deployed to:", bdagToken.address);

  // Deploy AIPredictionPlatform
  const AIPredictionPlatform = await hre.ethers.getContractFactory("AIPredictionPlatform");
  const aiPredictionPlatform = await AIPredictionPlatform.deploy(
    bdagToken.address,                     // payment token address
    hre.ethers.utils.parseEther("0.1"),   // prediction cost: 0.1 BDAG
    deployer.address                       // AI service wallet (for demo, using deployer)
  );

  await aiPredictionPlatform.deployed();
  console.log("AIPredictionPlatform deployed to:", aiPredictionPlatform.address);

  // Mint additional tokens for testing if needed
  const mintAmount = hre.ethers.utils.parseEther("100"); // 100 BDAG for testing
  await bdagToken.mint(deployer.address, mintAmount);
  console.log("Minted", hre.ethers.utils.formatEther(mintAmount), "BDAG tokens for testing");

  // Approve the platform to spend tokens
  const approveAmount = hre.ethers.utils.parseEther("10"); // 10 BDAG approval
  await bdagToken.approve(aiPredictionPlatform.address, approveAmount);
  console.log("Approved", hre.ethers.utils.formatEther(approveAmount), "BDAG tokens for platform");

  console.log("\n=== Deployment Summary ===");
  console.log("BDAGToken:", bdagToken.address);
  console.log("AIPredictionPlatform:", aiPredictionPlatform.address);
  console.log("Deployer:", deployer.address);
  console.log("Network:", hre.network.name);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contracts: {
      BDAGToken: bdagToken.address,
      AIPredictionPlatform: aiPredictionPlatform.address
    },
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  const fs = require('fs');
  const path = require('path');

  // Ensure deployments directory exists
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Write deployment info
  fs.writeFileSync(
    path.join(deploymentsDir, `${hre.network.name}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`\nDeployment info saved to deployments/${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });