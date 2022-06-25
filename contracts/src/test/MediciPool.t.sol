// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test } from 'forge-std/Test.sol';

import { ERC20 } from 'openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';
import { MediciToken } from '../MediciToken.sol';
import { MediciPool } from '../MediciPool.sol';

contract MediciPoolTest is Test {
    MediciPool internal pool;
    MediciToken internal mici;
    ERC20 internal usdc;

    function setUp() public {
        mici = new MediciToken();
        usdc = new ERC20('USDC', 'USDC');
        pool = new MediciPool(address(mici));
        pool.setUSDCAddress(address(usdc));
    }

    function testInitPool() public {
        assertEq(pool.lendingRateAPR(), 2 ^ 17);
    }
}
