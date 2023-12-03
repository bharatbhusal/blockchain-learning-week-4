// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract OnlyAdministratorChecker {
    // event IsAdmin(address user, bool isAdmin);

    function isAdmin(address administrator) external view returns (bool) {
        require(tx.origin == administrator, "Not Administrator");

        // emit IsAdmin(msg.sender, true);
        return true;
    }
}
