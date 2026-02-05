"use client";

import { useTamboThreadInput } from "@tambo-ai/react";
import { usePatientContext } from "../PatientContext";

export default function QuickActions() {
  const { activePatientId } = usePatientContext();
  const { setValue, submit, isPending } = useTamboThreadInput();

  const runPrompt = async (prompt: string) => {
    setValue(prompt);
    await submit();
  };

  const handleSummary = () =>
    runPrompt(
      `Give a 3-bullet clinical summary for patient ${activePatientId}, including current diagnosis, key risks, and next 2 suggested steps.`
    );

  const handleTriage = () =>
    runPrompt(
      `Act as a careful clinician. Give a brief triage assessment for patient ${activePatientId}: current risk level, whether they need ICU / ward / OPD follow-up, and one caution about what to monitor.`
    );

  const handleNextOrders = () =>
    runPrompt(
      `Suggest two reasonable next investigations or orders for patient ${activePatientId}, based only on the available diagnosis, labs, vitals, and medications. If data is missing, say so explicitly.`
    );

  return (
    <div className="flex flex-wrap justify-end gap-2 mb-2">
      <button
        type="button"
        onClick={handleSummary}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200 disabled:opacity-50"
        disabled={isPending}
      >
        Summarize
      </button>
      <button
        type="button"
        onClick={handleTriage}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200 disabled:opacity-50"
        disabled={isPending}
      >
        Triage
      </button>
      <button
        type="button"
        onClick={handleNextOrders}
        className="px-3 py-1.5 rounded-full bg-zinc-100 text-xs text-zinc-700 hover:bg-zinc-200 disabled:opacity-50"
        disabled={isPending}
      >
        Next 2 orders
      </button>
    </div>
  );
}
