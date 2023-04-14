const Voting_System = artifacts.require("dvoting/src/contracts/Voting_System.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting_System);
};
