// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract ExternalContractWithAddress {
    address calculator;

    constructor(address calculatorAddress, int256 x, int256 y) {
        calculator = calculatorAddress;
        Calculator myCalculator = Calculator(calculator);
    }

    function add() public view returns (int256) {
        return calculator.add();
    }
}
