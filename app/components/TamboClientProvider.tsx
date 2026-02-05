"use client";

import React from "react";
import { TamboProvider } from "@tambo-ai/react";
import { riskAlertsTools } from "./riskAlertsTools";

type Props = {
  children: React.ReactNode;
};

export function TamboClientProvider({ children }: Props) {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={riskAlertsTools}
    >
      {children}
    </TamboProvider>
  );
}
