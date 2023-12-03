# Sample Hardhat Project

This project demonstrates a sophisticated smart contract that simulates a basic supply chain process for a product, from creation to the end sale, showcasing advanced Solidity features

### Commands to test, deploy and run node
```shell
npm run test
npm run deploy
npm run node
```
### Smart contracts:
- ProductSupplyChain
- OnlyAdministratorChecker
- Ownable
- Sellable

### Events:
- ProductCreated
- ProductSold
- OwnershipTransferred
- SellerAssigned

### Modifiers:
- productExists
- onlyNewProduct
- onlyValidAddress

### Mappings:
- STORAGE
- OWNER
- SELLER

### Functions:
- assignSellerRole
- tranferOwnership
- createProduct
- sellProduct
- getProductDetail
- isAdmin