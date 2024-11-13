// ParentComponent.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AdminPage from './AdminPage';
import VotePage from './VotePage';
import ResultsPage from './ResultsPage';
import web3 from './web3';  // Importing the initialized web3 instance

const ParentComponent = () => {
  const [account, setAccount] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);
  
  const addCandidate = (newCandidate) => {
    // Function to add a candidate (this is where the backend integration would go)
    setCandidates((prev) => [...prev, newCandidate]);
  };

  const castVote = (candidateName) => {
    // Handle casting a vote
    setVotes((prevVotes) => ({
      ...prevVotes,
      [candidateName]: (prevVotes[candidateName] || 0) + 1
    }));
  };

  const fetchVotes = () => {
    // Function to fetch votes (could be an API call to a smart contract or database)
    return votes;
  };

  return (
    <div>
      <AdminPage web3={web3} account={account} addCandidate={addCandidate} />
      <VotePage candidates={candidates} account={account} castVote={castVote} />
      <ResultsPage candidates={candidates} votes={votes} fetchVotes={fetchVotes} />
    </div>
  );
};

export default ParentComponent;
