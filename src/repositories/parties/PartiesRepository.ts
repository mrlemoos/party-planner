import type Party from "@root/models/Party";
import type CreatePartyDataTransferObject from "./CreatePartyDataTransferObject";
import type JoinPartyDataTransferObject from './JoinPartyDataTransferObject';

export default interface PartiesRepository {
  createParty(dto: CreatePartyDataTransferObject): Promise<Party>;
  getParty(partyId: string): Promise<Party | null>;
  joinParty(dto: JoinPartyDataTransferObject): Promise<boolean>;
}
