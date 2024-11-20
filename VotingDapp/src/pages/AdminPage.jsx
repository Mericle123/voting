import React, { useState, useEffect } from "react";
import Web3 from "web3"; // Import Web3.js
import abi from "../Voting.json"; // Ensure this points to the correct file

const AdminPage = () => {
  const [newCandidate, setNewCandidate] = useState({ name: "", party: "", description: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const adminAddress = "0x66A53a9c4D09bCeb8AdCd062a8A3A18d2dA1c414"; // Replace with actual admin address
  const contractAddress = "0x2feFD39aEd960c90d86d452835968DC951241188"; // Replace with your contract address

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setCurrentAccount(accounts[0]);

          // Set up contract
          const votingContract = new web3Instance.eth.Contract(abi.abi, contractAddress);
          setContract(votingContract);
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          alert("Please connect your wallet to use the admin page.");
        }
      } else {
        alert("MetaMask is not detected. Please install MetaMask to proceed.");
      }
    };

    initializeWeb3();

    // Handle account changes
    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
      }
    });
  }, []);

  const handleAddCandidate = async () => {
    if (!currentAccount || currentAccount.toLowerCase() !== adminAddress.toLowerCase()) {
      alert("Access denied. Only the admin can add candidates.");
      return;
    }

    if (!contract) {
      alert("The contract is not loaded. Please refresh the page.");
      return;
    }

    try {
      // Add a candidate using the contract
      await contract.methods
        .addCandidate(newCandidate.name, newCandidate.party, newCandidate.description)
        .send({ from: currentAccount, gas: 300000 });

      setNewCandidate({ name: "", party: "", description: "" });
      alert("Candidate added successfully!");
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add the candidate. Ensure the contract is deployed and you are the admin.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#000080] mb-4">Admin - Add Candidate</h2>
      {currentAccount && currentAccount.toLowerCase() === adminAddress.toLowerCase() ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Candidate Name"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080]"
          />
          <input
            type="text"
            placeholder="Party"
            value={newCandidate.party}
            onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080]"
          />
          <textarea
            placeholder="Description"
            value={newCandidate.description}
            onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}
            className="w-full p-3 border border-[#000080] rounded outline-none focus:ring-2 focus:ring-[#000080]"
          />
          <button
            onClick={handleAddCandidate}
            className="bg-[#000080] text-white px-4 py-2 rounded hover:bg-[#0000b3]"
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
