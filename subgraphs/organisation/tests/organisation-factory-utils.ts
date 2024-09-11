import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { OrganisationCreated } from "../generated/organisationFactory/organisationFactory"

export function createOrganisationCreatedEvent(
  Organisation: Address,
  Nft: Address,
  organisation: string,
  uri: string,
  adminName: string
): OrganisationCreated {
  let organisationCreatedEvent = changetype<OrganisationCreated>(newMockEvent())

  organisationCreatedEvent.parameters = new Array()

  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "Organisation",
      ethereum.Value.fromAddress(Organisation)
    )
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("Nft", ethereum.Value.fromAddress(Nft))
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "organisation",
      ethereum.Value.fromString(organisation)
    )
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("adminName", ethereum.Value.fromString(adminName))
  )

  return organisationCreatedEvent
}
