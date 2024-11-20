import React, { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "../Voting.json"; // Import the ABI file

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentVotes, setCurrentVotes] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState("");
  const contractAddress = "0x2feFD39aEd960c90d86d452835968DC951241188"; // Replace with your contract address

  // Initialize Web3 and the contract
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(
            abi.abi,
            contractAddress
          );
          setContract(contractInstance);

          // Request wallet connection
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setConnectedAccount(accounts[0]);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        alert("Please install MetaMask to interact with this application.");
      }
    };

    initializeWeb3();
  }, [contractAddress]);

  // Fetch candidates and their votes from the smart contract
  useEffect(() => {
    const fetchCandidates = async () => {
      if (contract) {
        try {
          const candidateCount = await contract.methods.getCandidateCount().call();
          const fetchedCandidates = [];

          for (let i = 0; i < candidateCount; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            fetchedCandidates.push({
              id: i,
              name: candidate.name,
              party: candidate.party,
              description: candidate.description,
              voteCount: candidate.voteCount.toString(),
            });
          }

          setCandidates(fetchedCandidates);

          // Fetch updated votes
          const votes = fetchedCandidates.map(candidate => candidate.voteCount);
          setCurrentVotes(votes);
        } catch (error) {
          console.error("Error fetching candidates:", error);
        }
      }
    };

    fetchCandidates();
  }, [contract]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4">Voting Results</h2>
      <p className="text-sm mb-4">Connected Wallet: {connectedAccount}</p>
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="border border-[#000080] rounded shadow-lg p-4"
          >
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <p className="text-sm italic">Party: {candidate.party}</p>
            <p className="text-sm">{candidate.description}</p>
            <p className="mt-2 text-lg">
              Votes: {currentVotes[index] || 0} {/* Display vote count */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
