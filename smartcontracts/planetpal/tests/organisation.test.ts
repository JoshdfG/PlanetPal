import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AttendanceSigned } from "../generated/schema"
import { AttendanceSigned as AttendanceSignedEvent } from "../generated/organisation/organisation"
import { handleAttendanceSigned } from "../src/organisation"
import { createAttendanceSignedEvent } from "./organisation-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let Id = Bytes.fromI32(1234567890)
    let signer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAttendanceSignedEvent = createAttendanceSignedEvent(Id, signer)
    handleAttendanceSigned(newAttendanceSignedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AttendanceSigned created and stored", () => {
    assert.entityCount("AttendanceSigned", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AttendanceSigned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "Id",
      "1234567890"
    )
    assert.fieldEquals(
      "AttendanceSigned",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "signer",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
