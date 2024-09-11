// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../Interface/Ichild.sol";
import "../Interface/IFactory.sol";
import "../contracts/organizations/organisationFactory.sol";
import "../contracts/organizations/organisation.sol";
import "../contracts/reward/RewardFactory.sol";

contract EcosystemTest is Test {
    organisationFactory _organisationFactory;
    RewardFactory _rewardFactory;
    individual user1;
    individual[] users;
    individual[] editstudents;

    individual staff;
    individual[] staffs;
    individual[] editStaffs;

    Campaign campaign;
    Campaign[] campaigns;

    address[] staffsToRemove;
    address[] rogue_staffs;
    address[] nameCheck;
    address staffAdd = 0xfd182E53C17BD167ABa87592C5ef6414D25bb9B4;
    address userAdd = 0x13B109506Ab1b120C82D0d342c5E64401a5B6381;
    address director = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;
    address public organisationAddress;

    individual admin;
    address[] adminsToRemove;
    address _adminAdd = address(0x0);

    function setUp() public {
        vm.prank(director);
        _rewardFactory = new RewardFactory();

        _organisationFactory = new organisationFactory(address(_rewardFactory));

        vm.stopPrank();

        user1._address = address(userAdd);
        user1._name = "JOHN DOE";
        user1.email = "qO2kF@example.com";
        users.push(user1);

        staff._address = address(staffAdd);
        staff._name = "MR. ABIMS";
        staff.email = "abims@abims.com";
        staffs.push(staff);
    }

    function testOrganizationCreation() public {
        vm.startPrank(director);
        (address Organisation, address OrganisationNft) = _organisationFactory
            .createorganisation("WEB3BRIDGE", "http://test.org", "Abims");
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        bool status = ICHILD(child).getOrganizationStatus();
        assertEq(status, true);
        organisationAddress = Organisation;
        vm.stopPrank();
        assertEq(Organisation, organisationAddress);
    }

    function testStaffRegister() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).registerStaffs(staffs);
        address[] memory staffLists = ICHILD(child).listStaffs();
        bool staffStatus = ICHILD(child).VerifyStaff(staffAdd);
        string memory staffName = ICHILD(child).getStaffsName(staffAdd);
        assertEq(2, staffLists.length);
        assertEq(true, staffStatus);
        assertEq("MR. ABIMS", staffName);
        vm.stopPrank();
    }

    function testUserRegister() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).registerUsers(users);
        address[] memory userLists = ICHILD(child).listUsers();
        bool userStatus = ICHILD(child).VerifyUser(userAdd);
        string memory userName = ICHILD(child).getUserName(userAdd);
        assertEq(1, userLists.length);
        assertEq(true, userStatus);
        assertEq("JOHN DOE", userName);
        vm.stopPrank();
    }

    function testGetUserNamesArray() public {
        testStaffRegister();

        nameCheck.push(userAdd);

        address child = _organisationFactory.getUserOrganisatons(director)[0];
        string[] memory userName = ICHILD(child).getNameArray(nameCheck);
        assertEq(userName[0], "UNREGISTERED");
        console.log(userName[0]);
    }

    function testToggleOrganizationStatus() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).toggleOrganizationStatus();

        bool toggledStatus = ICHILD(child).getOrganizationStatus();
        assertEq(toggledStatus, false);

        ICHILD(child).toggleOrganizationStatus();

        bool finalStatus = ICHILD(child).getOrganizationStatus();
        assertEq(finalStatus, true);
        vm.stopPrank();
    }

    function testToggleCampaignStatus() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).toggleOrganizationStatus();

        bool toggledStatus = ICHILD(child).getOrganizationStatus();
        assertEq(toggledStatus, false);

        ICHILD(child).toggleOrganizationStatus();

        bool finalStatus = ICHILD(child).getOrganizationStatus();
        assertEq(finalStatus, true);
        vm.stopPrank();
    }

    function testPromoteStaff() public {
        testStaffRegister();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).makeAdmin(staffs);
    }

    function testRemoveAdmin() public {
        testPromoteStaff();
        adminsToRemove.push(staffAdd);
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).removeAdmin(adminsToRemove);
    }

    function testRemoveStaff() public {
        testStaffRegister();
        staffsToRemove.push(staffAdd);
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).removeStaff(staffsToRemove);
    }

    // campaigns
    function testCreateCampaigns() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).createCampaign(
            "Fight political corruption",
            "https://accessess.org",
            director,
            "London",
            "description"
        );
        vm.stopPrank();
    }

    function testCreateAttendance() public {
        testOrganizationCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).createAttendance(
            "B0202",
            "http://test.org",
            "INTRODUCTION TO BLOCKCHAIN"
        );

        vm.stopPrank();
    }

    function testSignAttendance() public {
        testCreateAttendance();
        testUserRegister();

        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).openAttendance("B0202");
        vm.stopPrank();

        vm.startPrank(userAdd);
        ICHILD(child).signAttendance("B0202");
        vm.stopPrank();
    }

    function testGetCampaignAttendance() public {
        testSignAttendance();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).getCampaignAttendance("B0202");
        vm.stopPrank();
    }

    function testUserCampaignReg() public {
        testOrganizationCreation();
        vm.startPrank(userAdd);

        console.log("Calling userCampaignReg...");

        ICHILD.Reg memory testUser = ICHILD.Reg({
            name: "TEST",
            user_address: userAdd,
            email_address: "email@example.com"
        });

        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).userCampaignReg(testUser);

        console.log("userCampaignReg called successfully.");

        vm.stopPrank();
    }

    function testGetUserCampaigns() public {
        testUserCampaignReg();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).getUserCampaignReg();
        vm.stopPrank();
    }
}
