'use client';

import { Fragment } from 'react';

import Divider from '@root/components/atoms/Divider';
import SecondaryAnchor from '@root/components/atoms/SecondaryAnchor';
import SizedBox from '@root/components/atoms/SizedBox';
import ClipboardBlock from '@root/components/molecules/ClipboardBlock';

import Description from './components/Description';
import OwnerJoinForm from './components/OwnerJoinForm';
import Title from './components/Title';
import CreatePartyProvider from './providers/CreatePartyProvider';

interface CreatePartyProps {
  partyId: string;
}

export default function CreateParty({
  partyId,
}: CreatePartyProps): JSX.Element {
  const partyLink = `/parties/${partyId}/board`;

  return (
    <CreatePartyProvider partyId={partyId} partyLink={partyLink}>
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ width: '100vw', height: '100vh' }}
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
                <SecondaryAnchor href="/">
                  Or go back to the homepage
                </SecondaryAnchor>
              </div>
            </main>
          </div>
        </Fragment>
      </div>
    </CreatePartyProvider>
  );
}
