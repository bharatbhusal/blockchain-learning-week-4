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
    const nullAddress = "0x0000000000000000000000000000000000000000";
    return { productSupplyChain, owner, otherAccount1, otherAccount2, nullAddress };
  }

  describe("Test Deployment", function () {
    it("Should deploy correctly", async function () {
      await loadFixture(deployProductSupplyChainFixture);
    });
  });

  describe("Test assignSellerRole", function () {
    it("Owner can assign Seller role to user", async function () {
      const { productSupplyChain, owner, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);

      expect(await productSupplyChain.SELLER(otherAccount1)).to.equal(false);
      expect(await productSupplyChain.connect(owner).assignSellerRole(otherAccount1));
      expect(await productSupplyChain.SELLER(otherAccount1)).to.equal(true);
    });

    it("Non-owner can't assign Seller role to user", async function () {
      const { productSupplyChain, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);
      await expect(productSupplyChain.connect(otherAccount1).assignSellerRole(otherAccount2)).to.be.revertedWith("Not Administrator");
    });

    it("Owner can't assign Seller role to invalid user", async function () {
      const { productSupplyChain, owner, nullAddress } = await loadFixture(deployProductSupplyChainFixture);
      await expect(productSupplyChain.connect(owner).assignSellerRole(nullAddress)).to.be.revertedWith("Invalid address");
    });

  });

  describe("Test transferOwnership", function () {
    it("Should transfer Ownership correctly", async function () {
      const { productSupplyChain } = await loadFixture(deployProductSupplyChainFixture);

    });
  });

  // describe("Test createProduct", function () {
  //   it("Should create a new Product correctly", async function () {
  //     const { productSupplyChain, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);

  //     expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n))
  //   });
  // });


});
