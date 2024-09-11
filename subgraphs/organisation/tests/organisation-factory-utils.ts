import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { OrganisationCreated } from "../generated/organisationFactory/organisationFactory"

export function createOrganisationCreatedEvent(
  Organisation_address: Address,
  Nft: Address,
  organisation_name: string,
  _org_uri: string,
  adminName: string
): OrganisationCreated {
  let organisationCreatedEvent = changetype<OrganisationCreated>(newMockEvent())

  organisationCreatedEvent.parameters = new Array()

  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "Organisation_address",
      ethereum.Value.fromAddress(Organisation_address)
    )
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("Nft", ethereum.Value.fromAddress(Nft))
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "organisation_name",
      ethereum.Value.fromString(organisation_name)
    )
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("_org_uri", ethereum.Value.fromString(_org_uri))
  )
  organisationCreatedEvent.parameters.push(
    new ethereum.EventParam("adminName", ethereum.Value.fromString(adminName))
  )

  return organisationCreatedEvent
}
