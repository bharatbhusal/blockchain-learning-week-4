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

  describe("Test createProduct", function () {
    it("Seller can create a new Product correctly", async function () {
      const { productSupplyChain, owner, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);
      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n));
      const product = await productSupplyChain.STORAGE(1);
      const isOwner = await productSupplyChain.OWNER(1, otherAccount1);
      expect(product.productId).to.equal(1);
      expect(isOwner).to.equal(true)
    });

    it("Non-seller can't create a new Product", async function () {
      const { productSupplyChain, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);
      await expect(productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n)).to.be.revertedWith("Not a Seller");
    });

    it("Seller can't create a duplicate Product", async function () {
      const { productSupplyChain, owner, otherAccount1 } = await loadFixture(deployProductSupplyChainFixture);
      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n);
      await expect(productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n)).to.be.revertedWith("Product does not exist");
    });
  });

  describe("Test sellProduct", function () {
    it("Seller can sell product correctly", async function () {
      const { productSupplyChain, owner, nullAddress, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);

      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      await productSupplyChain.connect(owner).assignSellerRole(otherAccount2)
      expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n));

      expect(await productSupplyChain.connect(otherAccount1).sellProduct(1, otherAccount2, 500));

      const isOwner = await productSupplyChain.OWNER(1, otherAccount2);
      expect(isOwner).to.equal(true)
    });

    it("Seller can't sell product to non-seller", async function () {
      const { productSupplyChain, owner, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);

      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n));

      await expect(productSupplyChain.connect(otherAccount1).sellProduct(1, otherAccount2, 500)).to.be.revertedWith("Not a Seller");
    });

    it("Seller can't sell not existing product", async function () {
      const { productSupplyChain, owner, nullAddress, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);

      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      await productSupplyChain.connect(owner).assignSellerRole(otherAccount2)
      expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n));

      await expect(productSupplyChain.connect(otherAccount1).sellProduct(2, otherAccount2, 500)).to.be.revertedWith("Product does not exist");
    })

    it("Seller can sell only their owned product", async function () {
      const { productSupplyChain, owner, nullAddress, otherAccount1, otherAccount2 } = await loadFixture(deployProductSupplyChainFixture);

      await productSupplyChain.connect(owner).assignSellerRole(otherAccount1)
      await productSupplyChain.connect(owner).assignSellerRole(otherAccount2)
      expect(await productSupplyChain.connect(otherAccount1).createProduct(1, "KoW", 499n));
      expect(await productSupplyChain.connect(otherAccount2).createProduct(2, "Twited Love", 999n));

      await expect(productSupplyChain.connect(otherAccount1).sellProduct(2, otherAccount2, 999)).to.be.revertedWith("Not Owner");
    })
  });
});
