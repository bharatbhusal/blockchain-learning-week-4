const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("ProductSupplyChain", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployProductSupplyChainFixture() {

    const onlyAdministratorChecker = await hre.ethers.deployContract("OnlyAdministratorChecker", [], {});
    await onlyAdministratorChecker.waitForDeployment();

    const productSupplyChain = await hre.ethers.deployContract("ProductSupplyChain", [onlyAdministratorChecker.target], {});
    await productSupplyChain.waitForDeployment();

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    return { productSupplyChain, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy correctly", async function () {
      const { productSupplyChain } = await loadFixture(deployProductSupplyChainFixture);
    });
  });
});
