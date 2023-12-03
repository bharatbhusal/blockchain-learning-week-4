// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

//external contract to be used in main contract.
contract OnlyAdministratorChecker {
    //function to check if the user is administrator or not.
    function isAdmin(address administrator) external view returns (bool) {
        //can't use msg.sender because msg.sender is the one who called this function. But we need the address where it was called first.
        // msg.sender gives the address of OnlyAdministratorChecker in main contract.
        //tx.orgin gives the address of owner of main contract.
        require(tx.origin == administrator, "Not Administrator");
        return true;
    }
}
