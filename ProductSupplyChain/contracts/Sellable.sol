// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

//Seller role control of the user.
contract Sellable {
    //assigning seller role to users.
    mapping(address => bool) public SELLER;

    // modifier to restrict actions to seller only.
    modifier onlySeller(address user) {
        require(SELLER[user], "Not a Seller");
        _;
    }
}
