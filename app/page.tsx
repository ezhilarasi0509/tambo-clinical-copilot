"use client";

import { useState } from "react";
import { patients, type Patient } from "./patientData";
import { PatientSummaryCard } from "./components/PatientSummaryCard";
import MessagesList from "./components/MessagesList";
import ChatPanel from "./components/ChatPanel";
import { PatientProvider } from "./PatientContext";
import QuickActions from "./components/QuickActions";

export type ChatIntent = "snapshot" | "meds" | "summary" | "triage" | "orders";

export type ChatMessage =
  | {
      id: string;
      role: "user";
      text: string;
    }
  | {
      id: string;
      role: "assistant";
      text: string;
      intent?: ChatIntent;
      patientId?: string;
    };

function findPatientById(patientId: string): Patient | undefined {
  return patients.find((p) => p.id.toLowerCase() === patientId.toLowerCase());
}

function extractPatientId(text: string, fallbackId: string): string {
  const lower = text.toLowerCase();

  const pMatch = lower.match(/\bp[1-6]\b/);
  if (pMatch) return pMatch[0];

  const patientNumMatch = lower.match(/patient\s*([1-6])\b/);
  if (patientNumMatch) {
    const num = patientNumMatch[1];
    return `p${num}`;
  }

  return fallbackId;
}

function detectIntent(text: string): ChatIntent {
  const lower = text.toLowerCase();

  // 1) Snapshot / overall status: highest priority
  if (
    lower.includes("snapshot") ||
    lower.includes("labs") ||
    lower.includes("lab ") ||
    lower.includes("vitals") ||
    lower.includes("vital ") ||
    lower.includes("overall status") ||
    lower.includes("status")
  ) {
    return "snapshot";
  }

  // 2) Medications
  if (
    lower.includes("medication") ||
    lower.includes("medications") ||
    lower.includes("meds") ||
    lower.includes("drug") ||
    lower.includes("medicine ")
  ) {
    return "meds";
  }

  // 3) Triage
  if (lower.includes("triage")) {
    return "triage";
  }

  // 4) Orders / investigations
  if (lower.includes("order") || lower.includes("investigation")) {
    return "orders";
  }

  // 5) Default
  return "summary";
}

function buildSummaryText(patient: Patient): string {
  const lines: string[] = [];

  lines.push(
    `${patient.name}, ${patient.age}-year-old ${patient.sex.toLowerCase()}, ${patient.diagnosis}.`,
  );

  if (patient.vitals) {
    const v = patient.vitals;
    lines.push(
      `Vitals: HR ${v.heartRate ?? "-"} bpm, BP ${v.systolicBP ?? "-"} / ${
        v.diastolicBP ?? "-"
      } mmHg, SpO₂ ${v.spo2 ?? "-"} %, RR ${v.respRate ?? "-"} /min.`,
    );
  }

  if (patient.medications && patient.medications.length > 0) {
    const medNames = patient.medications.map((m) => m.name).slice(0, 3);
    lines.push(`Key meds: ${medNames.join(", ")}.`);
  }

  return lines.join("\n");
}

function buildTriageText(patient: Patient): string {
  let risk = "Low";
  if (patient.status === "Critical") risk = "High";
  else if (patient.status === "Observation") risk = "Moderate";

  const setting =
    patient.status === "Critical"
      ? "ICU"
      : patient.status === "Observation"
      ? "Ward"
      : "OPD or Ward";

  let caution = "monitor vitals and clinical status closely.";
  const dx = patient.diagnosis.toLowerCase();

  if (dx.includes("copd")) {
    caution = "watch for rising work of breathing and dropping SpO₂.";
  } else if (dx.includes("pneumonia")) {
    caution = "monitor oxygen requirement and respiratory rate.";
  } else if (dx.includes("nstemi")) {
    caution = "watch for chest pain recurrence, arrhythmias, and hypotension.";
  }

  return `Triage: ${risk} risk | Setting: ${setting} | Caution: ${caution}`;
}

function buildOrdersText(patient: Patient): string {
  const orders: string[] = [];
  const dx = patient.diagnosis.toLowerCase();

  if (dx.includes("diabetes")) {
    orders.push(
      "Review recent HbA1c and fasting glucose; adjust antihyperglycemics based on control.",
    );
  }

  if (dx.includes("pneumonia")) {
    orders.push(
      "Repeat chest X-ray or lung ultrasound if no clinical improvement within 48–72 hours.",
    );
    orders.push(
      "Order arterial blood gas if SpO₂ remains low or respiratory distress worsens.",
    );
  }

  if (dx.includes("copd")) {
    orders.push(
      "Check arterial blood gas and serum electrolytes; ensure optimal bronchodilator and steroid therapy.",
    );
    orders.push(
      "Consider repeat chest imaging to assess for complications like pneumothorax or new infiltrates.",
    );
  }

  if (orders.length === 0) {
    orders.push(
      "Review latest labs and vitals; order CBC, renal panel, and electrolytes if not done in the last 24–48 hours.",
    );
    orders.push(
      "Assess need for follow-up imaging or specialist consult based on current diagnosis and trajectory.",
    );
  }

  return `Next 2 orders:\n• ${orders[0]}\n• ${
    orders[1] ?? "Reassess clinical status and modify plan accordingly."
  }`;
}

export default function Home() {
  const [activePatientId, setActivePatientId] = useState(patients[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const activePatient =
    patients.find((p) => p.id === activePatientId) ?? patients[0];

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    const intent = detectIntent(text);
    const patientIdFromText = extractPatientId(text, activePatientId);
    const patient = findPatientById(patientIdFromText) ?? activePatient;

    // keep left-side card in sync with the patient used in this reply
    setActivePatientId(patient.id);

    let assistantText = "";

    if (intent === "summary" || intent === "snapshot") {
      assistantText = buildSummaryText(patient);
    } else if (intent === "triage") {
      assistantText = buildTriageText(patient);
    } else if (intent === "orders") {
      assistantText = buildOrdersText(patient);
    } else if (intent === "meds") {
      if (patient.medications && patient.medications.length > 0) {
        const highRisk = patient.medications.filter(
          (m) => m.riskFlag === "high",
        );
        assistantText =
          `Medications summarized for ${patient.name}.` +
          (highRisk.length
            ? ` High-risk meds to be careful with: ${highRisk
                .map((m) => m.name)
                .join(", ")}.`
            : " No obvious high-risk medications flagged in the list.");
      } else {
        assistantText = `No medications are recorded for ${patient.name}.`;
      }
    }

    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: assistantText,
      intent,
      patientId: patient.id,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  const handleQuickAction = (action: "summary" | "triage" | "orders") => {
    const promptMap: Record<typeof action, string> = {
      summary:
        "Give a 3-bullet clinical summary for the current patient, including diagnosis, key risks, and next steps.",
      triage:
        "Provide a brief triage assessment: risk level, recommended care setting, and one monitoring caution.",
      orders:
        "Suggest two reasonable next investigations or orders for this patient.",
    };

    const fakeUserText = promptMap[action];
    handleUserMessage(fakeUserText);
  };

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

              <QuickActions onAction={handleQuickAction} />

              <div className="flex-1 overflow-y-auto max-h-96">
                <MessagesList messages={messages} />
              </div>

              <ChatPanel onSend={handleUserMessage} />
            </div>
          </div>
        </main>
      </div>
    </PatientProvider>
  );
}
