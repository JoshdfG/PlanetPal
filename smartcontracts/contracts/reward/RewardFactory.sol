// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../reward/RewardNFT.sol";

contract RewardFactory {
    address Admin;

    constructor() {
        Admin = msg.sender;
    }

    function createAttendanceNft(
        string memory Name,
        string memory Symbol,
        string memory Uri,
        address _Admin
    ) public returns (address) {
        RewardNFT newRewardNFT = new RewardNFT(Name, Symbol, Uri, _Admin);
        return address(newRewardNFT);
    }

    function completePackage(
        string memory Name,
        string memory Symbol,
        string memory Uri,
        address _Admin
    ) external returns (address newRewardNFT) {
        newRewardNFT = createAttendanceNft(Name, Symbol, Uri, _Admin);
    }
}
