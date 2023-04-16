const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = "drop prosper buffalo evolve biology review obey damage owner birth nothing mobile";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
      }
  },
  
  contracts_directory: "./src/contracts",
  contracts_build_directory: './src/abis/',

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
