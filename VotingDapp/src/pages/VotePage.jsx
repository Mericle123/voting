import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from "../Voting.json";

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]); // List of candidates
  const [web3, setWeb3] = useState(null); // Web3 instance
  const [contract, setContract] = useState(null); // Smart contract instance
  const [currentAccount, setCurrentAccount] = useState(""); // User's wallet address
  const contractAddress = "0x2feFD39aEd960c90d86d452835968DC951241188";

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Create a Web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setCurrentAccount(accounts[0]);

          // Create contract instance
          const contractInstance = new web3Instance.eth.Contract(abi.abi, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
          alert("Please connect your wallet to use the application.");
        }
      } else {
        alert("Ethereum wallet not detected. Install MetaMask to continue.");
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (contract) {
        try {
          const candidateCount = await contract.methods.getCandidateCount().call();
          const candidatesList = [];
  
          for (let i = 0; i < candidateCount; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            candidatesList.push({
              id: i,
              name: candidate.name,
              party: candidate.party,
              description: candidate.description,
              voteCount: candidate.voteCount.toString(), // Convert BigInt to string
            });
            console.log("voteCount", candidate.voteCount.toString()); // Logs the converted value
          }
  
          setCandidates(candidatesList);
        } catch (error) {
          console.error("Error fetching candidates:", error);
          // alert("Error fetching candidates. Please try again later.");
        }
      }
    };
  
    fetchCandidates();
  }, [contract]);
  

  // Cast a vote
  const castVote = async (candidateId) => {
    if (!contract || !web3) return;

    try {
      await contract.methods.vote(candidateId).send({ from: currentAccount, gas: 300000 });
      alert("Vote cast successfully!");

      
    } catch (error) {
      console.error("Error casting vote:", error);
      // alert("Failed to cast vote. Ensure you have sufficient gas and try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4">Voting Results</h2>
      <div className="space-y-4">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate.id} className="border border-[#000080] rounded shadow-lg p-4">
              <h3 className="text-xl font-semibold">{candidate.name}</h3>
              <p className="text-sm italic">Party: {candidate.party}</p>
              <p className="text-sm">{candidate.description}</p>
              <p className="mt-2 text-lg">Votes: {candidate.voteCount}</p>
              <button
                onClick={() => castVote(candidate.id)}
                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Vote for {candidate.name}
              </button>
            </div>
          ))
        ) : (
          <p>No candidates found. Please check the contract or add candidates.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
