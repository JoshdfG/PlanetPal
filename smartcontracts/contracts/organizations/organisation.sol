// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../../Interface/IFactory.sol";
import "../../Library/Error.sol";
import "../../Library/Event.sol";
import "../../Interface/INFT.sol";

contract organisation {
    /**
     * ============================================================ *
     * --------------------- ORGANIZATION RECORD------------------- *
     * ============================================================ *
     */
    string organization;
    string cohort;
    string public certiificateURI;
    address organisationFactory;
    mapping(address => mapping(bytes => bool)) IndividualAttendanceRecord;
    address[] public campaignAttendees;
    mapping(bytes => mapping(address => bool)) campaignAttendance;

    address public NftContract;

    address public certificateContract;
    bool public certificateIssued;
    string public organisationImageUri;
    bool public isOngoing = true;

    address public spokContract;
    string public spokURI;

    bool public spokMinted;
    mapping(address => bool) requestNameCorrection;

    bool public isCampaignOn = true;

    Campaign[] public campaigns;

    bytes[] campaignIdCollection;
    mapping(bytes => lectureData) campaignInstance;
    mapping(bytes => bool) campaignIdUsed;
    struct lectureData {
        address mentorOnDuty;
        string topic;
        string uri;
        uint attendanceStartTime;
        uint usersPresent;
        bool status;
    }
    mapping(address => bytes[]) campaignTopic;

    /**
     * ============================================================ *
     * --------------------- USER RECORD------------------- *
     * ============================================================ *
     */
    address[] users;
    mapping(address => individual) userData;
    mapping(address => uint) indexInUsersArray;
    mapping(address => bool) isUser;
    mapping(address => bytes[]) campaignAttended;
    mapping(address => uint) usersTotalAttendance;

    address reg_add;
    mapping(address => Reg) registered_users;
    struct Reg {
        string name;
        address user_address;
        string email_address;
    }
    mapping(address => bool) isPresent;
    Reg[] public registered_users_data;
    mapping(address => bool) is_registered_user;

    /**
     * ============================================================ *
     * --------------------- STAFFS RECORD------------------------- *
     * ============================================================ *
     */
    address super_admin;
    address director;

    address[] staffs;
    mapping(address => uint) index_in_staffs_array;
    mapping(address => bool) is_valid_staff;
    mapping(address => individual) staffs_data;

    /**
     * ============================================================ *
     * --------------------- ADMIN RECORD------------------------- *
     * ============================================================ *
     */
    address[] admins;
    mapping(address => uint) index_in_admin_array;
    mapping(address => bool) is_valid_admin;
    mapping(address => bool) is_admin;
    mapping(address => individual) admin_data;

    /**
     * ============================================================ *
     * --------------------- MODIFIERS------------------------- *
     * ============================================================ *
     */ modifier onlySuperAdmin() {
        require(msg.sender == super_admin, "NOT MODERATOR");
        _;
    }

    modifier onlyUser() {
        require(isUser[msg.sender] == true, "NOT A VALID USER");
        _;
    }
    modifier onlySuperAdminOrAdmins() {
        require(
            is_valid_admin[msg.sender] == true ||
                msg.sender == super_admin ||
                is_valid_staff[msg.sender] == true,
            "NOT ALLOWED"
        );
        _;
    }
    modifier onlyStaff() {
        require(
            msg.sender == super_admin || is_valid_staff[msg.sender] == true,
            "NOT STAFF"
        );
        _;
    }

    constructor(
        string memory _organization_name,
        address _super_admin,
        string memory _admin_name,
        string memory _uri
    ) {
        super_admin = _super_admin;
        organization = _organization_name;
        organisationFactory = msg.sender;
        director = _super_admin;
        index_in_staffs_array[_super_admin] = staffs.length;
        staffs.push(_super_admin);
        admins.push(_super_admin);
        is_valid_staff[_super_admin] = true;
        staffs_data[_super_admin]._address = _super_admin;
        staffs_data[_super_admin]._name = _admin_name;
        organisationImageUri = _uri;
    }

    function initialize(address _NftContract) external {
        if (msg.sender != organisationFactory)
            revert Error.not_Autorized_Caller();
        NftContract = _NftContract;
    }

    function registerStaffs(
        individual[] calldata _staff
    ) external onlySuperAdmin {
        uint staffLength = _staff.length;
        for (uint i; i < staffLength; i++) {
            if (is_valid_staff[_staff[i]._address] == false) {
                staffs_data[_staff[i]._address] = _staff[i];
                index_in_staffs_array[_staff[i]._address] = staffs.length;
                staffs.push(_staff[i]._address);
                is_valid_staff[_staff[i]._address] = true;
            }
        }
        IFACTORY(organisationFactory).register(_staff);
        emit Event.staffsRegistered(_staff.length);
    }

    function makeAdmin(individual[] calldata _admin) external onlySuperAdmin {
        uint adminLength = _admin.length;
        for (uint i; i < adminLength; i++) {
            if (is_valid_staff[_admin[i]._address] == false)
                revert Error.not_valid_Staff();
            if (is_admin[_admin[i]._address] == false) {
                admin_data[_admin[i]._address] = _admin[i];
                is_admin[_admin[i]._address] = true;
                index_in_admin_array[_admin[i]._address] = admins.length;
                is_valid_admin[_admin[i]._address] = true;
                admins.push(_admin[i]._address);
            }
        }
        IFACTORY(organisationFactory).register(_admin);
        emit Event.adminsRegistered(_admin.length);
    }

    function TransferOwnership(address newModerator) external onlySuperAdmin {
        assert(newModerator != address(0));
        super_admin = newModerator;
    }

    function createAttendance(
        bytes calldata _lectureId,
        string calldata _uri,
        string calldata _topic
    ) external onlySuperAdmin {
        if (campaignIdUsed[_lectureId] == true)
            revert Error.campaign_id_already_used();
        campaignIdUsed[_lectureId] = true;
        campaignIdCollection.push(_lectureId);
        campaignInstance[_lectureId].uri = _uri;
        campaignInstance[_lectureId].topic = _topic;
        campaignInstance[_lectureId].mentorOnDuty = msg.sender;
        campaignTopic[msg.sender].push(_lectureId);

        INFT(NftContract).setDayUri(_lectureId, _uri);
        emit Event.attendanceCreated(_lectureId, _uri, _topic, msg.sender);
    }

    function openAttendance(bytes calldata _lectureId) external onlySuperAdmin {
        if (campaignIdUsed[_lectureId] == false)
            revert Error.Invalid_Campaign_Id();
        if (campaignInstance[_lectureId].status == true)
            revert("Attendance already open");
        if (msg.sender != campaignInstance[_lectureId].mentorOnDuty)
            revert Error.not_Autorized_Caller();

        campaignInstance[_lectureId].status = true;
        emit Event.attendanceOpened(_lectureId, msg.sender);
    }

    function closeAttendance(
        bytes calldata _lectureId
    ) external onlySuperAdmin {
        if (campaignIdUsed[_lectureId] == false)
            revert Error.Invalid_Campaign_Id();
        if (campaignInstance[_lectureId].status == false)
            revert("Attendance already closed");
        if (msg.sender != campaignInstance[_lectureId].mentorOnDuty)
            revert Error.not_Autorized_Caller();

        campaignInstance[_lectureId].status = false;
        emit Event.attendanceClosed(_lectureId, msg.sender);
    }

    function editTopic(
        bytes memory _lectureId,
        string calldata _topic
    ) external {
        if (msg.sender != campaignInstance[_lectureId].mentorOnDuty)
            revert Error.not_Autorized_Caller();
        if (campaignInstance[_lectureId].attendanceStartTime != 0)
            revert Error.Attendance_compilation_started();
        string memory oldTopic = campaignInstance[_lectureId].topic;
        campaignInstance[_lectureId].topic = _topic;
        emit Event.topicEditted(_lectureId, oldTopic, _topic);
    }

    function signAttendance(bytes memory _lectureId) external onlyUser {
        if (campaignIdUsed[_lectureId] == false)
            revert Error.Invalid_Campaign_Id();
        if (campaignInstance[_lectureId].status == false)
            revert Error.campaign_id_closed();
        if (IndividualAttendanceRecord[msg.sender][_lectureId] == true)
            revert Error.Already_Signed_Attendance_For_Id();
        if (campaignInstance[_lectureId].attendanceStartTime == 0) {
            campaignInstance[_lectureId].attendanceStartTime = block.timestamp;
        }
        IndividualAttendanceRecord[msg.sender][_lectureId] = true;
        usersTotalAttendance[msg.sender] = usersTotalAttendance[msg.sender] + 1;

        campaignInstance[_lectureId].usersPresent =
            campaignInstance[_lectureId].usersPresent +
            1;
        campaignAttended[msg.sender].push(_lectureId);

        INFT(NftContract).mint(msg.sender, _lectureId, 1);
        emit Event.AttendanceSigned(_lectureId, msg.sender);
    }

    function getUserAttendanceRatio(
        address _user
    ) external view returns (uint attendance, uint TotalCampaign) {
        if (isUser[_user] == false) revert Error.not_valid_user();
        attendance = usersTotalAttendance[_user];
        TotalCampaign = campaignIdCollection.length;
    }

    function getUsersPresent(
        bytes memory _lectureId
    ) external view returns (uint) {
        return campaignInstance[_lectureId].usersPresent;
    }

    function getCampaignAttendance(
        bytes memory _lectureId
    ) external view returns (address[] memory) {
        address[] memory attendees = new address[](campaignAttendees.length);
        uint256 index = 0;
        for (uint256 i = 0; i < campaignAttendees.length; i++) {
            if (campaignAttendance[_lectureId][campaignAttendees[i]] == true) {
                attendees[index] = campaignAttendees[i];
                index++;
            }
        }
        address[] memory trimmedAttendees = new address[](index);
        for (uint256 i = 0; i < index; i++) {
            trimmedAttendees[i] = attendees[i];
        }
        return trimmedAttendees;
    }

    function getCampaignData(
        bytes calldata _lectureId
    ) external view returns (lectureData memory) {
        if (campaignIdUsed[_lectureId] == false)
            revert Error.Invalid_Campaign_Id();
        return campaignInstance[_lectureId];
    }

    function createCampaign(
        string memory _campaign_name,
        string memory _uri,
        address _super_admin,
        string memory _location,
        string memory _description
    ) external onlySuperAdmin {
        isCampaignOn = true;
        Campaign memory newCampaign = Campaign(
            _campaign_name,
            _uri,
            _location,
            _description,
            _super_admin
        );
        campaigns.push(newCampaign);
        emit Event.CampaignCreated(
            _campaign_name,
            _super_admin,
            block.timestamp
        );
    }

    function registerUsers(
        individual[] calldata _users
    ) external onlySuperAdmin {
        uint studentLength = _users.length;
        for (uint i; i < studentLength; i++) {
            if (isUser[_users[i]._address] == false) {
                userData[_users[i]._address] = _users[i];
                indexInUsersArray[_users[i]._address] = users.length;
                users.push(_users[i]._address);
                isUser[_users[i]._address] = true;
            }
        }
        IFACTORY(organisationFactory).register(_users);
        emit Event.UserRegistered(_users.length);
    }

    function userCampaignReg(Reg calldata _user) external {
        require(
            !is_registered_user[_user.user_address],
            "User already registered"
        );

        registered_users[_user.user_address] = _user;

        indexInUsersArray[_user.user_address] = registered_users_data.length;
        registered_users_data.push(_user);

        is_registered_user[_user.user_address] = true;
        isPresent[_user.user_address] = true;

        emit Event.UserCampaignRegistered(
            _user.name,
            _user.user_address,
            _user.email_address
        );
    }

    function getUserCampaignReg() external view returns (Reg[] memory) {
        return registered_users_data;
    }

    function staffHandover(address newMentor) external {
        if (msg.sender != director && msg.sender != super_admin)
            revert Error.not_Autorized_Caller();
        director = newMentor;
        emit Event.Handover(msg.sender, newMentor);
    }

    function removeAdmin(
        address[] calldata rouge_admins
    ) external onlySuperAdmin {
        uint mentors_to_remove = rouge_admins.length;
        for (uint i; i < mentors_to_remove; i++) {
            delete staffs_data[rouge_admins[i]];
            admins[index_in_admin_array[rouge_admins[i]]] = admins[
                admins.length - 1
            ];
            admins.pop();
            is_admin[rouge_admins[i]] = false;
        }
        IFACTORY(organisationFactory).revoke(rouge_admins);
        emit Event.adminRemoved(rouge_admins.length);
    }

    function removeStaff(
        address[] calldata _rouge_staffs
    ) external onlySuperAdmin {
        uint mentors_to_remove = _rouge_staffs.length;
        for (uint i; i < mentors_to_remove; i++) {
            delete staffs_data[_rouge_staffs[i]];
            staffs[index_in_staffs_array[_rouge_staffs[i]]] = staffs[
                staffs.length - 1
            ];
            staffs.pop();
            is_valid_staff[_rouge_staffs[i]] = false;
        }
        IFACTORY(organisationFactory).revoke(_rouge_staffs);
        emit Event.staffRemoved(_rouge_staffs.length);
    }

    function getNameArray(
        address[] calldata _users
    ) external view returns (string[] memory) {
        string[] memory Names = new string[](_users.length);
        string memory emptyName;
        for (uint i = 0; i < _users.length; i++) {
            if (
                keccak256(abi.encodePacked(userData[_users[i]]._name)) ==
                keccak256(abi.encodePacked(emptyName))
            ) {
                Names[i] = "UNREGISTERED";
            } else {
                Names[i] = userData[_users[i]]._name;
            }
        }
        return Names;
    }

    function listCampaignAttended(
        address _student
    ) external view returns (bytes[] memory) {
        if (isUser[_student] == false) revert Error.not_valid_user();
        return campaignAttended[_student];
    }

    function getCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }

    function getCampaignIds() external view returns (bytes[] memory) {
        return campaignIdCollection;
    }

    function liststaffs() external view returns (address[] memory) {
        return staffs;
    }

    function VerifyAdmin(address _staff) external view returns (bool) {
        return is_valid_admin[_staff];
    }

    function VerifyUser(address _user) external view returns (bool) {
        return isUser[_user];
    }

    function getUserName(
        address _user
    ) external view returns (string memory name) {
        if (isUser[_user] == false) revert Error.not_valid_user();
        return userData[_user]._name;
    }

    function listStaffs() external view returns (address[] memory) {
        return staffs;
    }

    function listUsers() external view returns (address[] memory) {
        return users;
    }

    function VerifyStaff(address _staff) external view returns (bool) {
        return is_valid_staff[_staff];
    }

    function getStaffsName(
        address _staff
    ) external view returns (string memory name) {
        if (is_valid_staff[_staff] == false) revert Error.not_valid_Staff();
        return staffs_data[_staff]._name;
    }

    function getModerator() external view returns (address) {
        return super_admin;
    }

    function getOrganizationName() external view returns (string memory) {
        return organization;
    }

    function getOrganisationImageUri() external view returns (string memory) {
        return organisationImageUri;
    }

    function toggleOrganizationStatus() external onlySuperAdmin {
        isOngoing = !isOngoing;
    }

    function toggleCampaignStatus() external onlySuperAdmin {
        require(isCampaignOn == true, "Campaign is already stopped");

        isCampaignOn = !isCampaignOn;
        emit Event.CampaignStopped(block.timestamp);
    }

    function getOrganizationStatus() external view returns (bool) {
        return isOngoing;
    }

    function getCampaignStatus() external view returns (bool) {
        return isCampaignOn;
    }
}
