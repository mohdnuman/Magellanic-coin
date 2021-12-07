const MagellanicToken = artifacts.require('../contracts/MagellanicToken.sol');

module.exports = function(deployer) {
  deployer.deploy(MagellanicToken);
};
