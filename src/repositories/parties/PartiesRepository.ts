import type Party from "@root/models/Party";
import type CreatePartyDataTransferObject from "./CreatePartyDataTransferObject";

export default interface PartiesRepository {
  createParty(dto: CreatePartyDataTransferObject): Promise<Party>;
  getParty(partyId: string): Promise<Party | null>;
}
