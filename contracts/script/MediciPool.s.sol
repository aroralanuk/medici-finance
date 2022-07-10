// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "forge-std/Script.sol";
import "../src/MediciToken.sol";
import "../src/MediciPool.sol";
import "./HelperConfig.sol";

contract DeployMediciPool is Script {
    uint8 constant DECIMALS = 18;

    function run() external {
        vm.startBroadcast();
        MediciToken mici = new MediciToken();
        MediciPool pool = new MediciPool(address(mici));
        vm.stopBroadcast();
    }
}