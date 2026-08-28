"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type PrestyLanguage = "fr" | "en";
export type PrestyTheme = "light" | "dark";

type ContextValue = {
  language: PrestyLanguage;
  theme: PrestyTheme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const PrestyContext = createContext<ContextValue | null>(null);

export function PrestyThemeProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<PrestyLanguage>("fr");
  const [theme, setTheme] = useState<PrestyTheme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("presty-language");
    const storedTheme = window.localStorage.getItem("presty-theme");
    if (storedLanguage === "fr" || storedLanguage === "en") setLanguage(storedLanguage);
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("presty-dark", theme === "dark");
    window.localStorage.setItem("presty-language", language);
    window.localStorage.setItem("presty-theme", theme);
  }, [language, theme, ready]);

  const value = useMemo(
    () => ({
      language,
      theme,
      toggleLanguage: () => setLanguage((current) => (current === "fr" ? "en" : "fr")),
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [language, theme],
  );

  return <PrestyContext.Provider value={value}>{children}</PrestyContext.Provider>;
}

export function usePresty() {
  const value = useContext(PrestyContext);
  if (!value) throw new Error("usePresty doit être utilisé dans PrestyThemeProvider.");
  return value;
}
