"use client";

import { useState, useCallback, Fragment } from "react";

import cls from "classnames";
import { useRouter } from "next/navigation";

import Button from "@root/components/atoms/Button";
import SizedBox from "@root/components/atoms/SizedBox";

import useCreatePartyContext from "../context-hooks/useCreatePartyContext";

export default function OwnerJoinForm(): JSX.Element {
  const [isRedirecting, updateRedirectingStatus] = useState(false);
  const router = useRouter();

  const { partyLink } = useCreatePartyContext();

  const handleStartParty = useCallback(() => {
    updateRedirectingStatus(true);

    return router.push(partyLink);
  }, [router, partyLink]);

  return (
    <Fragment>
      <SizedBox height={12} />
      <Button type='button' onClick={handleStartParty}>
        Start the party <span className={cls({ "animate-pulse": isRedirecting })}>🎉</span>
      </Button>
    </Fragment>
  );
}
