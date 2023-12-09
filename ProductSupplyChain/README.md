# Product Supply Chain Smart Contracts

## 1. Main Product Supply Chain Contract

### 1.1 Overview

The `ProductSupplyChain` contract is the main contract that orchestrates the entire product supply chain system. It inherits from `Ownable` and `Sellable`, interacting with external contracts such as `OnlyAdministratorChecker`. This contract is responsible for creating, transferring ownership, and selling products.

### 1.2 State Variables

- `administrator`: The owner of the contract.
- `OnlyAdministratorChecker`: Instance of the external contract for administrator checks.
- `STORAGE`: Mapping of product IDs to Product structs.

### 1.3 Product Struct

- `Product`: A struct representing a product with properties like `productId`, `name`, `currentOwner`, and `price`.

### 1.4 Events

- `ProductCreated`: Emitted when a new product is created.
- `ProductSold`: Emitted when a product is sold.
- `OwnershipTransferred`: Emitted when ownership of a product is transferred.
- `SellerAssigned`: Emitted when a seller role is assigned.

### 1.5 Modifiers

- `productExists(uint256 productId)`: Ensures that the specified product exists.
- `onlyNewProduct(uint256 productId)`: Ensures that the product being referred to is new.
- `onlyValidAddress(address user)`: Ensures that the given address is valid.

### 1.6 Functions

- `assignSellerRole(address seller)`: Assigns a seller role to a user with a valid address.
- `transferOwnership(address newOwner, uint256 productId)`: Transfers ownership of a product to a new owner.
- `createProduct(uint256 productId, string memory name, uint256 price)`: Creates a new product.
- `sellProduct(uint256 productId, address to, uint256 price)`: Sells a product to a new owner.
- `getProductDetail(uint256 productId)`: Retrieves details of a product based on its ID.

## 2. OnlyAdministratorChecker Contract

### 2.1 Overview

The `OnlyAdministratorChecker` contract is an external contract used in the main contract to verify whether a given address has administrator privileges.

### 2.2 Functions

- `isAdmin(address administrator) external view returns (bool)`: Checks if the provided address is the administrator.

### 2.3 Usage Note

- The function utilizes `tx.origin` to compare the address where the function was initially called with the provided administrator address.
- This ensures that the caller of the function is the owner of the main contract.

## 3. Ownable Contract

### 3.1 Overview

The `Ownable` contract is responsible for managing ownership control of products. It keeps track of the owner of each product ID.

### 3.2 State Variables

- `OWNER`: Mapping storing the owner of a given product ID for each user address.

### 3.3 Modifiers

- `onlyOwner(uint256 productId)`: Restricts actions to the owner of the specified product ID.

## 4. Sellable Contract

### 4.1 Overview

The `Sellable` contract manages the seller role control of users. Sellers are assigned a specific role, allowing them to perform certain actions in the product supply chain.

### 4.2 State Variables

- `SELLER`: Mapping indicating whether an address has the seller role.

### 4.3 Modifiers

- `onlySeller(address user)`: Restricts actions to users who have the seller role.

## Usage Guidelines

- The `OnlyAdministratorChecker` contract is essential for administrator verification.
- The `Ownable` contract manages ownership control.
- The `Sellable` contract handles the seller role control.
- The main contract, `ProductSupplyChain`, orchestrates the entire supply chain system.
- Follow the outlined events for tracking product creation, selling, and ownership transfers.

## Disclaimer

This documentation provides a high-level overview. Developers should refer to the source code for detailed information and usage guidelines. Use the contracts responsibly and ensure proper integration with external components.