// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;
import "./Calculator.sol";

contract ExternalContractWithImport {
    Calculator calculator;

    constructor(int256 x, int256 y) {
        calculator = new Calculator(x, y);
    }

    function add() public view returns (int256) {
        return calculator.add();
    }
}
