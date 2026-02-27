"use client";

import {
  RiskAlertsCard,
  riskAlertsCardPropsSchema,
} from "./RiskAlertsCard";
import LabsCard, { labsCardPropsSchema } from "./LabsCard";
import MedicationsCard, {
  medicationsCardPropsSchema,
} from "./MedicationsCard";

export const allClinicalTools = [
  {
    name: "RiskAlertsCard",
    description:
      "Shows the top risk factors for clinical deterioration for a patient.",
    component: RiskAlertsCard,
    propsSchema: riskAlertsCardPropsSchema,
  },
  {
    name: "LabsCard",
    description:
      "Displays recent lab values and vitals for a patient in a clinical snapshot.",
    component: LabsCard,
    propsSchema: labsCardPropsSchema,
  },
  {
    name: "MedicationsCard",
    description:
      "Shows current medications for a patient with dose, route, and frequency.",
    component: MedicationsCard,
    propsSchema: medicationsCardPropsSchema,
  },
];
