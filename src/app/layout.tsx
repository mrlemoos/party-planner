import { type ReactNode } from "react";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import Inter from "@root/styles/Inter";
import "@root/styles/globals.css";

export const metadata: Metadata = {
  title: "Party Planner 🎉",
  description: "Vote your User Stories. Plan the next Sprint.",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={Inter.className} style={{ width: "100vw", height: "100vh" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
