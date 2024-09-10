// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../contracts/organizations/organisationFactory.sol";
import "../Interface/Ichild.sol";
import "../contracts/reward/RewardFactory.sol";

contract DeployContracts is Script {
    organisationFactory _organisationFactory;
    RewardFactory _rewardFactory;

    individual user1;

    individual[] users;
    address token;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        _rewardFactory = new RewardFactory();
        _organisationFactory = new organisationFactory(address(_rewardFactory));
        (address Organisation, address OrganisationNft) = _organisationFactory
            .createorganisation("vermion", "http://test.org", "dickson");

        vm.stopBroadcast();
        writeAddressesToFile(
            address(_organisationFactory),
            "Organisation Factory"
        );
        writeAddressesToFile(Organisation, "Organisation Address");
        writeAddressesToFile(OrganisationNft, "Organisation NFT Address");
    }

    function writeAddressesToFile(address addr, string memory text) public {
        string memory filename = "./deployed_contracts.txt";

        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
        vm.writeLine(filename, text);
        vm.writeLine(filename, vm.toString(addr));
        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
    }
}
