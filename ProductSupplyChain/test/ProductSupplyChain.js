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
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();

    return { productSupplyChain, owner, otherAccount1, otherAccount2 };
  }

  describe("Test Deployment", function () {
    it("Should deploy correctly", async function () {
      await loadFixture(deployProductSupplyChainFixture);
    });
  });

  describe("Test assignSellerRole", function () {
    it("Owner can assign Seller role to user", async function () {
      const { productSupplyChain, owner, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);
      expect(await productSupplyChain.connect(owner).assignSellerRole(otherAccount1));
    });

    it("Non-owner can't assign Seller role to user", async function () {
      const { productSupplyChain, owner, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);
      await expect(productSupplyChain.connect(otherAccount1).assignSellerRole(otherAccount2)).to.be.revertedWith("Not Administrator");
    });


  });
});
