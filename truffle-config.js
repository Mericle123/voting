module.exports = {
  // Network configurations
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost for development
      port: 7545,            // Standard port for Ethereum (use 7545 if you're using Ganache with default settings)
      network_id: "*",       // Match any network id for local development
    },
    // You can add other network configurations (like Rinkeby, Mainnet) here if needed.
  },

  // Compiler configurations
  compilers: {
    solc: {
      version: "^0.8.0",      // Fetch exact version from solc-bin
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion:"byzantium"
      },
    },
  },
};
