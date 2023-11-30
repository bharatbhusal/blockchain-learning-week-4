const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ErrorHandling", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployErrorHandlingFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    // const ErrorHandling = await ethers.getContractFactory("ErrorHandling");
    const errorHandling = await hre.ethers.deployContract("ErrorHandling", [], {});
    await errorHandling.waitForDeployment();

    return { owner, otherAccount, errorHandling };
  }

  describe("Deployment", function () {
    it("Should deploy correctly", async function () {
      await loadFixture(deployErrorHandlingFixture);
    });
  });

  describe("Require", function () {
    it("testRequire Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await errorHandling.testRequire(11);
      expect(await errorHandling.count()).to.equal(1);
    });

    it("testRequire Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await expect(errorHandling.testRequire(1)).to.be.reverted;
      expect(await errorHandling.count()).to.equal(0);
    });

    it("testRequireWithMessage Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await errorHandling.testRequireWithMessage(11);
      expect(await errorHandling.count()).to.equal(1);
    });

    it("testRequireWithMessage Should revert state change if input > 10 and return Error Message", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await expect(errorHandling.testRequireWithMessage(1)).to.be.revertedWith("Input should be greater than 10");
      expect(await errorHandling.count()).to.equal(0);
    });
  })

  describe("Revert", function () {
    it("testRevert Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await errorHandling.testRevert(11);
      expect(await errorHandling.count()).to.equal(1);
    });

    it("testRevert Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await expect(errorHandling.testRevert(1)).to.be.reverted;
      expect(await errorHandling.count()).to.equal(0);
    });

    it("testRevertWithMessage Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await errorHandling.testRevertWithMessage(11);
      expect(await errorHandling.count()).to.equal(1);
    });

    it("testRevertWithMessage Should revert state change if input > 10 and return Error Message", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await expect(errorHandling.testRevertWithMessage(1)).to.be.revertedWith("Input should be greater than 10");
      expect(await errorHandling.count()).to.equal(0);
    });
  })

  describe("Assert", function () {
    it("testAssert Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await errorHandling.testAssert(11);
      expect(await errorHandling.count()).to.equal(1);
    });

    it("testAssert Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);
      await expect(errorHandling.testAssert(1)).to.be.reverted;
      expect(await errorHandling.count()).to.equal(0);
    });
  })
})
