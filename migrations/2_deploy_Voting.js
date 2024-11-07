const Voting = artifacts.require("Voting");

module.exports = function (deployer) {

  // Deploy the contract with the constructor parameters
  deployer.deploy(Voting);
};
