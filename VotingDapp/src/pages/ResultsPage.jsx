const ResultsPage = ({ candidates, votes }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-[#000080]">Election Results</h2>
      {candidates.length === 0 ? (
        <p className="text-lg text-gray-600">No candidates available. Please add candidates in the Admin section.</p>
      ) : (
        <ul className="space-y-4">
          {candidates.map((candidate, index) => (
            <li
              key={index}
              className="border-2 border-[#000080] bg-white p-4 rounded-md shadow-md flex justify-between items-center transition-transform duration-300 hover:scale-105"
            >
              <div>
                <p className="text-[#000080] text-xl font-semibold">{candidate.name}</p>
                <p className="text-sm text-[#000080] italic">({candidate.party})</p>
              </div>
              <div className="text-[#000080] font-bold text-lg">
                {votes[candidate.name] || 0} votes
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 text-center">
        <p className="text-[#000080] text-lg font-medium">
          Thank you for participating in the voting process!
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
