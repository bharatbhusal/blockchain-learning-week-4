// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

//openzeppelin SafeMath library.
import "@openzeppelin/contracts/utils/math/Math.sol";

contract OverFlowUnderFlow {
    //syntax to make uint256 safe.
    using Math for uint256;

    //defining a uint256 state
    uint256 public value;

    //funtion to use safemath artimatic
    function increaseValue(uint256 _addend) public {
        //tryAdd accepts two operands and returns a tuple of (bool, uint256). bool value to signal overflow.
        // discarding bool value.
        (, value) = Math.tryAdd(value, _addend);
    }
}
