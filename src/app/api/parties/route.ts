import { NextResponse } from "next/server";

import { auth, currentUser } from "@clerk/nextjs";

import handleException from "@root/util/handleException";
import createPartiesRepository from "@root/repositories/parties/createPartiesRepository";

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(handleException("CP-1", "You must be logged in to create a party."), {
      status: 401,
    });
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(handleException("CP-3", "Could not load the user data."), {
      status: 401,
    });
  }

  const ownerDisplayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

  try {
    const repo = createPartiesRepository();
    const { partyId } = await repo.createParty({ ownerUserId: userId, ownerDisplayName });

    return NextResponse.json(
      {
        partyId,
      },
      {
        status: 201,
      }
    );
  } catch {
    return NextResponse.json(
      handleException(
        "CP-2",
        "Failed to create party due to an internal error. Please try again soon."
      ),
      {
        status: 500,
      }
    );
  }
}
