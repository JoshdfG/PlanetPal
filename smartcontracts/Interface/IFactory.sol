// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
struct individual {
    address _address;
    string _name;
    string email;
}

struct Campaign {
    string campaign_name;
    string campaign_uri;
    string campaign_location;
    string campaign_description;
    address owner;
}

interface IFACTORY {
    function register(individual[] calldata _individual) external;

    function revoke(address[] calldata _individual) external;
}
