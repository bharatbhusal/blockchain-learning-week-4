// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract Ownable {
    mapping(uint256 => mapping(address => bool)) public OWNER;

    event OwnershipTransferred(
        uint256 productId,
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner(uint256 productId) {
        require(OWNER[productId][msg.sender], "Not Owner");
        _;
    }

    function transferOwnership(
        address newOwner,
        uint256 _productId
    ) external onlyOwner(_productId) {
        require(newOwner != address(0), "Invalid newOwner address");
        OWNER[_productId][newOwner] = true;
        emit OwnershipTransferred(_productId, msg.sender, newOwner);
    }
}

contract ProductSupplyChain is Ownable {
    address public administrator;
    // Product struct with properties like productId, name, currentOwner, price, and state.
    struct Product {
        uint256 productId;
        string name;
        address currentOwner;
        uint256 price;
    }

    event ProductCreated(uint256 indexed productId, address indexed owner);
    event ProductSold(
        uint256 indexed productId,
        address from,
        address to,
        uint256 price
    );

    mapping(uint256 => Product) public STORAGE;
    modifier onlyAdministrator() {
        require(msg.sender == administrator, "Not Administrator");
        _;
    }

    constructor() {
        administrator = msg.sender;
    }

    function createProduct(
        uint256 _productId,
        string memory _name,
        address _currentOwner,
        uint256 _price
    ) private onlyAdministrator {
        Product memory newProduct = Product({
            productId: _productId,
            name: _name,
            currentOwner: _currentOwner,
            price: _price
        });
        STORAGE[_productId] = newProduct;
        OWNER[_productId][_currentOwner] = true;
        emit ProductCreated(_productId, _currentOwner);
    }
}
