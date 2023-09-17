import { NextResponse, type NextRequest } from "next/server";

import { auth, currentUser } from "@clerk/nextjs";

import createPartiesRepository from "@root/repositories/parties/createPartiesRepository";
import handleException from "@root/util/handleException";
import getClientURL from "@root/util/getClientURL";

interface JoinPartyParams {
  partyId: string;
}

interface JoinPartyBackendContext {
  params: JoinPartyParams;
}

const clientURL = getClientURL();

export async function POST(_: NextRequest, { params: { partyId } }: JoinPartyBackendContext) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(handleException("JP-1", "You must be logged in to join a party."), {
      status: 401,
    });
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(handleException("JP-2", "Your credentials could not be found."), {
      status: 401,
    });
  }

  const userDisplayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

  try {
    const repo = createPartiesRepository();
    const hasJoined = await repo.joinParty({ userId, userDisplayName, partyId });

    if (hasJoined) {
      return NextResponse.json({
        href: `${clientURL}/party/${partyId}/board`,
      });
    }

    return NextResponse.json(
      handleException("JP-3", "An internal error occurred that has impeded you from joining the party.", {
        hasJoined,
        userId,
        userDisplayName,
        partyId,
      })
    );
  } catch (error) {
    return NextResponse.json(
      handleException("JP-4", "An error occurred while trying to join the party.", {
        error,
        partyId,
      })
    );
  }
}
