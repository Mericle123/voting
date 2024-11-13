// ResultsPage.js
import React, { useEffect, useState } from 'react';

const ResultsPage = ({ candidates, votes, fetchVotes }) => {
  const [currentVotes, setCurrentVotes] = useState(votes);

  useEffect(() => {
    const fetchAndSetVotes = async () => {
      const updatedVotes = await fetchVotes(); // Fetch the updated votes
      setCurrentVotes(updatedVotes);
    };
    fetchAndSetVotes();
  }, [fetchVotes]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4">Voting Results</h2>
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="border border-[#000080] rounded shadow-lg p-4">
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <p className="text-sm italic">Party: {candidate.party}</p>
            <p className="text-sm">{candidate.description}</p>
            <p className="mt-2 text-lg">
              Votes: {currentVotes[candidate.name] || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
