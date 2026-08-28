"use client";

import { PrestyThemeProvider } from "./PrestyThemeProvider";

export default function PrestyAppProviders({ children }: { children: React.ReactNode }) {
  return <PrestyThemeProvider>{children}</PrestyThemeProvider>;
}
