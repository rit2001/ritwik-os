"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type SignalLocationId =
  "kolkata" | "bengaluru" | "pune" | "toronto" | "usa";

export type SignalProjectId = "thesislens" | "traceforge" | "converge";

type SignalContextValue = {
  activeLocation: SignalLocationId | null;
  activeProject: SignalProjectId | null;
  activeCapability: string | null;
  activeTimelineEvent: string | null;
  setActiveLocation: (id: SignalLocationId | null) => void;
  setActiveProject: (id: SignalProjectId | null) => void;
  setActiveCapability: (id: string | null) => void;
  setActiveTimelineEvent: (id: string | null) => void;
};

const SignalContext = createContext<SignalContextValue | null>(null);

export function SignalProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [activeLocation, setLocation] = useState<SignalLocationId | null>(null);
  const [activeProject, setProject] = useState<SignalProjectId | null>(null);
  const [activeCapability, setCapability] = useState<string | null>(null);
  const [activeTimelineEvent, setTimelineEvent] = useState<string | null>(
    "iit-kharagpur",
  );

  const setActiveLocation = useCallback((id: SignalLocationId | null) => {
    setLocation(id);
  }, []);
  const setActiveProject = useCallback((id: SignalProjectId | null) => {
    setProject(id);
  }, []);
  const setActiveCapability = useCallback((id: string | null) => {
    setCapability(id);
  }, []);
  const setActiveTimelineEvent = useCallback((id: string | null) => {
    setTimelineEvent(id);
  }, []);

  const value = useMemo(
    () => ({
      activeLocation,
      activeProject,
      activeCapability,
      activeTimelineEvent,
      setActiveLocation,
      setActiveProject,
      setActiveCapability,
      setActiveTimelineEvent,
    }),
    [
      activeCapability,
      activeLocation,
      activeProject,
      activeTimelineEvent,
      setActiveCapability,
      setActiveLocation,
      setActiveProject,
      setActiveTimelineEvent,
    ],
  );

  return (
    <SignalContext.Provider value={value}>{children}</SignalContext.Provider>
  );
}

export function useSignalState() {
  const value = useContext(SignalContext);

  if (!value) {
    throw new Error("useSignalState must be used inside SignalProvider");
  }

  return value;
}
