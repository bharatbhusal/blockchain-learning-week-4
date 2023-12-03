// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract onlyAdministratorChecker {
    //modifier to restrict actions only to contract owner.
    modifier onlyAdministrator(address administrator) {
        require(msg.sender == administrator, "Not Administrator");
        _;
    }

    function isAdmin(
        address user
    ) external view onlyAdministrator(user) returns (bool) {
        return true;
    }
}
