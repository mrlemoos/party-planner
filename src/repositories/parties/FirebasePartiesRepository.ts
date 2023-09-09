import { randomUUID } from "node:crypto";

import { type DatabaseReference, getDatabase, ref as ref$, set, type Database, get } from "firebase/database";

import type Party from "@root/models/Party";

import createFirebaseClient from "../_firebase-client/createFirebaseClient";

import type PartiesRepository from "./PartiesRepository";
import type CreatePartyDataTransferObject from "./CreatePartyDataTransferObject";

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

    return snapshot.toJSON() as Party;
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
        },
      ],
      stories: [],
      createdAt: now,
      updatedAt: now,
    };

    await set(ref, party);

    return party;
  }
}
