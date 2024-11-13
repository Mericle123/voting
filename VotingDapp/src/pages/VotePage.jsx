// VotePage.js
import React, { useState } from 'react';

const VotePage = ({ candidates, castVote, account }) => {
  const [voted, setVoted] = useState(false);
  const adminAddress = '0x66A53a9c4D09bCeb8AdCd062a8A3A18d2dA1c414'; // Replace with actual admin address

  const handleVote = (candidateName) => {
    if (account.toLowerCase() === adminAddress.toLowerCase()) {
      alert("Admin is not allowed to vote.");
      return;
    }
    castVote(candidateName);
    setVoted(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4">Cast Your Vote</h2>
      {!voted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="p-4 border border-[#000080] rounded shadow-lg bg-white hover:bg-[#f0f0ff] transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold">{candidate.name}</h3>
              <p className="text-sm italic">Party: {candidate.party}</p>
              <p className="text-sm mb-4">{candidate.description}</p>
              <button
                onClick={() => handleVote(candidate.name)}
                className="bg-[#000080] text-white font-semibold px-4 py-2 rounded hover:bg-[#0000b3] transition-all duration-300"
              >
                Vote for {candidate.name}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 text-xl animate-bounce text-[#000080]">
          🎉 Thank you for voting!
        </div>
      )}
    </div>
  );
};

export default VotePage;
