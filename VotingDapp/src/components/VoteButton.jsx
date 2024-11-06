import React from 'react';

function VoteButton({ voted, setVoted }) {
  const handleVote = () => {
    if (!voted) {
      setVoted(true);
      alert('Thank you for casting your vote!');
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`px-6 py-3 rounded-md font-semibold transition-transform duration-200 ${
        voted
          ? 'bg-gray-400 cursor-not-allowed text-white'
          : 'bg-[#000080] text-white hover:bg-[#0000b3] hover:scale-105 active:scale-95'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000080]`}
      disabled={voted}
      aria-disabled={voted}
    >
      {voted ? 'Voted' : 'Vote'}
    </button>
  );
}

export default VoteButton;
