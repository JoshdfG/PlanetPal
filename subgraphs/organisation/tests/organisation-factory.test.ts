import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { OrganisationCreated } from "../generated/schema"
import { OrganisationCreated as OrganisationCreatedEvent } from "../generated/organisationFactory/organisationFactory"
import { handleOrganisationCreated } from "../src/organisation-factory"
import { createOrganisationCreatedEvent } from "./organisation-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let Organisation_address = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let Nft = Address.fromString("0x0000000000000000000000000000000000000001")
    let organisation_name = "Example string value"
    let _org_uri = "Example string value"
    let adminName = "Example string value"
    let newOrganisationCreatedEvent = createOrganisationCreatedEvent(
      Organisation_address,
      Nft,
      organisation_name,
      _org_uri,
      adminName
    )
    handleOrganisationCreated(newOrganisationCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OrganisationCreated created and stored", () => {
    assert.entityCount("OrganisationCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OrganisationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "Organisation_address",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrganisationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "Nft",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrganisationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "organisation_name",
      "Example string value"
    )
    assert.fieldEquals(
      "OrganisationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_org_uri",
      "Example string value"
    )
    assert.fieldEquals(
      "OrganisationCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "adminName",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
