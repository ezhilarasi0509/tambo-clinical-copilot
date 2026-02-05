"use client";

import { createContext, useContext } from "react";

type PatientContextType = {
  activePatientId: string;
  setActivePatientId: (id: string) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function usePatientContext() {
  const ctx = useContext(PatientContext);
  if (!ctx) {
    throw new Error("usePatientContext must be used within PatientProvider");
  }
  return ctx;
}

export function PatientProvider({
  value,
  children,
}: {
  value: PatientContextType;
  children: React.ReactNode;
}) {
  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}
