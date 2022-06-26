// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Test } from 'forge-std/Test.sol';
import 'forge-std/console.sol';
import 'forge-std/vm.sol';

import { ERC20Mintable } from 'src/test/helpers/ERC20Mintable.sol';
import { MediciToken } from '../MediciToken.sol';
import { MediciPool } from '../MediciPool.sol';

contract MediciPoolTest is Test {
    MediciPool internal pool;
    MediciToken internal mici;
    ERC20Mintable internal usdc;

    function setUp() public {
        mici = new MediciToken();
        usdc = new ERC20Mintable('USDC', 'USDC');
        usdc.mint(address(this), 1000e18);
        pool = new MediciPool(address(mici));
        pool.setUSDCAddress(address(usdc));
    }

    function testInitPool() public {
        assertEq(pool.lendingRateAPR(), 2 ^ 17);
        assertEq(pool.maxTimePeriod(), 30);
    }

    function testDeposit() public {
        usdc.approve(address(pool), type(uint256).max);
        console.log(usdc.allowance(address(this), address(pool)));
        pool.deposit(1e18);
        (
            uint256 balance,
            uint256 reputation,
            uint256 approvalLimit,
            uint256 currentlyApproved
        ) = pool.approvers(address(this));
        assertEq(balance, 1e18);
        assertEq(currentlyApproved, 0);
        // console.log(balance);
    }

    function testRequest() public {
        vm.startPrank(address(1));
        pool.request(10e18);

        vm.stopPrank();
    }
}
