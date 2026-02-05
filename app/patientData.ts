// app/patientData.ts

export type LabValues = {
  hba1c?: number;
  creatinine?: number;
  ldl?: number;
  hemoglobin?: number;
  lastUpdated?: string; // ISO
};

export type Vitals = {
  heartRate?: number;
  systolicBP?: number;
  diastolicBP?: number;
  spo2?: number;
  respRate?: number;
};

export type Medication = {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  startDate?: string;
  riskFlag?: "high" | "medium" | "low";
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "Male" | "Female" | "Other";
  mrn: string;
  diagnosis: string;
  status: "Stable" | "Critical" | "Observation";
  location: string;
  lastUpdated: string; // ISO string
  labs?: LabValues;
  vitals?: Vitals;
  medications?: Medication[];
};

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Ananya Rao",
    age: 45,
    sex: "Female",
    mrn: "MRN-102938",
    diagnosis: "Type 2 Diabetes, Hypertension",
    status: "Stable",
    location: "Ward 3B",
    lastUpdated: "2026-02-01T09:30:00Z",
    labs: {
      hba1c: 7.8,
      creatinine: 0.9,
      ldl: 110,
      hemoglobin: 12.4,
      lastUpdated: "2026-01-15T08:00:00Z",
    },
    vitals: {
      heartRate: 78,
      systolicBP: 132,
      diastolicBP: 84,
      spo2: 98,
      respRate: 16,
    },
    medications: [
      {
        name: "Metformin",
        dose: "500 mg",
        route: "PO",
        frequency: "BD",
        startDate: "2024-11-01",
        riskFlag: "low",
      },
      {
        name: "Amlodipine",
        dose: "5 mg",
        route: "PO",
        frequency: "OD",
        startDate: "2025-03-10",
        riskFlag: "medium",
      },
    ],
  },
  {
    id: "p2",
    name: "Vikram Singh",
    age: 62,
    sex: "Male",
    mrn: "MRN-483920",
    diagnosis: "NSTEMI, Post-PCI day 2",
    status: "Observation",
    location: "CCU 2",
    lastUpdated: "2026-02-01T10:15:00Z",
    labs: {
      creatinine: 1.2,
      hemoglobin: 11.0,
      ldl: 140,
      lastUpdated: "2026-02-01T06:30:00Z",
    },
    vitals: {
      heartRate: 88,
      systolicBP: 118,
      diastolicBP: 72,
      spo2: 96,
      respRate: 18,
    },
    medications: [
      {
        name: "Aspirin",
        dose: "75 mg",
        route: "PO",
        frequency: "OD",
        riskFlag: "medium",
      },
      {
        name: "Atorvastatin",
        dose: "40 mg",
        route: "PO",
        frequency: "HS",
        riskFlag: "low",
      },
      {
        name: "Heparin infusion",
        dose: "1000 units/hr",
        route: "IV",
        frequency: "Continuous",
        riskFlag: "high",
      },
    ],
  },
  {
    id: "p3",
    name: "Meera Nair",
    age: 54,
    sex: "Female",
    mrn: "MRN-574829",
    diagnosis: "Triple-negative breast carcinoma, on AC-T",
    status: "Stable",
    location: "Day Care Oncology",
    lastUpdated: "2026-02-01T11:05:00Z",
    labs: {
      hemoglobin: 10.2,
      creatinine: 0.8,
      lastUpdated: "2026-01-28T09:00:00Z",
    },
    vitals: {
      heartRate: 82,
      systolicBP: 120,
      diastolicBP: 76,
      spo2: 99,
      respRate: 17,
    },
    medications: [
      {
        name: "Doxorubicin + Cyclophosphamide",
        dose: "per BSA",
        route: "IV",
        frequency: "Cycle q21d",
        riskFlag: "high",
      },
      {
        name: "Ondansetron",
        dose: "4 mg",
        route: "PO",
        frequency: "PRN",
        riskFlag: "low",
      },
    ],
  },
  {
    id: "p4",
    name: "Karthik Menon",
    age: 38,
    sex: "Male",
    mrn: "MRN-948372",
    diagnosis: "Community-acquired pneumonia, on IV antibiotics",
    status: "Observation",
    location: "Ward 2A",
    lastUpdated: "2026-02-01T08:50:00Z",
    labs: {
      hemoglobin: 13.1,
      creatinine: 1.0,
      lastUpdated: "2026-01-31T07:30:00Z",
    },
    vitals: {
      heartRate: 96,
      systolicBP: 110,
      diastolicBP: 70,
      spo2: 93,
      respRate: 22,
    },
    medications: [
      {
        name: "Ceftriaxone",
        dose: "1 g",
        route: "IV",
        frequency: "BD",
        riskFlag: "medium",
      },
      {
        name: "Paracetamol",
        dose: "1 g",
        route: "IV",
        frequency: "TDS",
        riskFlag: "low",
      },
    ],
  },
  {
    id: "p5",
    name: "Fatima Begum",
    age: 70,
    sex: "Female",
    mrn: "MRN-384756",
    diagnosis: "COPD with acute exacerbation",
    status: "Critical",
    location: "ICU 1",
    lastUpdated: "2026-02-01T07:40:00Z",
    labs: {
      hemoglobin: 11.5,
      creatinine: 1.4,
      lastUpdated: "2026-02-01T05:45:00Z",
    },
    vitals: {
      heartRate: 110,
      systolicBP: 100,
      diastolicBP: 64,
      spo2: 88,
      respRate: 26,
    },
    medications: [
      {
        name: "Nebulized Salbutamol",
        dose: "2.5 mg",
        route: "Neb",
        frequency: "Q4H",
        riskFlag: "medium",
      },
      {
        name: "IV Methylprednisolone",
        dose: "40 mg",
        route: "IV",
        frequency: "BD",
        riskFlag: "high",
      },
      {
        name: "Oxygen",
        dose: "2–4 L/min",
        route: "Nasal prongs",
        frequency: "Continuous",
        riskFlag: "high",
      },
    ],
  },
  {
    id: "p6",
    name: "Rahul Iyer",
    age: 29,
    sex: "Male",
    mrn: "MRN-675849",
    diagnosis: "Post-op day 1, laparoscopic appendectomy",
    status: "Stable",
    location: "Surgical Ward 4C",
    lastUpdated: "2026-02-01T12:20:00Z",
    labs: {
      hemoglobin: 13.5,
      creatinine: 0.9,
      lastUpdated: "2026-01-30T06:15:00Z",
    },
    vitals: {
      heartRate: 80,
      systolicBP: 118,
      diastolicBP: 74,
      spo2: 99,
      respRate: 18,
    },
    medications: [
      {
        name: "Paracetamol",
        dose: "1 g",
        route: "IV",
        frequency: "TDS",
        riskFlag: "low",
      },
      {
        name: "Cefuroxime",
        dose: "750 mg",
        route: "IV",
        frequency: "BD",
        riskFlag: "medium",
      },
    ],
  },
];
