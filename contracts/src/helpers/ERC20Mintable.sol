// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mintable is ERC20
{
    constructor(string memory aName, string memory aSymbol) ERC20(aName, aSymbol)
    {
        return;
    }

    function mint(address aTo, uint256 aAmount) external
    {
        _mint(aTo, aAmount);
    }
}
