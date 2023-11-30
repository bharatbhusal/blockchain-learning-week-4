// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.23;

import "./ExampleLibrary.sol";

contract ExampleContract {
    function useExampleLibraryFunction(
        uint x,
        uint y
    ) public pure returns (uint) {
        return ExampleLibrary.exampleLibraryFunction(x, y);
    }
}
