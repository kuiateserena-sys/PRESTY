"use client";

import { usePresty } from "./PrestyThemeProvider";

export default function PrestyControls() {
  const { language, theme, toggleLanguage, toggleTheme } = usePresty();
  const dark = theme === "dark";
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={toggleTheme} aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"} title={dark ? "Mode clair" : "Mode sombre"}
        className="presty-control flex h-10 w-10 items-center justify-center rounded-full border border-[var(--presty-border)] bg-[var(--presty-surface)] text-[var(--presty-text)]">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true"><path d="M21.1 14.5A8.6 8.6 0 0 1 9.5 2.9 8.7 8.7 0 1 0 21.1 14.5Z"/></svg>
      </button>
      <button type="button" onClick={toggleLanguage} aria-label={language === "fr" ? "Passer en anglais" : "Passer en français"} title={language === "fr" ? "English" : "Français"}
        className="presty-control h-10 min-w-10 rounded-full border border-[var(--presty-border)] bg-[var(--presty-surface)] px-3 text-xs font-semibold tracking-widest text-[var(--presty-text)]">
        {language.toUpperCase()}
      </button>
    </div>
  );
}
