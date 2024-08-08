import { ethers } from 'ethers';
import { packGroth16Proof } from '@anon-aadhaar/core';

const ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "userAddress", "type": "address"},
      {"internalType": "uint256", "name": "nullifierSeed", "type": "uint256"},
      {"internalType": "uint256", "name": "nullifier", "type": "uint256"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "uint256", "name": "signal", "type": "uint256"},
      {"internalType": "uint256[4]", "name": "revealArray", "type": "uint256[4]"},
      {"internalType": "uint256[8]", "name": "groth16Proof", "type": "uint256[8]"},
      {"internalType": "uint256", "name": "nonce", "type": "uint256"},
      {"internalType": "bytes", "name": "signature", "type": "bytes"}
    ],
    "name": "addUserGasless",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "userAddress", "type": "address"}
    ],
    "name": "getUserByAddress",
    "outputs": [
      {"internalType": "uint", "name": "nullifier", "type": "uint"},
      {"internalType": "uint", "name": "nullifierSeed", "type": "uint"},
      {"internalType": "uint[4]", "name": "revealedData", "type": "uint[4]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export async function testGaslessAnonAadhaarIdentity(proofData:any, address:string, userWallet:any) {
  const proofPath = 'proof.json';
  //const proofData = JSON.parse(fs.readFileSync(proofPath, 'utf8'));
  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/e3200dad6bf545df8cd796f1d2dc1875`);
  //const userPrivateKey = process.env.PRIVATE_KEY;
  const relayerPrivateKey = "53f5958e120b121e1b77591ae1276ca5f3d3922d250a5c4af85b94c2ec5da54f";
  if (!relayerPrivateKey) {
    throw new Error("Private keys not found in .env file");
  }

  //const userWallet = new ethers.Wallet(userPrivateKey, provider);
  const relayerWallet = new ethers.Wallet(relayerPrivateKey, provider);
  //console.log("User wallet address:", userWallet.address);
  console.log("Relayer wallet address:", relayerWallet.address);

  const contractAddress = '0x238e5Fa0B3bE9f851AddbC6A3f92ac0566aB041a';
  const contract = new ethers.Contract(contractAddress, ABI, relayerWallet);

  const nullifierSeed = proofData.proof.nullifierSeed;
  const nullifier = proofData.proof.nullifier;
  const timestamp = proofData.proof.timestamp;
  const signal = BigInt(address);
  const revealArray = [
    proofData.proof.ageAbove18,
    proofData.proof.gender,
    proofData.proof.pincode,
    proofData.proof.state
  ];

  const groth16Proof = packGroth16Proof(proofData.proof.groth16Proof);
  const nonce = BigInt(Date.now());

  console.log('NullifierSeed:', nullifierSeed);
  console.log('Nullifier:', nullifier);
  console.log('Timestamp:', timestamp);
  console.log('Signal:', signal);
  console.log('RevealArray:', revealArray);
  console.log('Groth16Proof:', groth16Proof);
  console.log('Nonce:', nonce);

  // Create message hash
  const messageHash = ethers.solidityPackedKeccak256(
    ['address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256[4]', 'uint256[8]', 'uint256'],
    [address, nullifierSeed, nullifier, timestamp, signal, revealArray, groth16Proof, nonce]
  );

  // Sign the message
  
  const signature = await userWallet.signMessage(ethers.getBytes(messageHash));

  try {
    console.log('Adding user gasless...');
    const tx = await contract.addUserGasless(
      address,
      nullifierSeed,
      nullifier,
      timestamp,
      signal,
      revealArray,
      groth16Proof,
      nonce,
      signature
    );
    console.log('Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);

    // Fetch and log user data
    const getUserData = await contract.getUserByAddress(address);
    console.log('User data:', getUserData);
  } catch (error) {
    console.error('Error:', error);
  }
}
