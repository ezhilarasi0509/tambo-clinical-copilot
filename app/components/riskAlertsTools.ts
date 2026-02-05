"use client";

import {
  RiskAlertsCard,
  riskAlertsCardPropsSchema,
} from "./RiskAlertsCard";

export const riskAlertsTools = [
  {
    name: "RiskAlertsCard",
    description:
      "Shows the top risk factors for clinical deterioration for a patient.",
    component: RiskAlertsCard,
    propsSchema: riskAlertsCardPropsSchema,
  },
];
