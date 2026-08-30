"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ReservationStatus =
  | "Confirmée"
  | "Annulée"
  | "Terminée";

type PaymentStatus =
  | "Payé intégralement à la réservation"
  | "Acompte payé à la réservation"
  | "Réservé sans paiement"
  | "Solde payé sur place";

type PaymentMoment =
  | "À la réservation"
  | "Sur place"
  | "À la réservation + sur place"
  | "Aucun paiement effectué";

type PaymentMethod =
  | "Orange Money"
  | "MTN MoMo"
  | "Carte bancaire"
  | "Espèces"
  | "—";

type Payment = {
  id: string;

  client: string;
  email: string;
  telephone: string;

  prestation: string;
  date: string;
  creneau: string;
  lieu: "Salon" | "Domicile";
  localisation?: string;

  prixPrestation: number;
  supplementDomicile: number;
  prixTotal: number;

  montantReservation: number;
  montantSurPlace: number;
  resteAPayer: number;

  statutReservation: ReservationStatus;
  statutPaiement: PaymentStatus;

  momentPaiement: PaymentMoment;

  moyenReservation: PaymentMethod;
  moyenSurPlace: PaymentMethod;

  referenceReservation: string;
  referenceSurPlace: string;
};

/* =========================================================
   DONNÉES DE DÉMONSTRATION
   Ces données seront remplacées par le backend.
========================================================= */

const payments: Payment[] = [
  {
    id: "PAY-001",

    client: "Sarah Mbarga",
    email: "sarah.mbarga@gmail.com",
    telephone: "6 90 12 34 56",

    prestation: "Nattes américaines",
    date: "05 septembre 2026",
    creneau: "10:30 AM",
    lieu: "Salon",

    prixPrestation: 5000,
    supplementDomicile: 0,
    prixTotal: 5000,

    montantReservation: 5000,
    montantSurPlace: 0,
    resteAPayer: 0,

    statutReservation: "Confirmée",
    statutPaiement:
      "Payé intégralement à la réservation",

    momentPaiement: "À la réservation",

    moyenReservation: "Orange Money",
    moyenSurPlace: "—",

    referenceReservation: "OM-928451",
    referenceSurPlace: "—",
  },

  {
    id: "PAY-002",

    client: "Nadia Fomba",
    email: "nadia.fomba@gmail.com",
    telephone: "6 77 45 67 89",

    prestation: "Lace Frontale",
    date: "06 septembre 2026",
    creneau: "01:30 PM",
    lieu: "Domicile",
    localisation: "Bonamoussadi, Douala",

    prixPrestation: 10000,
    supplementDomicile: 5000,
    prixTotal: 15000,

    montantReservation: 7500,
    montantSurPlace: 0,
    resteAPayer: 7500,

    statutReservation: "Confirmée",
    statutPaiement:
      "Acompte payé à la réservation",

    momentPaiement:
      "À la réservation + sur place",

    moyenReservation: "MTN MoMo",
    moyenSurPlace: "—",

    referenceReservation: "MM-583920",
    referenceSurPlace: "—",
  },

  {
    id: "PAY-003",

    client: "Mélissa Tchana",
    email: "melissa.tchana@gmail.com",
    telephone: "6 98 11 22 33",

    prestation: "Rasta américain",
    date: "07 septembre 2026",
    creneau: "09:00 AM",
    lieu: "Salon",

    prixPrestation: 10000,
    supplementDomicile: 0,
    prixTotal: 10000,

    montantReservation: 0,
    montantSurPlace: 0,
    resteAPayer: 10000,

    statutReservation: "Confirmée",
    statutPaiement:
      "Réservé sans paiement",

    momentPaiement:
      "Aucun paiement effectué",

    moyenReservation: "—",
    moyenSurPlace: "—",

    referenceReservation: "—",
    referenceSurPlace: "—",
  },

  {
    id: "PAY-004",

    client: "Carine Ngono",
    email: "carine.ngono@gmail.com",
    telephone: "6 70 55 44 33",

    prestation: "Locks & boucles",
    date: "08 septembre 2026",
    creneau: "03:00 PM",
    lieu: "Domicile",
    localisation: "Makepe, Douala",

    prixPrestation: 10000,
    supplementDomicile: 5000,
    prixTotal: 15000,

    montantReservation: 7500,
    montantSurPlace: 7500,
    resteAPayer: 0,

    statutReservation: "Terminée",
    statutPaiement:
      "Solde payé sur place",

    momentPaiement:
      "À la réservation + sur place",

    moyenReservation: "Orange Money",
    moyenSurPlace: "Espèces",

    referenceReservation: "OM-741258",
    referenceSurPlace: "ESP-00125",
  },

  {
    id: "PAY-005",

    client: "Estelle Kamga",
    email: "estelle.kamga@gmail.com",
    telephone: "6 96 78 12 45",

    prestation: "Passe-mèche américain",
    date: "09 septembre 2026",
    creneau: "11:00 AM",
    lieu: "Salon",

    prixPrestation: 10000,
    supplementDomicile: 0,
    prixTotal: 10000,

    montantReservation: 5000,
    montantSurPlace: 0,
    resteAPayer: 5000,

    statutReservation: "Confirmée",
    statutPaiement:
      "Acompte payé à la réservation",

    momentPaiement:
      "À la réservation + sur place",

    moyenReservation: "Orange Money",
    moyenSurPlace: "—",

    referenceReservation: "OM-458721",
    referenceSurPlace: "—",
  },

  {
    id: "PAY-006",

    client: "Prisca Etoa",
    email: "prisca.etoa@gmail.com",
    telephone: "6 75 33 21 09",

    prestation: "French Curls",
    date: "10 septembre 2026",
    creneau: "04:30 PM",
    lieu: "Salon",

    prixPrestation: 10000,
    supplementDomicile: 0,
    prixTotal: 10000,

    montantReservation: 0,
    montantSurPlace: 0,
    resteAPayer: 10000,

    statutReservation: "Confirmée",
    statutPaiement:
      "Réservé sans paiement",

    momentPaiement:
      "Aucun paiement effectué",

    moyenReservation: "—",
    moyenSurPlace: "—",

    referenceReservation: "—",
    referenceSurPlace: "—",
  },
];

/* =========================================================
   FORMAT FCFA
========================================================= */

function formatFCFA(amount: number) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/* =========================================================
   COULEUR STATUT PAIEMENT
========================================================= */

function paymentStatusClass(status: PaymentStatus) {
  switch (status) {
    case "Payé intégralement à la réservation":
      return "bg-green-500/10 text-green-600";

    case "Acompte payé à la réservation":
      return "bg-orange-500/10 text-orange-600";

    case "Réservé sans paiement":
      return "bg-gray-500/10 text-gray-500";

    case "Solde payé sur place":
      return "bg-blue-500/10 text-blue-600";

    default:
      return "bg-gray-500/10 text-gray-500";
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function PaiementsPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "Tous" | "Payés" | "Partiels" | "Sans paiement"
  >("Tous");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const totalPrestations = payments.reduce(
    (total, payment) =>
      total + payment.prixTotal,
    0
  );

  const totalEncaisse = payments.reduce(
    (total, payment) =>
      total +
      payment.montantReservation +
      payment.montantSurPlace,
    0
  );

  const totalRestant = payments.reduce(
    (total, payment) =>
      total + payment.resteAPayer,
    0
  );

  const paiementsComplets = payments.filter(
    (payment) => payment.resteAPayer === 0
  ).length;

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        payment.client
          .toLowerCase()
          .includes(searchValue) ||
        payment.prestation
          .toLowerCase()
          .includes(searchValue) ||
        payment.email
          .toLowerCase()
          .includes(searchValue) ||
        payment.id
          .toLowerCase()
          .includes(searchValue);

      let matchesFilter = true;

      if (filter === "Payés") {
        matchesFilter =
          payment.resteAPayer === 0;
      }

      if (filter === "Partiels") {
        matchesFilter =
          payment.montantReservation > 0 &&
          payment.resteAPayer > 0;
      }

      if (filter === "Sans paiement") {
        matchesFilter =
          payment.montantReservation === 0 &&
          payment.montantSurPlace === 0;
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-black/[0.06] bg-white/70 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 md:px-10">

          <div>

            <div className="flex items-center gap-3">

              <Link
                href="/admin"
                className="text-sm text-gray-400 transition hover:text-[#563065]"
              >
                Administration
              </Link>

              <span className="text-gray-300">
                /
              </span>

              <span className="text-sm font-medium">
                Paiements
              </span>

            </div>

            <h1 className="mt-4 text-4xl font-light tracking-[-0.05em] md:text-5xl">
              Paiements
            </h1>

            <p className="mt-3 max-w-[680px] text-sm leading-7 text-gray-500">
              Suivez précisément les paiements effectués à
              la réservation et ceux qui seront réglés sur place.
            </p>

          </div>

          <div className="hidden rounded-full bg-[#563065]/10 px-5 py-3 text-sm font-medium text-[#563065] md:block">
            PRESTY · Paiements
          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-6 py-10 md:px-10">

        {/* ===================================================
            STATISTIQUES
        ==================================================== */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL PRESTATIONS */}

          <div className="rounded-[1.8rem] border border-black/[0.06] bg-white/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">

            <div className="flex items-center justify-between">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Total prestations
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#563065]/10">
                💇🏾‍♀️
              </span>

            </div>

            <p className="mt-6 text-2xl font-medium">
              {formatFCFA(totalPrestations)}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Valeur totale des rendez-vous
            </p>

          </div>

          {/* ENCAISSÉ */}

          <div className="rounded-[1.8rem] border border-black/[0.06] bg-white/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">

            <div className="flex items-center justify-between">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Total encaissé
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                💰
              </span>

            </div>

            <p className="mt-6 text-2xl font-medium">
              {formatFCFA(totalEncaisse)}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Réservation + paiements sur place
            </p>

          </div>

          {/* RESTANT */}

          <div className="rounded-[1.8rem] border border-black/[0.06] bg-white/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">

            <div className="flex items-center justify-between">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Solde à régler
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                ⏳
              </span>

            </div>

            <p className="mt-6 text-2xl font-medium">
              {formatFCFA(totalRestant)}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              À payer le jour de la prestation
            </p>

          </div>

          {/* COMPLETS */}

          <div className="rounded-[1.8rem] border border-black/[0.06] bg-white/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">

            <div className="flex items-center justify-between">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Paiements complets
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                ✓
              </span>

            </div>

            <p className="mt-6 text-2xl font-medium">
              {paiementsComplets}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Rendez-vous entièrement réglés
            </p>

          </div>

        </div>

        {/* ===================================================
            EXPLICATION
        ==================================================== */}

        <div className="mt-8 rounded-[1.8rem] border border-[#563065]/10 bg-[#563065]/[0.04] p-6">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#563065]/10">
              💡
            </div>

            <div>

              <h2 className="font-medium">
                Comment lire les paiements ?
              </h2>

              <p className="mt-2 max-w-[900px] text-sm leading-7 text-gray-500">
                Une cliente peut réserver en payant la totalité,
                verser uniquement un acompte ou réserver sans
                paiement. Dans les deux derniers cas, le montant
                restant sera réglé sur place le jour de la prestation.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            RECHERCHE ET FILTRES
        ==================================================== */}

        <div className="mt-8 flex flex-col gap-4 rounded-[1.8rem] border border-black/[0.06] bg-white/70 p-5 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] lg:flex-row lg:items-center lg:justify-between">

          {/* RECHERCHE */}

          <div className="relative w-full lg:max-w-[450px]">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Rechercher une cliente, prestation..."
              className="w-full rounded-full border border-black/[0.08] bg-white px-11 py-3.5 text-sm outline-none transition focus:border-[#563065]/40 dark:border-white/[0.1] dark:bg-white/[0.05]"
            />

          </div>

          {/* FILTRES */}

          <div className="flex flex-wrap gap-2">

            {(
              [
                "Tous",
                "Payés",
                "Partiels",
                "Sans paiement",
              ] as const
            ).map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-5 py-3 text-xs font-medium transition ${
                  filter === item
                    ? "bg-[#563065] text-white shadow-sm"
                    : "border border-black/[0.07] bg-white text-gray-500 hover:bg-[#563065]/5 dark:border-white/[0.1] dark:bg-white/[0.04]"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* ===================================================
            TABLEAU
        ==================================================== */}

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/70 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04]">

          {/* EN-TÊTE */}

          <div className="hidden grid-cols-[1.45fr_1.35fr_1.25fr_1fr_1fr_1.35fr_0.7fr] gap-4 border-b border-black/[0.06] px-6 py-5 text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:border-white/[0.08] xl:grid">

            <span>Cliente</span>
            <span>Prestation</span>
            <span>Rendez-vous</span>
            <span>Prix total</span>
            <span>Payé</span>
            <span>Situation paiement</span>
            <span>Action</span>

          </div>

          {/* LIGNES */}

          {filteredPayments.length > 0 ? (

            filteredPayments.map((payment) => {

              const totalPaye =
                payment.montantReservation +
                payment.montantSurPlace;

              return (

                <div
                  key={payment.id}
                  className="grid gap-5 border-b border-black/[0.05] px-6 py-7 transition hover:bg-[#563065]/[0.025] dark:border-white/[0.06] xl:grid-cols-[1.45fr_1.35fr_1.25fr_1fr_1fr_1.35fr_0.7fr] xl:items-center"
                >

                  {/* CLIENTE */}

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#563065]/10 text-sm font-medium text-[#563065]">
                        {payment.client
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>

                        <p className="font-medium">
                          {payment.client}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {payment.email}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* PRESTATION */}

                  <div>

                    <p className="font-medium">
                      {payment.prestation}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {payment.lieu}
                    </p>

                  </div>

                  {/* RENDEZ-VOUS */}

                  <div>

                    <p className="text-sm">
                      {payment.date}
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#563065]">
                      {payment.creneau}
                    </p>

                  </div>

                  {/* PRIX TOTAL */}

                  <div>

                    <p className="font-medium">
                      {formatFCFA(payment.prixTotal)}
                    </p>

                    {payment.supplementDomicile > 0 && (
                      <p className="mt-1 text-[10px] text-gray-400">
                        dont + 5 000 FCFA domicile
                      </p>
                    )}

                  </div>

                  {/* PAYÉ */}

                  <div>

                    <p className="font-medium">
                      {formatFCFA(totalPaye)}
                    </p>

                    {payment.resteAPayer > 0 && (
                      <p className="mt-1 text-xs text-orange-500">
                        Solde :{" "}
                        {formatFCFA(
                          payment.resteAPayer
                        )}
                      </p>
                    )}

                  </div>

                  {/* SITUATION */}

                  <div>

                    <span
                      className={`inline-flex rounded-full px-3 py-2 text-[10px] font-medium leading-4 ${paymentStatusClass(
                        payment.statutPaiement
                      )}`}
                    >
                      {payment.statutPaiement}
                    </span>

                    <p className="mt-2 text-[10px] text-gray-400">
                      {payment.momentPaiement}
                    </p>

                  </div>

                  {/* ACTION */}

                  <div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPayment(payment)
                      }
                      className="rounded-full border border-[#563065]/15 px-4 py-2 text-xs font-medium text-[#563065] transition hover:bg-[#563065] hover:text-white"
                    >
                      Voir
                    </button>

                  </div>

                </div>

              );
            })

          ) : (

            <div className="px-6 py-20 text-center">

              <div className="text-4xl">
                💳
              </div>

              <h3 className="mt-5 text-xl font-medium">
                Aucun paiement trouvé
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Modifiez votre recherche ou votre filtre.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          MODALE DÉTAIL
      ====================================================== */}

      {selectedPayment && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm"
          onClick={() => setSelectedPayment(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[2rem] bg-[var(--presty-bg)] p-7 shadow-2xl md:p-10"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#76547f]">
                  PRESTY · Rendez-vous
                </p>

                <h2 className="mt-3 text-3xl font-light tracking-[-0.04em]">
                  Détails du règlement
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  {selectedPayment.id}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPayment(null)
                }
                className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-black/10 text-xl text-gray-500 transition hover:bg-black/5"
              >
                ×
              </button>

            </div>

            {/* =================================================
                CLIENTE
            ================================================== */}

            <div className="mt-8 rounded-[1.5rem] bg-[#563065]/5 p-6">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Cliente
              </p>

              <h3 className="mt-3 text-xl font-medium">
                {selectedPayment.client}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {selectedPayment.email}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {selectedPayment.telephone}
              </p>

            </div>

            {/* =================================================
                RENDEZ-VOUS
            ================================================== */}

            <div className="mt-5 rounded-[1.5rem] border border-black/[0.06] p-6">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Rendez-vous
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>

                  <p className="text-xs text-gray-400">
                    Prestation
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.prestation}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Lieu
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.lieu}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.date}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Créneau
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#563065]">
                    {selectedPayment.creneau}
                  </p>

                </div>

                {selectedPayment.lieu ===
                  "Domicile" &&
                  selectedPayment.localisation && (

                    <div className="sm:col-span-2">

                      <p className="text-xs text-gray-400">
                        Localisation
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        📍{" "}
                        {selectedPayment.localisation}
                      </p>

                    </div>

                  )}

              </div>

            </div>

            {/* =================================================
                PRIX
            ================================================== */}

            <div className="mt-5 rounded-[1.5rem] border border-black/[0.06] p-6">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Prix de la prestation
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Prix de base
                  </span>

                  <strong>
                    {formatFCFA(
                      selectedPayment.prixPrestation
                    )}
                  </strong>

                </div>

                {selectedPayment.supplementDomicile >
                  0 && (

                  <div className="flex justify-between gap-5 text-sm">

                    <span className="text-gray-500">
                      Supplément domicile
                    </span>

                    <strong>
                      +{" "}
                      {formatFCFA(
                        selectedPayment.supplementDomicile
                      )}
                    </strong>

                  </div>

                )}

                <div className="flex justify-between gap-5 border-t border-black/[0.06] pt-4 text-sm">

                  <span className="font-medium">
                    Prix total
                  </span>

                  <strong className="text-lg text-[#563065]">
                    {formatFCFA(
                      selectedPayment.prixTotal
                    )}
                  </strong>

                </div>

              </div>

            </div>

            {/* =================================================
                PAIEMENT À LA RÉSERVATION
            ================================================== */}

            <div className="mt-5 rounded-[1.5rem] border border-black/[0.06] p-6">

              <div className="flex items-center justify-between gap-5">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Paiement à la réservation
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    Montant payé avant la prestation
                  </p>

                </div>

                <p className="text-lg font-medium">
                  {formatFCFA(
                    selectedPayment.montantReservation
                  )}
                </p>

              </div>

              {selectedPayment.montantReservation >
                0 ? (

                <div className="mt-5 rounded-xl bg-green-500/5 p-4">

                  <p className="text-xs text-gray-500">
                    Moyen de paiement
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.moyenReservation}
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    Référence
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.referenceReservation}
                  </p>

                </div>

              ) : (

                <div className="mt-5 rounded-xl bg-gray-500/5 p-4">

                  <p className="text-xs text-gray-500">
                    Aucun paiement effectué à la réservation.
                  </p>

                </div>

              )}

            </div>

            {/* =================================================
                PAIEMENT SUR PLACE
            ================================================== */}

            <div className="mt-5 rounded-[1.5rem] border border-black/[0.06] p-6">

              <div className="flex items-center justify-between gap-5">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Paiement sur place
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    Somme réglée le jour de la prestation
                  </p>

                </div>

                <p className="text-lg font-medium">
                  {formatFCFA(
                    selectedPayment.montantSurPlace
                  )}
                </p>

              </div>

              {selectedPayment.montantSurPlace >
                0 ? (

                <div className="mt-5 rounded-xl bg-blue-500/5 p-4">

                  <p className="text-xs text-gray-500">
                    Moyen de paiement
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.moyenSurPlace}
                  </p>

                  <p className="mt-3 text-xs text-gray-500">
                    Référence
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {selectedPayment.referenceSurPlace}
                  </p>

                </div>

              ) : (

                <div className="mt-5 rounded-xl bg-orange-500/5 p-4">

                  <p className="text-xs text-orange-600">
                    Aucun paiement sur place enregistré pour
                    le moment.
                  </p>

                </div>

              )}

            </div>

            {/* =================================================
                RÉCAPITULATIF
            ================================================== */}

            <div className="mt-5 rounded-[1.5rem] bg-black/[0.03] p-6 dark:bg-white/[0.04]">

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Récapitulatif
              </p>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Prix total
                  </span>

                  <strong>
                    {formatFCFA(
                      selectedPayment.prixTotal
                    )}
                  </strong>

                </div>

                <div className="flex justify-between gap-5 text-sm">

                  <span className="text-gray-500">
                    Total payé
                  </span>

                  <strong className="text-green-600">
                    {formatFCFA(
                      selectedPayment.montantReservation +
                        selectedPayment.montantSurPlace
                    )}
                  </strong>

                </div>

                <div className="flex justify-between gap-5 border-t border-black/[0.06] pt-4 text-sm">

                  <span className="text-gray-500">
                    Reste à payer
                  </span>

                  <strong
                    className={
                      selectedPayment.resteAPayer > 0
                        ? "text-orange-500"
                        : "text-green-600"
                    }
                  >
                    {formatFCFA(
                      selectedPayment.resteAPayer
                    )}
                  </strong>

                </div>

              </div>

            </div>

            {/* =================================================
                STATUTS
            ================================================== */}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="rounded-[1.3rem] border border-black/[0.06] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Statut réservation
                </p>

                <p className="mt-3 text-sm font-medium">
                  {selectedPayment.statutReservation}
                </p>

              </div>

              <div className="rounded-[1.3rem] border border-black/[0.06] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Statut paiement
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full px-3 py-2 text-xs font-medium ${paymentStatusClass(
                    selectedPayment.statutPaiement
                  )}`}
                >
                  {selectedPayment.statutPaiement}
                </span>

              </div>

            </div>

            {/* =================================================
                FERMER
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                setSelectedPayment(null)
              }
              className="mt-7 w-full rounded-full bg-[#563065] py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#42234e]"
            >
              Fermer
            </button>

          </div>

        </div>

      )}

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="px-6 pb-10 pt-4 text-center">

        <p className="font-serif text-2xl tracking-[0.15em] text-[#563065]">
          PRESTY
        </p>

        <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-gray-400">
          Votre beauté, votre moment.
        </p>

      </footer>

    </main>
  );
}