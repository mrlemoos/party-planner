"use client";

import { memo, type JSX } from "react";

interface MemberVotesSummaryProps {
  votesWithMember: {
    memberDisplayName?: string;
    vote: number;
  }[];
}

function MemberVotesSummary$({ votesWithMember }: MemberVotesSummaryProps): JSX.Element {
  return (
    <div className="flex items-center">
      {votesWithMember.map(({ memberDisplayName, vote }) => {
        const key = `${memberDisplayName}-${vote}`;

        return (
          <span key={key}>
            <b>{memberDisplayName}</b> has voted <b>{vote}</b>
          </span>
        );
      })}
    </div>
  );
}

export default memo(MemberVotesSummary$);
