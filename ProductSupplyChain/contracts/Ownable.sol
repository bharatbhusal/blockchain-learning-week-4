// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

//Ownership control of the product.
contract Ownable {
    //mapping storing the owner of given product id.
    mapping(uint256 => mapping(address => bool)) public OWNER;

    // modifier to restrict actions to product owner only.
    modifier onlyOwner(uint256 productId) {
        require(OWNER[productId][msg.sender], "Not Owner");
        _;
    }
}
