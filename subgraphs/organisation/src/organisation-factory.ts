import { OrganisationCreated as OrganisationCreatedEvent } from "../generated/organisationFactory/organisationFactory"
import { OrganisationCreated } from "../generated/schema"

export function handleOrganisationCreated(
  event: OrganisationCreatedEvent
): void {
  let entity = new OrganisationCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Organisation = event.params.Organisation
  entity.Nft = event.params.Nft
  entity.organisation = event.params.organisation
  entity.uri = event.params.uri
  entity.adminName = event.params.adminName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
