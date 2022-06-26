// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { ByteHasher } from 'world-id-contracts/libraries/ByteHasher.sol';
import { Semaphore } from 'world-id-contracts/Semaphore.sol';

contract CheckWorldID {
    using ByteHasher for bytes;

    error Unauthorized();
    error AlreadySigned();
    error InvalidReceiver();
    error InvalidNullifier();

    event ReceiverRegistered(address receiver);

    uint256 public receiverCount;
    uint256 internal immutable groupId;
    Semaphore internal immutable semaphore;

    mapping(address => bool) public isRegistered;
    mapping(uint256 => bool) internal nullifierHashes;
    mapping(address => mapping(address => uint256)) public splitClaimAmount;

    constructor(Semaphore _semaphore, uint256 _groupId) payable {
        semaphore = _semaphore;
        groupId = _groupId;
    }

    function register(
        address receiver,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public payable {
        if (isRegistered[receiver]) revert InvalidReceiver();
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        semaphore.verifyProof(
            root,
            groupId,
            abi.encodePacked(receiver).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        nullifierHashes[nullifierHash] = true;

        ++receiverCount;
        isRegistered[receiver] = true;

        emit ReceiverRegistered(receiver);
    }

    function checkUnique(address receiver, uint256 nullifierHash) public returns (bool) {
        if (!isRegistered[receiver] && nullifierHashes[nullifierHash]) revert AlreadySigned();
        return true;
    }
}
