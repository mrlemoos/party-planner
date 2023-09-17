import { type DataSnapshot } from "firebase/database";

import type Party from "@root/models/Party";
import type PartyMember from "@root/models/PartyMember";
import type Story from "@root/models/Story";

import convertFirebaseObjectToArray from "./covertFirebaseObjectToArray";

/**
 * Transforms the {@link DataSnapshot} into a {@link Party} dataset given the
 * snapshot exists. Otherwise it returns `undefined`.
 *
 * @see {@link DataSnapshot}
 * @see {@link Party}
 */
function transformSnapshotIntoPartyDataset(snapshot: DataSnapshot): Party | undefined {
  if (!snapshot.exists()) {
    return undefined;
  }

  const party = snapshot.toJSON() as Party;
  party.stories = party.stories ? (convertFirebaseObjectToArray(party.stories) as Story[]) : [];
  party.members = party.members ? (convertFirebaseObjectToArray(party.members) as PartyMember[]) : [];

  return party;
}

export default transformSnapshotIntoPartyDataset;
