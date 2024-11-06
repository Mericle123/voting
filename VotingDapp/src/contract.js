// src/contract.js
import web3 from './web3';
import Voting from './abis/Voting.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with actual deployed address
const contractInstance = new web3.eth.Contract(Voting.abi, contractAddress);

export default contractInstance;
