import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const HomePage = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminAddress = '0xYourAdminAddressHere'; // Replace with your actual admin address

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Request account access
          const accounts = await web3Instance.eth.requestAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            checkIfAdmin(accounts[0]);
          }

          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
              console.log('Account changed to:', accounts[0]);
              setAccount(accounts[0]);
              checkIfAdmin(accounts[0]);
            } else {
              console.log('MetaMask is locked or no account available');
              setAccount(null);
              setIsAdmin(false);
            }
          });
        } else {
          alert('MetaMask not detected. Please install MetaMask!');
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
        alert('Failed to connect to MetaMask.');
      }
    };

    const checkIfAdmin = (account) => {
      if (account && account.toLowerCase() === adminAddress.toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    initWeb3();
  }, []);

  const connectMetaMask = async () => {
    try {
      if (web3) {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        checkIfAdmin(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
      <h2 className="text-4xl font-bold animate-pulse transition duration-500 hover:text-blue-500">
        Welcome to the Voting DApp
      </h2>
      <p className="mt-4 text-xl transition duration-500 hover:text-gray-700">
        Your trusted platform for fair voting.
      </p>
      {account ? (
        <div className="mt-8 p-6 max-w-sm w-full bg-white border border-blue-400 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-center mb-2">Connected Account</h3>
          <p className="text-center text-lg break-all">{account}</p>
          {isAdmin ? (
            <p className="text-center text-green-500 mt-2">Admin Access</p>
          ) : (
            <p className="text-center text-red-500 mt-2">User Access</p>
          )}
        </div>
      ) : (
        <button
          onClick={connectMetaMask}
          className="mt-8 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition transform duration-300 ease-in-out hover:scale-105"
        >
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};

export default HomePage;
