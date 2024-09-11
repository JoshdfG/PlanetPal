// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library Event {
    event staffsRegistered(uint noOfStaffs);
    event adminsRegistered(uint noOfAdmins);
    event UserRegistered(uint no_of_users);

    event Handover(address oldMentor, address newMentor);
    event staffRemoved(uint no_of_staffs);
    event mentorsRemoved(uint no_of_staffs);
    event adminRemoved(uint no_of_admins);

    event CampaignCreated(
        string campaignName,
        address superAdmin,
        uint256 timestamp
    );
    event CampaignStopped(uint256 timestamp);
    event FundsLocked(address user, uint256 amount);
    event FundsPayout(address user, uint256 equalShare);
    event AttendanceSigned(bytes signedId, address signer);
    event attendanceCreated(
        bytes indexed lectureId,
        string indexed lecture_uri,
        string topic,
        address indexed staff
    );
    event attendanceClosed(bytes closedId, address mentor);
    event topicEditted(bytes editedId, string oldTopic, string newTopic);
    event attendanceOpened(bytes openedId, address mentor);

    event OrganisationCreated(
        address indexed Organisation_address,
        address indexed Nft,
        string organisation_name,
        string _org_uri,
        string adminName
    );

    // Event for register()
    // event Registered(
    //     address indexed organisation_add,
    //     address[] students,
    //     uint totalUsers
    // );
    event UserCampaignRegistered(
        string name,
        address indexed user_address,
        string email_address
    );
}
