import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AttendanceSigned,
  CampaignCreated,
  CampaignStopped,
  Handover,
  UserCampaignRegistered,
  UserRegistered,
  adminRemoved,
  adminsRegistered,
  attendanceClosed,
  attendanceCreated,
  attendanceOpened,
  staffRemoved,
  staffsRegistered,
  topicEditted
} from "../generated/organisation/organisation"

export function createAttendanceSignedEvent(
  signedId: Bytes,
  signer: Address
): AttendanceSigned {
  let attendanceSignedEvent = changetype<AttendanceSigned>(newMockEvent())

  attendanceSignedEvent.parameters = new Array()

  attendanceSignedEvent.parameters.push(
    new ethereum.EventParam("signedId", ethereum.Value.fromBytes(signedId))
  )
  attendanceSignedEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )

  return attendanceSignedEvent
}

export function createCampaignCreatedEvent(
  campaignName: string,
  superAdmin: Address,
  timestamp: BigInt
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignName",
      ethereum.Value.fromString(campaignName)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "superAdmin",
      ethereum.Value.fromAddress(superAdmin)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return campaignCreatedEvent
}

export function createCampaignStoppedEvent(timestamp: BigInt): CampaignStopped {
  let campaignStoppedEvent = changetype<CampaignStopped>(newMockEvent())

  campaignStoppedEvent.parameters = new Array()

  campaignStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return campaignStoppedEvent
}

export function createHandoverEvent(
  oldMentor: Address,
  newMentor: Address
): Handover {
  let handoverEvent = changetype<Handover>(newMockEvent())

  handoverEvent.parameters = new Array()

  handoverEvent.parameters.push(
    new ethereum.EventParam("oldMentor", ethereum.Value.fromAddress(oldMentor))
  )
  handoverEvent.parameters.push(
    new ethereum.EventParam("newMentor", ethereum.Value.fromAddress(newMentor))
  )

  return handoverEvent
}

export function createUserCampaignRegisteredEvent(
  name: string,
  user_address: Address,
  email_address: string
): UserCampaignRegistered {
  let userCampaignRegisteredEvent = changetype<UserCampaignRegistered>(
    newMockEvent()
  )

  userCampaignRegisteredEvent.parameters = new Array()

  userCampaignRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  userCampaignRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "user_address",
      ethereum.Value.fromAddress(user_address)
    )
  )
  userCampaignRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "email_address",
      ethereum.Value.fromString(email_address)
    )
  )

  return userCampaignRegisteredEvent
}

export function createUserRegisteredEvent(no_of_users: BigInt): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "no_of_users",
      ethereum.Value.fromUnsignedBigInt(no_of_users)
    )
  )

  return userRegisteredEvent
}

export function createadminRemovedEvent(no_of_admins: BigInt): adminRemoved {
  let adminRemovedEvent = changetype<adminRemoved>(newMockEvent())

  adminRemovedEvent.parameters = new Array()

  adminRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "no_of_admins",
      ethereum.Value.fromUnsignedBigInt(no_of_admins)
    )
  )

  return adminRemovedEvent
}

export function createadminsRegisteredEvent(
  noOfAdmins: BigInt
): adminsRegistered {
  let adminsRegisteredEvent = changetype<adminsRegistered>(newMockEvent())

  adminsRegisteredEvent.parameters = new Array()

  adminsRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "noOfAdmins",
      ethereum.Value.fromUnsignedBigInt(noOfAdmins)
    )
  )

  return adminsRegisteredEvent
}

export function createattendanceClosedEvent(
  closedId: Bytes,
  mentor: Address
): attendanceClosed {
  let attendanceClosedEvent = changetype<attendanceClosed>(newMockEvent())

  attendanceClosedEvent.parameters = new Array()

  attendanceClosedEvent.parameters.push(
    new ethereum.EventParam("closedId", ethereum.Value.fromBytes(closedId))
  )
  attendanceClosedEvent.parameters.push(
    new ethereum.EventParam("mentor", ethereum.Value.fromAddress(mentor))
  )

  return attendanceClosedEvent
}

export function createattendanceCreatedEvent(
  lectureId: Bytes,
  lecture_uri: string,
  topic: string,
  staff: Address
): attendanceCreated {
  let attendanceCreatedEvent = changetype<attendanceCreated>(newMockEvent())

  attendanceCreatedEvent.parameters = new Array()

  attendanceCreatedEvent.parameters.push(
    new ethereum.EventParam("lectureId", ethereum.Value.fromBytes(lectureId))
  )
  attendanceCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "lecture_uri",
      ethereum.Value.fromString(lecture_uri)
    )
  )
  attendanceCreatedEvent.parameters.push(
    new ethereum.EventParam("topic", ethereum.Value.fromString(topic))
  )
  attendanceCreatedEvent.parameters.push(
    new ethereum.EventParam("staff", ethereum.Value.fromAddress(staff))
  )

  return attendanceCreatedEvent
}

export function createattendanceOpenedEvent(
  openedId: Bytes,
  mentor: Address
): attendanceOpened {
  let attendanceOpenedEvent = changetype<attendanceOpened>(newMockEvent())

  attendanceOpenedEvent.parameters = new Array()

  attendanceOpenedEvent.parameters.push(
    new ethereum.EventParam("openedId", ethereum.Value.fromBytes(openedId))
  )
  attendanceOpenedEvent.parameters.push(
    new ethereum.EventParam("mentor", ethereum.Value.fromAddress(mentor))
  )

  return attendanceOpenedEvent
}

export function createstaffRemovedEvent(no_of_staffs: BigInt): staffRemoved {
  let staffRemovedEvent = changetype<staffRemoved>(newMockEvent())

  staffRemovedEvent.parameters = new Array()

  staffRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "no_of_staffs",
      ethereum.Value.fromUnsignedBigInt(no_of_staffs)
    )
  )

  return staffRemovedEvent
}

export function createstaffsRegisteredEvent(
  noOfStaffs: BigInt
): staffsRegistered {
  let staffsRegisteredEvent = changetype<staffsRegistered>(newMockEvent())

  staffsRegisteredEvent.parameters = new Array()

  staffsRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "noOfStaffs",
      ethereum.Value.fromUnsignedBigInt(noOfStaffs)
    )
  )

  return staffsRegisteredEvent
}

export function createtopicEdittedEvent(
  editedId: Bytes,
  oldTopic: string,
  newTopic: string
): topicEditted {
  let topicEdittedEvent = changetype<topicEditted>(newMockEvent())

  topicEdittedEvent.parameters = new Array()

  topicEdittedEvent.parameters.push(
    new ethereum.EventParam("editedId", ethereum.Value.fromBytes(editedId))
  )
  topicEdittedEvent.parameters.push(
    new ethereum.EventParam("oldTopic", ethereum.Value.fromString(oldTopic))
  )
  topicEdittedEvent.parameters.push(
    new ethereum.EventParam("newTopic", ethereum.Value.fromString(newTopic))
  )

  return topicEdittedEvent
}
