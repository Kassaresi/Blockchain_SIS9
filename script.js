const contractAddress = "0x9D3EE38fD6E4ea7aeFe65f84486236571A058C81";

const abi = [
  {
    "inputs": [],
    "name": "getNote",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_note", "type": "string" }
    ],
    "name": "setNote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

async function init() {
  if (!window.ethereum) {
    alert("MetaMask not detected! Open this page in Chrome + install MetaMask.");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);

  try {
    await provider.send("eth_requestAccounts", []);
  } catch (err) {
    return alert("Connect your MetaMask account!");
  }

  const network = await provider.getNetwork();
  console.log("Network:", network);

  if (network.chainId !== 97) {
    alert("Switch MetaMask to BSC Testnet (Chain ID 97)!");
    return;
  }

  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("setBtn").disabled = false;
  document.getElementById("getBtn").disabled = false;

  console.log("Connected:", await signer.getAddress());
  console.log("Contract:", contract.address);
}

// Set note
async function setNote() {
  try {
    const input = document.getElementById("note").value;
    const tx = await contract.setNote(input);
    await tx.wait();
    alert("Note saved!");
  } catch (e) {
    alert("Error: " + e.message);
  }
}

// Get note
async function getNote() {
  try {
    const data = await contract.getNote();
    document.getElementById("result").innerText = data;
  } catch (e) {
    alert("Error: " + e.message);
  }
}

window.addEventListener("load", init);



