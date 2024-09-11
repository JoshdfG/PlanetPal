export const OrganisationFactoryABI = [
  {
    inputs: [
      { internalType: "address", name: "_rewardFactory", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "Organisation",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "Nft", type: "address" },
      {
        indexed: false,
        internalType: "string",
        name: "organisation",
        type: "string",
      },
      { indexed: false, internalType: "string", name: "uri", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "adminName",
        type: "string",
      },
    ],
    name: "OrganisationCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "Admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "Organisations",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_organisation", type: "string" },
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "string", name: "_adminName", type: "string" },
    ],
    name: "createorganisation",
    outputs: [
      { internalType: "address", name: "Organisation", type: "address" },
      { internalType: "address", name: "Nft", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrganizations",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_userAddress", type: "address" },
    ],
    name: "getUserOrganisatons",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "memberOrganisations",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "_address", type: "address" },
          { internalType: "string", name: "_name", type: "string" },
          { internalType: "string", name: "email", type: "string" },
        ],
        internalType: "struct individual[]",
        name: "_individual",
        type: "tuple[]",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_individual", type: "address[]" },
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "studentOrganisationIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalUsers",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "uniqueStudent",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "validOrganisation",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
