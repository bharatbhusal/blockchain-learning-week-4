// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract ErrorHandling {
    uint public count;

    function testRequire(uint i) public {
        //refunds gas.
        //reverts state changes.
        count++;
        require(i > 10);
    }

    function testRequireWithMessage(uint i) public {
        //refunds gas.
        //reverts state changes.
        count++;
        require(i > 10, "Input should be greater than 10");
    }
}
