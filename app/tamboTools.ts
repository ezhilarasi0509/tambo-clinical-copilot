// app/tamboTools.ts
"use server";

import { patients } from "./patientData";

export async function fetchMockPatient(patientId: string) {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) return null;

  return {
    id: patient.id,
    name: patient.name,
    age: patient.age,
    sex: patient.sex,
    diagnosis: patient.diagnosis,
    status: patient.status,
    location: patient.location,
  };
}

export async function fetchPatientLabsAndVitals(patientId: string) {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    return {
      patientName: undefined,
      labs: null,
      vitals: null,
      medications: null,
    };
  }

  const { labs, vitals, medications } = patient;

  return {
    patientName: patient.name,
    labs: labs
      ? {
          hb: labs.hemoglobin ?? null,
          wbc: null,
          platelets: null,
          creatinine: labs.creatinine ?? null,
          sodium: null,
          potassium: null,
        }
      : null,
    vitals: vitals
      ? {
          heartRate: vitals.heartRate ?? null,
          bpSystolic: vitals.systolicBP ?? null,
          bpDiastolic: vitals.diastolicBP ?? null,
          respRate: vitals.respRate ?? null,
          spo2: vitals.spo2 ?? null,
          temperature: null,
        }
      : null,
    medications: medications
      ? medications.map((m) => ({
          name: m.name,
          dose: m.dose ?? null,
          route: m.route ?? null,
          frequency: m.frequency ?? null,
        }))
      : null,
  };
}
