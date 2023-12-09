const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

// Define a test suite for the ErrorHandling contract
describe("ErrorHandling", function () {
  // Fixture to set up a common deployment state for each test
  async function deployErrorHandlingFixture() {
    // Obtain signer accounts
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy the ErrorHandling contract
    const errorHandling = await hre.ethers.deployContract("ErrorHandling", [], {});
    await errorHandling.waitForDeployment();

    // Return relevant objects for use in tests
    return { owner, otherAccount, errorHandling };
  }

  // Test suite for contract deployment
  describe("Deployment", function () {
    it("Should deploy correctly", async function () {
      // Load the deployment fixture and ensure it runs successfully
      await loadFixture(deployErrorHandlingFixture);
    });
  });

  // Test suite for 'Require' statements
  describe("Require", function () {
    // Test case: Should not revert state change if input > 10
    it("testRequire Should not revert state change if input > 10", async function () {
      // Load the deployment fixture and obtain the ErrorHandling contract
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);

      // Ensure the initial count is 0
      expect(await errorHandling.count()).to.equal(0);

      // Call the testRequire function with input > 10
      await errorHandling.testRequire(11);

      // Ensure the count is incremented to 1
      expect(await errorHandling.count()).to.equal(1);
    });

    // Test case: Should revert state change if input <= 10
    it("testRequire Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Expect the testRequire function to revert if input <= 10
      await expect(errorHandling.testRequire(1)).to.be.reverted;

      // Ensure the count remains at 0 after the revert
      expect(await errorHandling.count()).to.equal(0);
    });

    // Test case: Should not revert state change if input > 10 (with message)
    it("testRequireWithMessage Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Call the testRequireWithMessage function with input > 10
      await errorHandling.testRequireWithMessage(11);

      // Ensure the count is incremented to 1
      expect(await errorHandling.count()).to.equal(1);
    });

    // Test case: Should revert state change if input <= 10 (with message)
    it("testRequireWithMessage Should revert state change if input > 10 and return Error Message", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Expect the testRequireWithMessage function to revert if input <= 10 and provide an error message
      await expect(errorHandling.testRequireWithMessage(1)).to.be.revertedWith("Input should be greater than 10");

      // Ensure the count remains at 0 after the revert
      expect(await errorHandling.count()).to.equal(0);
    });
  });

  // Test suite for 'Revert' statements
  describe("Revert", function () {
    // Test case: Should not revert state change if input > 10
    it("testRevert Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Call the testRevert function with input > 10
      await errorHandling.testRevert(11);

      // Ensure the count is incremented to 1
      expect(await errorHandling.count()).to.equal(1);
    });

    // Test case: Should revert state change if input <= 10
    it("testRevert Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Expect the testRevert function to revert if input <= 10
      await expect(errorHandling.testRevert(1)).to.be.reverted;

      // Ensure the count remains at 0 after the revert
      expect(await errorHandling.count()).to.equal(0);
    });

    // Test case: Should not revert state change if input > 10 (with message)
    it("testRevertWithMessage Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Call the testRevertWithMessage function with input > 10
      await errorHandling.testRevertWithMessage(11);

      // Ensure the count is incremented to 1
      expect(await errorHandling.count()).to.equal(1);
    });

    // Test case: Should revert state change if input <= 10 (with message)
    it("testRevertWithMessage Should revert state change if input > 10 and return Error Message", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Expect the testRevertWithMessage function to revert if input <= 10 and provide an error message
      await expect(errorHandling.testRevertWithMessage(1)).to.be.revertedWith("Input should be greater than 10");

      // Ensure the count remains at 0 after the revert
      expect(await errorHandling.count()).to.equal(0);
    });
  });

  // Test suite for 'Assert' statements
  describe("Assert", function () {
    // Test case: Should not revert state change if input > 10
    it("testAssert Should not revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Call the testAssert function with input > 10
      await errorHandling.testAssert(11);

      // Ensure the count is incremented to 1
      expect(await errorHandling.count()).to.equal(1);
    });

    // Test case: Should revert state change if input <= 10
    it("testAssert Should revert state change if input > 10", async function () {
      const { errorHandling } = await loadFixture(deployErrorHandlingFixture);
      expect(await errorHandling.count()).to.equal(0);

      // Expect the testAssert function to revert if input <= 10
      await expect(errorHandling.testAssert(1)).to.be.reverted;

      // Ensure the count remains at 0 after the revert
      expect(await errorHandling.count()).to.equal(0);
    });
  });
});
