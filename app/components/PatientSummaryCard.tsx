"use client";

import React from "react";
import type { Patient } from "../patientData";

type Props = {
  patient: Patient;
  isActive: boolean;
  onSelect: () => void;
};

function formatLastUpdated(value?: string) {
  if (!value) return "";
  const d = new Date(value);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function PatientSummaryCard({ patient, isActive, onSelect }: Props) {
  const {
    name,
    age,
    id,
    diagnosis,
    sex,
    mrn,
    status,
    location,
    lastUpdated,
  } = patient;

  const riskLevel =
    status === "Critical" ? "high" : status === "Observation" ? "medium" : "low";

  const riskColor =
    riskLevel === "high"
      ? "bg-red-100 text-red-800"
      : riskLevel === "medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  const statusColor =
    status === "Critical"
      ? "bg-red-100 text-red-800"
      : status === "Observation"
      ? "bg-yellow-100 text-yellow-800"
      : status === "Stable"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-gray-100 text-gray-800";

  return (
    <button
      onClick={onSelect}
      className={`border rounded-2xl p-5 shadow-sm bg-white/80 backdrop-blur space-y-4 text-left w-full ${
        isActive ? "ring-2 ring-blue-400" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-xl text-zinc-900">{name}</h2>
          <p className="text-sm text-zinc-600">
            ID: {id} · Age: {age}
            {sex ? <> · {sex}</> : null}
          </p>
          {mrn && (
            <p className="text-xs text-zinc-500 mt-1">MRN: {mrn}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${riskColor}`}
          >
            {riskLevel.toUpperCase()} RISK
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {location && (
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Location
            </p>
            <p className="text-zinc-800">{location}</p>
          </div>
        )}
        {lastUpdated && (
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Last updated
            </p>
            <p className="text-zinc-800 text-xs">
              {formatLastUpdated(lastUpdated)}
            </p>
          </div>
        )}
        {diagnosis && (
          <div className="bg-zinc-50 rounded-lg p-3 sm:col-span-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Key diagnosis
            </p>
            <p className="text-zinc-800 text-sm">{diagnosis}</p>
          </div>
        )}
      </div>

      {/* Chief complaint (reuse diagnosis for now) */}
      <div className="text-sm">
        <p className="font-medium text-zinc-700">Chief complaint</p>
        <p className="text-zinc-800 mt-1">{diagnosis}</p>
      </div>
    </button>
  );
}
