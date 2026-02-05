"use client";

import React from "react";
import { z } from "zod";

type Medication = {
  name: string;
  dose?: string | null;
  route?: string | null;
  frequency?: string | null;
};

export type MedicationsCardProps = {
  patientName?: string;
  medications?: Medication[] | null;
};

export const medicationsCardPropsSchema = z.object({
  patientName: z
    .string()
    .optional()
    .describe("Name of the patient."),
  medications: z
    .array(
      z.object({
        name: z.string(),
        dose: z.string().nullable().optional(),
        route: z.string().nullable().optional(),
        frequency: z.string().nullable().optional(),
      }),
    )
    .nullable()
    .optional()
    .describe("List of this patient's current medications."),
});

const MedicationsCard: React.FC<MedicationsCardProps> = ({
  patientName,
  medications,
}) => {
  const name = patientName ?? "this patient";

  if (!medications || medications.length === 0) {
    return (
      <div className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-zinc-900">
          Medications – {name}
        </h3>
        <p className="text-xs text-zinc-500">No medications listed.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-zinc-900">
        Medications – {name}
      </h3>
      <ul className="space-y-1 text-xs">
        {medications.map((med, idx) => (
          <li key={idx} className="flex justify-between gap-2">
            <span className="font-medium text-zinc-900">{med.name}</span>
            <span className="text-right text-[11px] text-zinc-500">
              {[med.dose, med.route, med.frequency]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationsCard;
