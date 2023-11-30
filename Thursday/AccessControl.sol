// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract AccessControl {
    uint256 public confidentialData;
    address public owner;
    mapping(address => bool) public ADMIN;

    event confidentialDataChanged(uint256 oldData, uint256 newData);
    event adminAdded(address admin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    modifier onlyAdmin() {
        require(ADMIN[msg.sender], "Not Admin");
        _;
    }

    constructor() {
        owner = msg.sender;
        ADMIN[msg.sender] = true;
    }

    function addAdmin(address user) public onlyOwner {
        ADMIN[user] = true;
    }

    function changeConfidentialData(uint newData) public onlyAdmin {
        confidentialData = newData;
    }
}
