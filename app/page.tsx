"use client";

import { useState } from "react";
import { patients } from "./patientData";
import { PatientSummaryCard } from "./components/PatientSummaryCard";
import MessagesList from "./components/MessagesList";
import ChatPanel from "./components/ChatPanel";
import { PatientProvider } from "./PatientContext";
import QuickActions from "./components/QuickActions";

export default function Home() {
  const [activePatientId, setActivePatientId] = useState(patients[0].id);
  const activePatient = patients.find((p) => p.id === activePatientId)!;

  return (
    <PatientProvider value={{ activePatientId, setActivePatientId }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="container mx-auto p-6 max-w-6xl space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h1 className="text-2xl font-semibold text-zinc-900">
              Clinical Copilot
            </h1>

            <div className="flex items-center gap-2">
              <label
                htmlFor="patient-select"
                className="text-sm text-zinc-600 whitespace-nowrap"
              >
                Select patient:
              </label>
              <select
                id="patient-select"
                value={activePatientId}
                onChange={(e) => setActivePatientId(e.target.value)}
                className="px-3 py-2 rounded-lg border bg-white text-sm shadow-sm"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left: patient summary card */}
            <PatientSummaryCard
              patient={activePatient}
              isActive={true}
              onSelect={() => {}}
            />

            {/* Right: chat */}
            <div className="bg-white/80 rounded-2xl shadow-sm p-5 flex flex-col ml-auto w-full max-w-2xl lg:max-w-3xl min-h-[440px]">
              <h2 className="text-sm font-medium text-zinc-700 mb-2">
                Assistant chat
              </h2>

              {/* One-click actions like "Summarize current patient" */}
              <QuickActions />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto max-h-96">
                <MessagesList />
              </div>

              {/* Input */}
              <ChatPanel />
            </div>
          </div>
        </main>
      </div>
    </PatientProvider>
  );
}
