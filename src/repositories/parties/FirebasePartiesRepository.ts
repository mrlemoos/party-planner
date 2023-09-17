import { randomUUID } from "node:crypto";

import { type DatabaseReference, getDatabase, ref as ref$, set, type Database, get, child } from "firebase/database";

import transformSnapshotIntoPartyDataset from "@root/util/transformSnapshotIntoPartyDataset";
import type Party from "@root/models/Party";
import type PartyMember from "@root/models/PartyMember";

import createFirebaseClient from "../_firebase-client/createFirebaseClient";

import type PartiesRepository from "./PartiesRepository";
import type CreatePartyDataTransferObject from "./CreatePartyDataTransferObject";
import type JoinPartyDataTransferObject from "./JoinPartyDataTransferObject";

// #region Utilities & Constants

function $getPartyRef(database: Database, partyId: string): DatabaseReference {
  return ref$(database, `parties/${partyId}`);
}

// #endregion

export default class FirebasePartiesRepository implements PartiesRepository {
  constructor() {
    createFirebaseClient();
  }
  public async getParty(partyId: string): Promise<Party | null> {
    const database = getDatabase();
    const ref = $getPartyRef(database, partyId);

    const snapshot = await get(ref);

    if (!snapshot.exists()) {
      return null;
    }

    const party = transformSnapshotIntoPartyDataset(snapshot);
    return party ?? null;
  }
  public async createParty({ ownerUserId, ownerDisplayName }: CreatePartyDataTransferObject): Promise<Party> {
    const partyId = randomUUID();
    const database = getDatabase();
    const ref = $getPartyRef(database, partyId);

    const now = new Date().toISOString();

    const party: Party = {
      ownerUserId,
      partyId,
      members: [
        {
          displayName: ownerDisplayName,
          userId: ownerUserId,
          joinedAt: now,
          lastSeenAt: now,
          status: "Disconnected",
        },
      ],
      stories: [],
      createdAt: now,
      updatedAt: now,
      voteSession: {
        status: "Not Started",
        timer: 30 * 1000,
        currentStoryId: "",
      },
    };

    await set(ref, party);

    return party;
  }
  public async joinParty({ userId, partyId, userDisplayName }: JoinPartyDataTransferObject): Promise<boolean> {
    const party = await this.getParty(partyId);

    if (!party) {
      return false;
    }

    try {
      const database = getDatabase();
      const ref = $getPartyRef(database, partyId);

      if (party.members.find(({ userId: userId$ }) => userId === userId$)) {
        // If the user always is the member of the party, then we'll return true as if they
        // had just been appended to the members list.
        return true;
      }

      const now = new Date().toISOString();

      const userAsMember: PartyMember = {
        displayName: userDisplayName,
        userId,
        joinedAt: now,
        lastSeenAt: now,
        status: "Disconnected",
      };
      const newMembers = [...party.members, userAsMember];

      const refChild = child(ref, "members");
      await set(refChild, newMembers);
      return true;
    } catch (error) {
      console.error(
        '🪡 An error occurred while trying to join the party. The error was: "%s". The party ID was: "%s". The user ID was: "%s".',
        error,
        partyId,
        userId
      );
      return false;
    }
  }
}
