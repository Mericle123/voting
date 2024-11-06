import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({}); // Keeps track of votes for each candidate

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
    setVotes((prevVotes) => ({ ...prevVotes, [candidate.name]: 0 })); // Initialize vote count to 0
  };

  const castVote = (candidateName) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [candidateName]: (prevVotes[candidateName] || 0) + 1,
    }));
  };

  return (
    <Router>
      <div className="min-h-screen text-[#000080]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage candidates={candidates} castVote={castVote} />} />
          <Route path="/results" element={<ResultsPage candidates={candidates} votes={votes} />} />
          <Route path="/admin" element={<AdminPage addCandidate={addCandidate} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
