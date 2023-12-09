# Product Supply Chain Smart Contract Test Scenarios

## 1. Test Deployment

### 1.1 Overview

- **Scenario:** Verify that the `ProductSupplyChain` contract deploys successfully.
- **Test Case:** Ensure that the contract is deployed without errors.

## 2. Test `assignSellerRole` Function

### 2.1 Assign Seller Role

- **Scenario:** Owner assigns a seller role to a user.
- **Test Case:** Confirm that the owner can assign a seller role, and the user receives the role successfully.

### 2.2 Non-Owner Assignment Attempt

- **Scenario:** A non-owner attempts to assign a seller role.
- **Test Case:** Ensure that non-owners cannot assign seller roles, and the attempt is reverted.

### 2.3 Invalid User Assignment

- **Scenario:** Owner attempts to assign a seller role to an invalid user address.
- **Test Case:** Validate that attempting to assign a seller role to an invalid address results in a revert.

## 3. Test `createProduct` Function

### 3.1 Create Product

- **Scenario:** Seller creates a new product successfully.
- **Test Case:** Verify that a seller can create a new product with unique properties.

### 3.2 Non-Seller Creation Attempt

- **Scenario:** A non-seller attempts to create a new product.
- **Test Case:** Confirm that non-sellers cannot create products, and the attempt is reverted.

### 3.3 Duplicate Product Creation

- **Scenario:** A seller attempts to create a product with an existing ID.
- **Test Case:** Ensure that attempting to create a product with a duplicate ID is reverted.

## 4. Test `sellProduct` Function

### 4.1 Sell Product

- **Scenario:** Seller successfully sells a product to another user.
- **Test Case:** Verify that a seller can sell their owned product to another user.

### 4.2 Non-Seller Selling Attempt

- **Scenario:** A non-seller attempts to sell a product.
- **Test Case:** Confirm that non-sellers cannot sell products, and the attempt is reverted.

### 4.3 Non-Existing Product Selling Attempt

- **Scenario:** Seller attempts to sell a non-existing product.
- **Test Case:** Ensure that attempting to sell a non-existing product is reverted.

### 4.4 Non-Owner Selling Attempt

- **Scenario:** Seller attempts to sell a product they do not own.
- **Test Case:** Validate that attempting to sell a product owned by another user is reverted.

## 5. Test `getProductDetail` Function

### 5.1 Get Product Detail

- **Scenario:** User successfully retrieves details of an existing product.
- **Test Case:** Verify that a user can retrieve accurate details of an existing product.

### 5.2 Non-Existing Product Detail Attempt

- **Scenario:** User attempts to get details of a non-existing product.
- **Test Case:** Ensure that attempting to get details of a non-existing product is reverted.

These scenarios cover the major functionalities of the `ProductSupplyChain` smart contract, including role assignment, product creation, selling, and product detail retrieval. Additional edge cases and scenarios are considered to ensure robust contract behavior.