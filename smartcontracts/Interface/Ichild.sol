// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../Interface/IFactory.sol";

interface ICHILD {
    struct Reg {
        string name;
        address user_address;
        string email_address;
    }

    function getUserCampaignReg() external view returns (Reg[] memory);

    function userCampaignReg(Reg calldata _user) external;

    function createAttendance(
        bytes calldata _lectureId,
        string calldata _uri,
        string calldata _topic
    ) external;

    function openAttendance(bytes calldata _lectureId) external;

    function signAttendance(bytes memory _lectureId) external;

    function getCampaignAttendance(
        bytes memory _lectureId
    ) external view returns (address[] memory);

    function getCampaigns() external view returns (Campaign[] memory);

    function approve(address spender, uint256 value) external returns (bool);

    function lockFunds(uint256 amount) external;

    function createCampaign(
        string memory _campaign_name,
        string memory _uri,
        address _super_admin,
        string memory _location,
        string memory _description
    ) external;

    function toggleOrganizationStatus() external;

    function getOrganizationStatus() external view returns (bool);

    function toggleCampaignStatus() external;

    function revoke(address[] calldata _individual) external;

    function VerifyStaff(address _staff) external view returns (bool);

    function VerifyUser(address _user) external view returns (bool);

    function VerifyAdmin(address _staff) external view returns (bool);

    function getUserName(
        address _user
    ) external view returns (string memory name);

    function registerStaffs(individual[] calldata _staff) external;

    function registerUsers(individual[] calldata _users) external;

    function listStaffs() external view returns (address[] memory);

    function listUsers() external view returns (address[] memory);

    function getStaffsName(
        address _staff
    ) external view returns (string memory name);

    function makeAdmin(individual[] calldata _admin) external;

    function getNameArray(
        address[] calldata _students
    ) external view returns (string[] memory);

    function removeAdmin(address[] calldata rouge_admins) external;

    function removeStaff(address[] calldata rouge_admins) external;

    function MintCertificate(string memory Uri) external;
}
