// import { useState } from "react";
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

// export default function HealthcareDAO() {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [balance, setBalance] = useState("");
//   const [signedMessage, setSignedMessage] = useState("");
//   const [votes, setVotes] = useState({});
//   const proposals = [
//     "Predict Heart Disease Risk",
//     "Cancer Detection Model",
//     "Diabetes Prediction System",
//   ];

//   // Connect wallet with Web3Modal
//   const connectWallet = async () => {
//     try {
//       // Define your Infura API Key
//       const INFURA_ID = "8548d9ec4faa4a529b64e7287139fce7"; // Your Infura Project ID

//       // Configure providers
//       const providerOptions = {
//         injected: {
//           display: {
//             logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
//             name: "MetaMask",
//             description: "Connect with the MetaMask browser extension",
//           },
//           package: null
//         },
//         walletconnect: {
//           package: WalletConnectProvider,
//           options: {
//             infuraId: INFURA_ID, // Use the defined Infura ID here
//             rpc: {
//                 1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // Use the defined Infura ID here
//                 5: `https://goerli.infura.io/v3/${INFURA_ID}`, // Example for Goerli testnet
//             },
//             network: "mainnet",
//           },
//         },
//         coinbasewallet: {
//             package: CoinbaseWalletSDK,
//             options: {
//                 appName: "Healthcare Predictive DAO",
//                 infuraId: INFURA_ID, // Use the defined Infura ID here
//                 rpc: `https://mainnet.infura.io/v3/${INFURA_ID}`, // Example for mainnet
//                 chainId: 1,
//             },
//         },
//       };

//       const web3Modal = new Web3Modal({
//         cacheProvider: false,
//         providerOptions,
//         disableInjectedProvider: false,
//       });

//       const connection = await web3Modal.connect();
//       const provider = new ethers.BrowserProvider(connection);
//       const signer = await provider.getSigner();

//       const address = await signer.getAddress();
//       setWalletAddress(address);

//       const bal = await provider.getBalance(address);
//       setBalance(ethers.formatEther(bal));

//       const message = "Sign in to Healthcare Predictive DAO";
//       const signature = await signer.signMessage(message);
//       setSignedMessage(signature);

//       console.log("✅ Connected:", address);
//       console.log("✍️ Signed Message:", signature);
//     } catch (err) {
//       console.error("Wallet connection failed:", err);
//     }
//   };

//   const vote = (proposal) => {
//     if (!walletAddress) {
//       alert("Connect your wallet first!");
//       return;
//     }
//     if (votes[walletAddress]) {
//       alert("You already voted!");
//       return;
//     }
//     setVotes({ ...votes, [walletAddress]: proposal });
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">
//         Healthcare Predictive Analysis DAO
//       </h1>

//       {!walletAddress ? (
//         <button
//           onClick={connectWallet}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Connect Wallet
//         </button>
//       ) : (
//         <div className="space-y-3">
//           <p><strong>Wallet:</strong> {walletAddress}</p>
//           <p><strong>Balance:</strong> {balance} ETH</p>
//           {signedMessage && (
//             <p className="text-green-600 break-all">
//               ✅ Signed in successfully
//             </p>
//           )}
//         </div>
//       )}

//       <h2 className="text-xl font-semibold mt-6">Proposals</h2>
//       <ul className="mt-3 space-y-2">
//         {proposals.map((p, index) => (
//           <li key={index} className="flex justify-between items-center">
//             <span>{p}</span>
//             <button
//               onClick={() => vote(p)}
//               className="px-3 py-1 bg-green-500 text-white rounded"
//             >
//               Vote
//             </button>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-6">
//         <h3 className="font-semibold">Votes:</h3>
//         <ul>
//           {Object.entries(votes).map(([addr, choice]) => (
//             <li key={addr}>
//               {addr.slice(0, 6)}... voted for <strong>{choice}</strong>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }