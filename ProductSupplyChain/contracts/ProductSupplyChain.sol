// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract Ownable {
    mapping(uint256 => mapping(address => bool)) public OWNER;

    modifier onlyOwner(uint256 productId) {
        require(OWNER[productId][msg.sender], "Not Owner");
        _;
    }

    function transferOwnership(
        address newOwner,
        uint256 productId
    ) external onlyOwner(productId) {
        require(newOwner != address(0), "Invalid newOwner address");
        OWNER[productId][newOwner] = true;
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
    mapping(uint256 => Product) public STORAGE;

    modifier onlyAdministrator() {
        require(msg.sender == administrator, "Not Administrator");
        _;
    }

    constructor() {
        administrator = msg.sender;
    }
}
