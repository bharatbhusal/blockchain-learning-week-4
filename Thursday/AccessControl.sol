// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract AccessControl {
    // State variables
    // Public variable to store confidential data
    uint256 public confidentialData;
    // Address of the contract owner
    address public owner;
    // Mapping to track admin status for each address
    mapping(address => bool) public ADMIN;

    // Events
    // Event emitted when confidential data changes
    event confidentialDataChanged(uint256 oldData, uint256 newData);
    // Event emitted when a new admin is added
    event adminAdded(address admin);

    // Modifiers
    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    // Modifier to restrict access to admins
    modifier onlyAdmin() {
        require(ADMIN[msg.sender], "Not Admin");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender; // Set the contract owner to the address that deployed the contract
        ADMIN[msg.sender] = true; // Add the deployer as the initial admin
    }

    // Function to add an admin by the owner
    function addAdmin(address user) public onlyOwner {
        ADMIN[user] = true; // Mark the specified address as an admin

        // Emit an event when an admin is added
        emit adminAdded(user);
    }

    // Function to change confidential data, accessible only by admins
    function changeConfidentialData(uint newData) public onlyAdmin {
        // Store the old data for the event
        uint256 oldData = confidentialData;

        // Update confidential data
        confidentialData = newData;

        // Emit an event when confidential data is changed
        emit confidentialDataChanged(oldData, newData);
    }
}
