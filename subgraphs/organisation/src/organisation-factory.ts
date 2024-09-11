import { OrganisationCreated as OrganisationCreatedEvent } from "../generated/organisationFactory/organisationFactory"
import { OrganisationCreated } from "../generated/schema"

export function handleOrganisationCreated(
  event: OrganisationCreatedEvent
): void {
  let entity = new OrganisationCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Organisation_address = event.params.Organisation_address
  entity.Nft = event.params.Nft
  entity.organisation_name = event.params.organisation_name
  entity._org_uri = event.params._org_uri
  entity.adminName = event.params.adminName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
