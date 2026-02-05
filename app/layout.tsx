"use client";

import React from "react";
import "./globals.css";
import TamboClientProvider from "./components/TamboClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TamboClientProvider>{children}</TamboClientProvider>
      </body>
    </html>
  );
}
