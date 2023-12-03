// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

contract Calculator {
    int256 a;
    int256 b;

    constructor(int256 x, int256 y) {
        a = x;
        b = y;
    }

    function add() external view returns (int256) {
        return a + b;
    }

    function subtract() external view returns (int256) {
        return a - b;
    }

    function multiply() external view returns (int256) {
        return a * b;
    }

    function quotient() external view returns (int256) {
        return a / b;
    }

    function reminder() external view returns (int256) {
        return a % b;
    }
}
