import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#000080] p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-xl font-bold">
          <Link to="/">Voting DApp</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/vote" className="text-white hover:underline">Vote</Link>
          <Link to="/results" className="text-white hover:underline">Results</Link>
          <Link to="/admin" className="text-white hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
