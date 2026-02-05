"use client";

import React from "react";
import { z } from "zod";

type Labs = {
  hb?: number | null;
  wbc?: number | null;
  platelets?: number | null;
  creatinine?: number | null;
  sodium?: number | null;
  potassium?: number | null;
};

type Vitals = {
  heartRate?: number | null;
  bpSystolic?: number | null;
  bpDiastolic?: number | null;
  respRate?: number | null;
  spo2?: number | null;
  temperature?: number | null;
};

type Medication = {
  name: string;
  dose?: string | null;
  route?: string | null;
  frequency?: string | null;
};

export type LabsCardProps = {
  patientName?: string;
  labs?: Labs | null;
  vitals?: Vitals | null;
  medications?: Medication[] | null;
};

export const labsCardPropsSchema = z.object({
  patientName: z
    .string()
    .optional()
    .describe("Name of the patient for this snapshot."),
  labs: z
    .object({
      hb: z.number().nullable().optional(),
      wbc: z.number().nullable().optional(),
      platelets: z.number().nullable().optional(),
      creatinine: z.number().nullable().optional(),
      sodium: z.number().nullable().optional(),
      potassium: z.number().nullable().optional(),
    })
    .nullable()
    .optional()
    .describe("Latest key lab values for this patient."),
  vitals: z
    .object({
      heartRate: z.number().nullable().optional(),
      bpSystolic: z.number().nullable().optional(),
      bpDiastolic: z.number().nullable().optional(),
      respRate: z.number().nullable().optional(),
      spo2: z.number().nullable().optional(),
      temperature: z.number().nullable().optional(),
    })
    .nullable()
    .optional()
    .describe("Recent vital signs for this patient."),
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
    .describe("Current medications for this patient."),
});

const LabsCard: React.FC<LabsCardProps> = ({
  patientName,
  labs,
  vitals,
  medications,
}) => {
  const name = patientName ?? "this patient";

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-zinc-900">
        Clinical snapshot – {name}
      </h3>

      {labs &&
        (labs.hb != null ||
          labs.wbc != null ||
          labs.platelets != null ||
          labs.creatinine != null ||
          labs.sodium != null ||
          labs.potassium != null) && (
          <div className="mb-3 rounded-lg bg-zinc-50 p-3">
            <p className="mb-1 text-xs font-semibold text-zinc-600">
              Key lab values
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {labs.hb != null && (
                <div>
                  <p className="text-xs text-zinc-500">Hemoglobin</p>
                  <p className="font-medium text-zinc-900">{labs.hb} g/dL</p>
                </div>
              )}
              {labs.wbc != null && (
                <div>
                  <p className="text-xs text-zinc-500">WBC</p>
                  <p className="font-medium text-zinc-900">{labs.wbc} K/µL</p>
                </div>
              )}
              {labs.platelets != null && (
                <div>
                  <p className="text-xs text-zinc-500">Platelets</p>
                  <p className="font-medium text-zinc-900">
                    {labs.platelets} K/µL
                  </p>
                </div>
              )}
              {labs.creatinine != null && (
                <div>
                  <p className="text-xs text-zinc-500">Creatinine</p>
                  <p className="font-medium text-zinc-900">
                    {labs.creatinine} mg/dL
                  </p>
                </div>
              )}
              {labs.sodium != null && (
                <div>
                  <p className="text-xs text-zinc-500">Sodium</p>
                  <p className="font-medium text-zinc-900">
                    {labs.sodium} mmol/L
                  </p>
                </div>
              )}
              {labs.potassium != null && (
                <div>
                  <p className="text-xs text-zinc-500">Potassium</p>
                  <p className="font-medium text-zinc-900">
                    {labs.potassium} mmol/L
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {vitals &&
        (vitals.heartRate != null ||
          vitals.bpSystolic != null ||
          vitals.bpDiastolic != null ||
          vitals.respRate != null ||
          vitals.spo2 != null ||
          vitals.temperature != null) && (
          <div className="mb-3 rounded-lg bg-zinc-50 p-3">
            <p className="mb-1 text-xs font-semibold text-zinc-600">
              Recent vitals
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {vitals.heartRate != null && (
                <div>
                  <p className="text-xs text-zinc-500">Heart rate</p>
                  <p className="font-medium text-zinc-900">
                    {vitals.heartRate} bpm
                  </p>
                </div>
              )}
              {(vitals.bpSystolic != null || vitals.bpDiastolic != null) && (
                <div>
                  <p className="text-xs text-zinc-500">Blood pressure</p>
                  <p className="font-medium text-zinc-900">
                    {vitals.bpSystolic ?? "?"}/{vitals.bpDiastolic ?? "?"} mmHg
                  </p>
                </div>
              )}
              {vitals.respRate != null && (
                <div>
                  <p className="text-xs text-zinc-500">Respiratory rate</p>
                  <p className="font-medium text-zinc-900">
                    {vitals.respRate} /min
                  </p>
                </div>
              )}
              {vitals.spo2 != null && (
                <div>
                  <p className="text-xs text-zinc-500">SpO₂</p>
                  <p className="font-medium text-zinc-900">{vitals.spo2} %</p>
                </div>
              )}
              {vitals.temperature != null && (
                <div>
                  <p className="text-xs text-zinc-500">Temperature</p>
                  <p className="font-medium text-zinc-900">
                    {vitals.temperature} °C
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      {medications && medications.length > 0 && (
        <div className="rounded-lg bg-zinc-50 p-3">
          <p className="mb-1 text-xs font-semibold text-zinc-600">
            Current medications
          </p>
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
      )}
    </div>
  );
};

export default LabsCard;
