// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

interface CalculatorInterface {
    function add() external view returns (int256);

    function subtract() external view returns (int256);

    function multiply() external view returns (int256);

    function quotient() external view returns (int256);

    function reminder() external view returns (int256);
}

contract ExternalContractWithAddress {
    CalculatorInterface calculator;

    constructor(address calculatorAddress) {
        calculator = CalculatorInterface(calculatorAddress);
    }

    function callAdd() public view returns (int256) {
        return calculator.add();
    }

    function callSubtrac() public view returns (int256) {
        return calculator.subtract();
    }

    function callMultiply() public view returns (int256) {
        return calculator.multiply();
    }

    function callQuotient() public view returns (int256) {
        return calculator.quotient();
    }

    function callRemainder() public view returns (int256) {
        return calculator.reminder();
    }
}
