"use client";

import { patients } from "../patientData";
import LabsCard from "./LabsCard";
import MedicationsCard from "./MedicationsCard";
import type { ChatMessage } from "../page";

type Props = {
  messages: ChatMessage[];
};

export default function MessagesList({ messages }: Props) {
  if (!messages || messages.length === 0) {
    return null;
  }

  // Show only the last few messages (latest user + assistant),
  // so the visible card always matches the most recent question.
  const recentMessages = messages.slice(-4);

  return (
    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
      {recentMessages.map((m) => {
        if (m.role === "user") {
          return (
            <div
              key={m.id}
              className="self-end bg-blue-600 text-white rounded-xl px-3 py-2 max-w-md ml-auto whitespace-pre-wrap"
            >
              {m.text}
            </div>
          );
        }

        if (m.role === "assistant") {
          const patient =
            m.patientId &&
            patients.find(
              (p) => p.id.toLowerCase() === m.patientId.toLowerCase(),
            );

          return (
            <div
              key={m.id}
              className="flex flex-col gap-2 self-start max-w-md"
            >
              {m.text && (
                <div className="bg-zinc-100 text-zinc-900 rounded-xl px-3 py-2 whitespace-pre-wrap">
                  {m.text}
                </div>
              )}

              {/* Only show LabsCard when intent === "snapshot" */}
              {patient && m.intent === "snapshot" && (
                <div className="mt-1">
                  <LabsCard
                    patientName={patient.name}
                    labs={
                      patient.labs
                        ? {
                            hb: patient.labs.hemoglobin ?? null,
                            wbc: null,
                            platelets: null,
                            creatinine: patient.labs.creatinine ?? null,
                            sodium: null,
                            potassium: null,
                          }
                        : null
                    }
                    vitals={
                      patient.vitals
                        ? {
                            heartRate: patient.vitals.heartRate ?? null,
                            bpSystolic: patient.vitals.systolicBP ?? null,
                            bpDiastolic: patient.vitals.diastolicBP ?? null,
                            respRate: patient.vitals.respRate ?? null,
                            spo2: patient.vitals.spo2 ?? null,
                            temperature: null,
                          }
                        : null
                    }
                    medications={
                      patient.medications
                        ? patient.medications.map((med) => ({
                            name: med.name,
                            dose: med.dose,
                            route: med.route,
                            frequency: med.frequency,
                          }))
                        : null
                    }
                  />
                </div>
              )}

              {/* Show MedicationsCard only for meds intent */}
              {patient && m.intent === "meds" && (
                <div className="mt-1">
                  <MedicationsCard
                    patientName={patient.name}
                    medications={
                      patient.medications
                        ? patient.medications.map((med) => ({
                            name: med.name,
                            dose: med.dose,
                            route: med.route,
                            frequency: med.frequency,
                          }))
                        : null
                    }
                  />
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
