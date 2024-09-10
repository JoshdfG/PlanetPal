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
    event AttendanceSigned(bytes Id, address signer);
    event attendanceCreated(
        bytes indexed lectureId,
        string indexed uri,
        string topic,
        address indexed staff
    );
    event attendanceClosed(bytes Id, address mentor);
    event topicEditted(bytes Id, string oldTopic, string newTopic);
    event attendanceOpened(bytes Id, address mentor);

    event OrganisationCreated(
        address indexed Organisation,
        address indexed Nft,
        string organisation,
        string uri,
        string adminName
    );

    // Event for register()
    event Registered(
        address indexed organisation,
        address[] students,
        uint totalUsers
    );
}
