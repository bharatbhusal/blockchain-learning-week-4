// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract ErrorHandling {
    uint public count;

    function testRequire(uint i) public {
        //refunds gas.
        //input validation.
        count++;
        require(i > 10);
    }

    function testRequireWithMessage(uint i) public {
        //refunds gas.
        //input validation.
        count++;
        require(i > 10, "Input should be greater than 10");
    }

    function testRevert(uint i) public {
        //refunds gas.
        //input validation.
        //for multiple checks.
        // used for custom errors
        count++;
        if (i <= 10) {
            revert();
        }
    }

    function testRevertWithMessage(uint i) public {
        //refunds gas.
        //input validation.
        //for multiple checks.
        // used for custom errors
        count++;
        if (i <= 10) {
            revert("Input should be greater than 10");
        }
    }

    function testAssert(uint i) public {
        //refunds gas.
        //for internal condition validation.
        count++;
        assert(i > 10);
    }
}
