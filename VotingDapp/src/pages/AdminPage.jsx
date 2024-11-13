// AdminPage.js
import React, { useState, useEffect } from 'react';

const AdminPage = ({ web3, addCandidate, account }) => {
  const [newCandidate, setNewCandidate] = useState({ name: '', party: '', description: '' });
  const [currentAccount, setCurrentAccount] = useState('');
  const adminAddress = '0x66A53a9c4D09bCeb8AdCd062a8A3A18d2dA1c414'; // Replace with your actual admin address

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount('');
        }
      });
    }
  }, []);

  const handleAddCandidate = async () => {
    if (!currentAccount || currentAccount.toLowerCase() !== adminAddress.toLowerCase()) {
      alert('Only the admin can add candidates.');
      return;
    }

    // Deduct ETH before creating a candidate
    try {
      const votePrice = web3.utils.toWei('0.01', 'ether'); // Assuming 0.01 ETH as vote price

      // Send ETH to the admin address
      const transactionHash = await web3.eth.sendTransaction({
        from: currentAccount,
        to: adminAddress,
        value: votePrice,
      });

      console.log('Transaction successful with hash:', transactionHash);

      // Add candidate after transaction is confirmed
      await addCandidate(newCandidate);
      setNewCandidate({ name: '', party: '', description: '' });
      alert('Candidate added successfully!');
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to deduct ETH for candidate creation. Please check your wallet and try again.');
    }
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
