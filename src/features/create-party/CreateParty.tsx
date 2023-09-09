"use client";

import { Fragment } from "react";

import ClipboardBlock from "@root/components/molecules/ClipboardBlock";
import Divider from "@root/components/atoms/Divider";
import SizedBox from "@root/components/atoms/SizedBox";

import OwnerJoinForm from "./components/OwnerJoinForm";
import CreatePartyProvider from "./providers/CreatePartyProvider";
import SecondaryAnchor from "@root/components/atoms/SecondaryAnchor";
import Title from "./components/Title";
import Description from "./components/Description";

interface CreatePartyProps {
  partyId: string;
}

export default function CreateParty({ partyId }: CreatePartyProps): JSX.Element {
  const partyLink = `/parties/${partyId}/board`;

  return (
    <CreatePartyProvider partyId={partyId} partyLink={partyLink}>
      <div
        className="flex flex-col justify-center items-center fixed inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Fragment>
          <Title />
          <SizedBox className="h-8" />
          <Description />
          <SizedBox height={50} />
          <div className="mx-auto max-w-[900px]">
            <main className="flex flex-col gap-4">
              <ClipboardBlock textToCopy={partyLink}>{partyId}</ClipboardBlock>
              <SizedBox height={36} />
              <Divider />
              <SizedBox height={36} />
              <OwnerJoinForm />
              <div className="mt-4 flex justify-center">
                <SecondaryAnchor href="/">Or go back to the homepage</SecondaryAnchor>
              </div>
            </main>
          </div>
        </Fragment>
      </div>
    </CreatePartyProvider>
  );
}
