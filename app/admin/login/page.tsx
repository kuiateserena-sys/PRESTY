"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError(
        "Veuillez renseigner votre adresse e-mail et votre mot de passe."
      );
      return;
    }

    /*
      POUR LE MOMENT :
      Cette redirection permet uniquement de tester
      le parcours frontend.

      À l'étape suivante, nous remplacerons cette partie
      par l'appel réel à ton API Spring Boot.
    */

    router.push("/admin");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8f6] text-[#211d20] dark:bg-[#151117] dark:text-white">
      <div className="relative flex min-h-screen">

        {/* =====================================================
            DÉCORATIONS D'ARRIÈRE-PLAN
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#563065]/[0.05] blur-3xl dark:bg-[#cda6d8]/[0.06]" />

          <div className="absolute bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-[#563065]/[0.04] blur-3xl dark:bg-[#cda6d8]/[0.04]" />

          <div className="absolute right-[-120px] top-[15%] h-[300px] w-[300px] rounded-full bg-[#d9bfdc]/[0.16] blur-3xl dark:bg-[#8d6099]/[0.08]" />

        </div>

        {/* =====================================================
            PARTIE GAUCHE
        ===================================================== */}

        <section className="relative hidden min-h-screen w-[47%] overflow-hidden lg:flex">

          {/* Fond très léger */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#563065] via-[#684073] to-[#43244e]" />

          {/* Voile lumineux */}

          <div className="absolute -right-32 top-[18%] h-[500px] w-[500px] rounded-full bg-white/[0.06] blur-3xl" />

          <div className="absolute -left-40 bottom-[-120px] h-[450px] w-[450px] rounded-full bg-white/[0.04] blur-3xl" />

          {/* Contenu */}

          <div className="relative z-10 flex min-h-screen w-full flex-col justify-between px-14 py-12 xl:px-20">

            {/* =================================================
                LOGO
            ================================================= */}

            <div>

              <Link
                href="/"
                className="inline-flex items-center text-xl font-semibold tracking-[0.28em] text-white transition-opacity duration-300 hover:opacity-80"
              >
                PRESTY
              </Link>

              <div className="mt-3 h-px w-10 bg-white/30" />

            </div>

            {/* =================================================
                MESSAGE CENTRAL
            ================================================= */}

            <div className="relative max-w-xl">

              {/* Petit élément décoratif */}

              <div className="mb-7 flex items-center gap-3">

                <span className="h-px w-8 bg-white/40" />

                <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/55">
                  Espace professionnel
                </span>

              </div>

              <h1 className="text-[46px] font-light leading-[1.12] tracking-[-0.03em] text-white xl:text-[54px]">

                Bienvenue dans

                <br />

                <span className="font-semibold">
                  votre espace
                </span>

                <br />

                <span className="font-light text-white/75">
                  administrateur.
                </span>

              </h1>

              <p className="mt-8 max-w-md text-[14px] leading-7 text-white/60">
                Gérez votre activité PRESTY avec simplicité,
                élégance et précision depuis un espace pensé
                pour vous.
              </p>

              {/* Petite signature visuelle */}

              <div className="mt-10 flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 text-white/75"
                  >
                    <path d="M12 3v18" />
                    <path d="M3 12h18" />
                  </svg>

                </div>

                <div>

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                    Beauté
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    Élégance · Savoir-faire · PRESTY
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                BAS GAUCHE
            ================================================= */}

            <div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white/80"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>

                Retour au site PRESTY

              </Link>

            </div>

          </div>

        </section>

        {/* =====================================================
            PARTIE DROITE
        ===================================================== */}

        <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-12 lg:w-[53%] lg:px-12 xl:px-20">

          <div className="relative z-10 w-full max-w-[430px]">

            {/* =================================================
                LOGO MOBILE
            ================================================= */}

            <div className="mb-14 text-center lg:hidden">

              <Link
                href="/"
                className="text-xl font-semibold tracking-[0.28em] text-[#563065] dark:text-[#d8b9df]"
              >
                PRESTY
              </Link>

              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gray-400">
                Espace professionnel
              </p>

            </div>

            {/* =================================================
                INTRODUCTION
            ================================================= */}

            <div className="mb-10">

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-7 bg-[#563065]/40" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#563065] dark:text-[#d8b9df]">
                  Administration
                </span>

              </div>

              <h2 className="text-[36px] font-semibold tracking-[-0.035em] text-[#211d20] dark:text-white">
                Se connecter
              </h2>

              <p className="mt-4 max-w-sm text-[13px] leading-6 text-gray-500 dark:text-white/45">
                Accédez à votre espace de gestion PRESTY
                pour piloter votre activité en toute simplicité.
              </p>

            </div>

            {/* =================================================
                FORMULAIRE
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#211d20] dark:text-white"
                >
                  Adresse e-mail
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#563065]">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-[18px] w-[18px]"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="m3 7 8.05 5.37a1.7 1.7 0 0 0 1.9 0L21 7" />
                    </svg>

                  </div>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="prestybeauty6@gmail.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-black/[0.08] bg-white/80 py-3.5 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-[#563065]/50 focus:bg-white focus:ring-4 focus:ring-[#563065]/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/20 dark:focus:border-[#d8b9df]/40 dark:focus:bg-white/[0.05]"
                  />

                </div>

              </div>

              {/* =================================================
                  MOT DE PASSE
              ================================================= */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#211d20] dark:text-white"
                >
                  Mot de passe
                </label>

                <div className="group relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-[#563065]">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="h-[18px] w-[18px]"
                    >
                      <rect
                        x="4"
                        y="10"
                        width="16"
                        height="11"
                        rx="2"
                      />

                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>

                  </div>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-black/[0.08] bg-white/80 py-3.5 pl-12 pr-20 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-[#563065]/50 focus:bg-white focus:ring-4 focus:ring-[#563065]/[0.06] dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/20 dark:focus:border-[#d8b9df]/40 dark:focus:bg-white/[0.05]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-[10px] font-medium text-gray-400 transition hover:text-[#563065] dark:hover:text-[#d8b9df]"
                  >
                    {showPassword ? "Masquer" : "Afficher"}
                  </button>

                </div>

              </div>

              {/* =================================================
                  MESSAGE D'ERREUR
              ================================================= */}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200/80 bg-red-50/70 px-4 py-3.5 text-xs leading-5 text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="mt-0.5 h-4 w-4 shrink-0"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5" />
                    <path d="M12 16h.01" />
                  </svg>

                  <span>{error}</span>

                </div>
              )}

              {/* =================================================
                  BOUTON CONNEXION
              ================================================= */}

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-[#563065] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#563065]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#492856] hover:shadow-xl hover:shadow-[#563065]/20 active:translate-y-0"
              >

                <span className="relative z-10 flex items-center justify-center gap-3">

                  Se connecter

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>

                </span>

              </button>

            </form>

            {/* =================================================
                RETOUR MOBILE / BAS
            ================================================= */}

            <div className="mt-10 flex items-center justify-center">

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[11px] text-gray-400 transition-colors duration-300 hover:text-[#563065] dark:hover:text-[#d8b9df]"
              >

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-3.5 w-3.5"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>

                Retour au site PRESTY

              </Link>

            </div>

            {/* =================================================
                PETITE SIGNATURE
            ================================================= */}

            <div className="mt-14 text-center">

              <div className="mx-auto mb-3 h-px w-8 bg-[#563065]/15 dark:bg-white/10" />

              <p className="text-[9px] uppercase tracking-[0.28em] text-gray-300 dark:text-white/20">
                Beauté · Élégance · Savoir-faire
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}