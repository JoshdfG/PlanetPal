import {
  AttendanceSigned as AttendanceSignedEvent,
  CampaignCreated as CampaignCreatedEvent,
  CampaignStopped as CampaignStoppedEvent,
  Handover as HandoverEvent,
  UserCampaignRegistered as UserCampaignRegisteredEvent,
  UserRegistered as UserRegisteredEvent,
  adminRemoved as adminRemovedEvent,
  adminsRegistered as adminsRegisteredEvent,
  attendanceClosed as attendanceClosedEvent,
  attendanceCreated as attendanceCreatedEvent,
  attendanceOpened as attendanceOpenedEvent,
  staffRemoved as staffRemovedEvent,
  staffsRegistered as staffsRegisteredEvent,
  topicEditted as topicEdittedEvent,
} from "../generated/organisation/organisation";
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
  topicEditted,
} from "../generated/schema";

export function handleAttendanceSigned(event: AttendanceSignedEvent): void {
  let entity = new AttendanceSigned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.Id = event.params.Id;
  entity.signer = event.params.signer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.campaignName = event.params.campaignName;
  entity.superAdmin = event.params.superAdmin;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCampaignStopped(event: CampaignStoppedEvent): void {
  let entity = new CampaignStopped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHandover(event: HandoverEvent): void {
  let entity = new Handover(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.oldMentor = event.params.oldMentor;
  entity.newMentor = event.params.newMentor;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserCampaignRegistered(
  event: UserCampaignRegisteredEvent
): void {
  let entity = new UserCampaignRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.name = event.params.name;
  entity.user_address = event.params.user_address;
  entity.email_address = event.params.email_address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.no_of_users = event.params.no_of_users;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleadminRemoved(event: adminRemovedEvent): void {
  let entity = new adminRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.no_of_admins = event.params.no_of_admins;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleadminsRegistered(event: adminsRegisteredEvent): void {
  let entity = new adminsRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.noOfAdmins = event.params.noOfAdmins;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleattendanceClosed(event: attendanceClosedEvent): void {
  let entity = new attendanceClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.Id = event.params.Id;
  entity.mentor = event.params.mentor;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleattendanceCreated(event: attendanceCreatedEvent): void {
  let entity = new attendanceCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.lectureId = event.params.lectureId;
  entity.uri = event.params.uri.toString();
  entity.topic = event.params.topic;
  entity.staff = event.params.staff;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleattendanceOpened(event: attendanceOpenedEvent): void {
  let entity = new attendanceOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.Id = event.params.Id;
  entity.mentor = event.params.mentor;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlestaffRemoved(event: staffRemovedEvent): void {
  let entity = new staffRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.no_of_staffs = event.params.no_of_staffs;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlestaffsRegistered(event: staffsRegisteredEvent): void {
  let entity = new staffsRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.noOfStaffs = event.params.noOfStaffs;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handletopicEditted(event: topicEdittedEvent): void {
  let entity = new topicEditted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.Id = event.params.Id;
  entity.oldTopic = event.params.oldTopic;
  entity.newTopic = event.params.newTopic;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
