import React, { useState, useEffect } from 'react';

const AdminPage = ({ addCandidate, account }) => {
  const [newCandidate, setNewCandidate] = useState({ name: '', party: '', description: '' });
  const [currentAccount, setCurrentAccount] = useState('');
  const adminAddress = '0x66A53a9c4D09bCeb8AdCd062a8A3A18d2dA1c414'; // Replace with your actual admin address

  useEffect(() => {
    // Ensure we set the current account when the component mounts
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      });

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount('');
        }
      });
    }
  }, []);

  const handleAddCandidate = () => {
    console.log('Connected account:', currentAccount);
    console.log('Admin account:', adminAddress);

    if (!currentAccount || currentAccount.toLowerCase() !== adminAddress.toLowerCase()) {
      alert('Only the admin can add candidates.');
      return;
    }

    addCandidate(newCandidate);
    setNewCandidate({ name: '', party: '', description: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4 animate-pulse">Admin - Add Candidate</h2>
      {currentAccount && currentAccount.toLowerCase() === adminAddress.toLowerCase() ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Candidate Name"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080] transition-transform duration-300 transform hover:scale-105"
          />
          <input
            type="text"
            placeholder="Party"
            value={newCandidate.party}
            onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080] transition-transform duration-300 transform hover:scale-105"
          />
          <textarea
            placeholder="Description"
            value={newCandidate.description}
            onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080] transition-transform duration-300 transform hover:scale-105"
          />
          <button
            onClick={handleAddCandidate}
            className="bg-[#000080] text-white px-4 py-2 rounded hover:bg-[#0000b3] transition-colors duration-300 transform hover:scale-105 active:scale-95"
          >
            Add Candidate
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Access denied. Only the admin can add candidates.</p>
      )}
    </div>
  );
};

export default AdminPage;
