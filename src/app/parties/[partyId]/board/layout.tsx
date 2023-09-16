import { type ReactNode, type JSX } from "react";

import { Metadata } from "next";

import TopBar from "@root/components/molecules/TopBar";
import Inter from "@root/styles/Inter";

export const metadata: Metadata = {
  title: "Party Planner 🎉",
};

interface PartyBoardLayoutParams {
  partyId: string;
}

interface PartyBoardLayoutSearchParams {
  lang?: string;
}

interface PartyBoardLayoutProps {
  children: ReactNode;
  params: PartyBoardLayoutParams;
  searchParams?: PartyBoardLayoutSearchParams;
}

export default function PartyBoardLayout({ children, searchParams = { lang: "en" } }: PartyBoardLayoutProps): JSX.Element {
  return (
    <html lang={searchParams?.lang}>
      <body className={Inter.className} style={{ width: "100vw" }}>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
