// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Error {
    error not_Autorized_Caller();
    error not_valid_user();
    error not_a_super_admin();
    error not_valid_Staff();
    error user_already_registered();
    error campaign_id_already_used();
    error Attendance_compilation_started();
    error Invalid_Campaign_Id();
    error campaign_id_closed();
    error Already_Signed_Attendance_For_Id();
}
