"use client";

import Link from "next/link";
import { useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type ReservationStatus =
  | "En attente"
  | "Confirmée"
  | "Annulée";

type PaymentStatus =
  | "Non payé"
  | "Partiel"
  | "Payé";

type HomeReservation = {
  id: number;
  client: string;
  phone: string;
  prestation: string;
  date: string;
  heure: string;
  location: string;
  prestationPrice: number;
  homeFee: number;
  payment: PaymentStatus;
  status: ReservationStatus;
};

/* =========================================================
   DONNÉES TEMPORAIRES
   Ces données seront remplacées par l'API plus tard.
========================================================= */

const initialReservations: HomeReservation[] = [
  {
    id: 1,
    client: "Sarah Mbarga",
    phone: "6 77 45 12 30",
    prestation: "Nattes américaines",
    date: "12 septembre 2026",
    heure: "10:30 AM",
    location: "Bonamoussadi, Douala",
    prestationPrice: 5000,
    homeFee: 5000,
    payment: "Partiel",
    status: "Confirmée",
  },
  {
    id: 2,
    client: "Estelle Ngono",
    phone: "6 98 23 45 11",
    prestation: "Lace frontale",
    date: "13 septembre 2026",
    heure: "02:00 PM",
    location: "Logpom, Douala",
    prestationPrice: 10000,
    homeFee: 5000,
    payment: "Non payé",
    status: "En attente",
  },
  {
    id: 3,
    client: "Merveille Tchoumi",
    phone: "6 71 55 83 42",
    prestation: "Rasta américain & boucles",
    date: "14 septembre 2026",
    heure: "11:30 AM",
    location: "Makepe, Douala",
    prestationPrice: 10000,
    homeFee: 5000,
    payment: "Payé",
    status: "Confirmée",
  },
  {
    id: 4,
    client: "Jessica Fomba",
    phone: "6 90 42 31 87",
    prestation: "Locks & boucles",
    date: "15 septembre 2026",
    heure: "04:00 PM",
    location: "Bépanda, Douala",
    prestationPrice: 10000,
    homeFee: 5000,
    payment: "Non payé",
    status: "En attente",
  },
];

/* =========================================================
   UTILITAIRES
========================================================= */

function formatPrice(price: number) {
  return `${price.toLocaleString("fr-FR")} FCFA`;
}

/* =========================================================
   PAGE
========================================================= */

export default function ServicesDomicileAdminPage() {
  const [reservations, setReservations] =
    useState<HomeReservation[]>(initialReservations);

  const [selectedReservation, setSelectedReservation] =
    useState<HomeReservation | null>(null);

  const [filter, setFilter] = useState<
    "Toutes" | "En attente" | "Confirmée" | "Annulée"
  >("Toutes");

  /* =======================================================
     CONFIRMER
  ======================================================= */

  const confirmReservation = (id: number) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: "Confirmée",
            }
          : reservation
      )
    );
  };

  /* =======================================================
     ANNULER
  ======================================================= */

  const cancelReservation = (id: number) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: "Annulée",
            }
          : reservation
      )
    );
  };

  /* =======================================================
     FILTRE
  ======================================================= */

  const filteredReservations =
    filter === "Toutes"
      ? reservations
      : reservations.filter(
          (reservation) => reservation.status === filter
        );

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const total = reservations.length;

  const pending = reservations.filter(
    (reservation) => reservation.status === "En attente"
  ).length;

  const confirmed = reservations.filter(
    (reservation) => reservation.status === "Confirmée"
  ).length;

  const cancelled = reservations.filter(
    (reservation) => reservation.status === "Annulée"
  ).length;

  return (
    <main className="min-h-screen bg-[#f8f6f8] text-[#211d20]">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">

          <div className="flex items-center gap-5">

            <Link
              href="/admin"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/[0.04]"
            >
              ←
            </Link>

            <div>

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#76547f]">
                PRESTY
              </p>

              <h1 className="mt-1 text-xl font-medium">
                Services à domicile
              </h1>

            </div>

          </div>

          <div className="hidden text-right md:block">

            <p className="text-xs text-gray-400">
              Administration
            </p>

            <p className="mt-1 text-sm font-medium">
              Gestion des rendez-vous
            </p>

          </div>

        </div>

      </header>

      {/* ===================================================
          CONTENU
      =================================================== */}

      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">

        {/* =================================================
            INTRODUCTION
        ================================================== */}

        <section className="mb-10">

          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#76547f]">
            Gestion des prestations à domicile
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <h2 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                Rendez-vous à domicile.
              </h2>

              <p className="mt-4 max-w-[650px] text-sm leading-7 text-gray-500">
                Retrouvez ici les clientes ayant choisi de recevoir
                leur prestation directement à leur domicile.
              </p>

            </div>

            <div className="rounded-2xl bg-[#563065] px-6 py-4 text-white shadow-lg">

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                Aujourd'hui
              </p>

              <p className="mt-1 text-lg font-medium">
                {total} rendez-vous
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            STATISTIQUES
        ================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Total"
            value={total}
            icon="🏠"
          />

          <StatCard
            label="En attente"
            value={pending}
            icon="⏳"
          />

          <StatCard
            label="Confirmées"
            value={confirmed}
            icon="✓"
          />

          <StatCard
            label="Annulées"
            value={cancelled}
            icon="×"
          />

        </section>

        {/* =================================================
            FILTRES
        ================================================== */}

        <section className="mt-10 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-sm">

          <div className="flex flex-wrap gap-2">

            {(
              [
                "Toutes",
                "En attente",
                "Confirmée",
                "Annulée",
              ] as const
            ).map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-5 py-2.5 text-xs transition ${
                  filter === item
                    ? "bg-[#563065] text-white shadow-md"
                    : "bg-[#f5f2f6] text-gray-500 hover:bg-[#eee9f0]"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </section>

        {/* =================================================
            LISTE
        ================================================== */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">

          {/* EN-TÊTE */}

          <div className="hidden grid-cols-[1.3fr_1.2fr_1fr_1.2fr_1fr_120px] gap-4 border-b border-black/[0.06] bg-[#faf9fa] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 xl:grid">

            <span>Cliente</span>

            <span>Prestation</span>

            <span>Date</span>

            <span>Localisation</span>

            <span>État</span>

            <span>Action</span>

          </div>

          {/* RENDEZ-VOUS */}

          <div className="divide-y divide-black/[0.06]">

            {filteredReservations.map((reservation) => (

              <article
                key={reservation.id}
                className="p-6 transition hover:bg-[#fcfbfc]"
              >

                <div className="grid gap-6 xl:grid-cols-[1.3fr_1.2fr_1fr_1.2fr_1fr_120px] xl:items-center">

                  {/* CLIENTE */}

                  <div>

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0e7f2] text-sm font-medium text-[#563065]">
                        {reservation.client
                          .split(" ")
                          .map((name) => name[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>

                        <p className="font-medium">
                          {reservation.client}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {reservation.phone}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* PRESTATION */}

                  <div>

                    <p className="font-medium">
                      {reservation.prestation}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      À domicile
                    </p>

                  </div>

                  {/* DATE */}

                  <div>

                    <p className="text-sm font-medium">
                      {reservation.date}
                    </p>

                    <p className="mt-1 text-xs text-[#76547f]">
                      {reservation.heure}
                    </p>

                  </div>

                  {/* LOCALISATION */}

                  <div>

                    <div className="flex items-start gap-2">

                      <span className="mt-0.5">
                        📍
                      </span>

                      <p className="text-sm leading-6 text-gray-600">
                        {reservation.location}
                      </p>

                    </div>

                  </div>

                  {/* ÉTAT */}

                  <div className="space-y-2">

                    <StatusBadge
                      status={reservation.status}
                    />

                    <PaymentBadge
                      status={reservation.payment}
                    />

                  </div>

                  {/* ACTION */}

                  <div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedReservation(reservation)
                      }
                      className="w-full rounded-full border border-[#563065]/15 px-4 py-2.5 text-xs font-medium text-[#563065] transition hover:bg-[#563065] hover:text-white"
                    >
                      Voir
                    </button>

                  </div>

                </div>

                {/* VERSION MOBILE */}

                <div className="mt-6 flex flex-wrap gap-2 xl:hidden">

                  {reservation.status === "En attente" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          confirmReservation(reservation.id)
                        }
                        className="rounded-full bg-[#563065] px-5 py-2 text-xs text-white"
                      >
                        Confirmer
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          cancelReservation(reservation.id)
                        }
                        className="rounded-full border border-red-200 px-5 py-2 text-xs text-red-500"
                      >
                        Annuler
                      </button>
                    </>
                  )}

                </div>

              </article>

            ))}

          </div>

          {/* AUCUNE RÉSERVATION */}

          {filteredReservations.length === 0 && (

            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4eef5] text-2xl">
                🏠
              </div>

              <h3 className="mt-5 text-lg font-medium">
                Aucun rendez-vous
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Aucun service à domicile ne correspond
                au filtre sélectionné.
              </p>

            </div>

          )}

        </section>

      </div>

      {/* ===================================================
          MODALE — DÉTAILS
      =================================================== */}

      {selectedReservation && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm"
          onClick={() => setSelectedReservation(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODALE HEADER */}

            <div className="border-b border-black/[0.06] px-7 py-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#76547f]">
                    PRESTY · Rendez-vous
                  </p>

                  <h3 className="mt-2 text-2xl font-light">
                    Détails du service à domicile
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() => setSelectedReservation(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                >
                  ×
                </button>

              </div>

            </div>

            {/* CLIENT */}

            <div className="px-7 py-7">

              <div className="rounded-2xl bg-[#faf8fb] p-5">

                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Cliente
                </p>

                <div className="mt-4 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#563065] text-sm font-medium text-white">
                    {selectedReservation.client
                      .split(" ")
                      .map((name) => name[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>

                    <p className="text-lg font-medium">
                      {selectedReservation.client}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {selectedReservation.phone}
                    </p>

                  </div>

                </div>

              </div>

              {/* INFORMATIONS */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <DetailCard
                  label="Prestation"
                  value={selectedReservation.prestation}
                  icon="💇🏾‍♀️"
                />

                <DetailCard
                  label="Date"
                  value={selectedReservation.date}
                  icon="📅"
                />

                <DetailCard
                  label="Créneau"
                  value={selectedReservation.heure}
                  icon="🕐"
                />

                <DetailCard
                  label="Lieu"
                  value="Domicile"
                  icon="🏠"
                />

              </div>

              {/* LOCALISATION */}

              <div className="mt-4 rounded-2xl border border-black/[0.06] p-5">

                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Localisation
                </p>

                <div className="mt-3 flex gap-3">

                  <span className="text-xl">
                    📍
                  </span>

                  <p className="text-sm leading-6 text-gray-600">
                    {selectedReservation.location}
                  </p>

                </div>

              </div>

              {/* TARIFICATION */}

              <div className="mt-6 rounded-2xl border border-[#563065]/10 bg-[#faf7fb] p-6">

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#76547f]">
                  Récapitulatif tarifaire
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex justify-between gap-4 text-sm">

                    <span className="text-gray-500">
                      Prix de la prestation
                    </span>

                    <span className="font-medium">
                      {formatPrice(
                        selectedReservation.prestationPrice
                      )}
                    </span>

                  </div>

                  <div className="flex justify-between gap-4 text-sm">

                    <span className="text-gray-500">
                      Déplacement à domicile
                    </span>

                    <span className="font-medium">
                      + {formatPrice(selectedReservation.homeFee)}
                    </span>

                  </div>

                  <div className="border-t border-black/10 pt-4">

                    <div className="flex justify-between gap-4">

                      <span className="font-medium">
                        Total
                      </span>

                      <span className="text-lg font-semibold text-[#563065]">
                        {formatPrice(
                          selectedReservation.prestationPrice +
                            selectedReservation.homeFee
                        )}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* PAIEMENT */}

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/[0.06] p-5">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                    Paiement
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {selectedReservation.payment}
                  </p>

                </div>

                <PaymentBadge
                  status={selectedReservation.payment}
                />

              </div>

              {/* STATUT */}

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/[0.06] p-5">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                    Statut du rendez-vous
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {selectedReservation.status}
                  </p>

                </div>

                <StatusBadge
                  status={selectedReservation.status}
                />

              </div>

            </div>

            {/* ACTIONS */}

            <div className="border-t border-black/[0.06] bg-[#faf9fa] px-7 py-5">

              {selectedReservation.status === "En attente" ? (

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() => {
                      cancelReservation(
                        selectedReservation.id
                      );

                      setSelectedReservation(null);
                    }}
                    className="rounded-full border border-red-200 px-6 py-3 text-sm text-red-500 transition hover:bg-red-50"
                  >
                    Refuser le rendez-vous
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      confirmReservation(
                        selectedReservation.id
                      );

                      setSelectedReservation(null);
                    }}
                    className="rounded-full bg-[#563065] px-7 py-3 text-sm text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#42234e]"
                  >
                    Confirmer le rendez-vous
                  </button>

                </div>

              ) : (

                <div className="flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedReservation(null)
                    }
                    className="rounded-full bg-[#563065] px-7 py-3 text-sm text-white"
                  >
                    Fermer
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="border-t border-black/[0.06] bg-white px-6 py-8">

        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 text-center text-xs text-gray-400 md:flex-row md:text-left">

          <p>
            PRESTY — Votre beauté, votre moment.
          </p>

          <p>
            Administration · Services à domicile
          </p>

        </div>

      </footer>

    </main>
  );
}

/* =========================================================
   COMPOSANT STATISTIQUE
========================================================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs text-gray-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-light">
            {value}
          </p>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3edf5] text-xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   BADGE STATUT
========================================================= */

function StatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  const styles = {
    "En attente":
      "bg-amber-50 text-amber-700 border-amber-100",
    Confirmée:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
    Annulée:
      "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   BADGE PAIEMENT
========================================================= */

function PaymentBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const styles = {
    "Non payé":
      "bg-gray-100 text-gray-500 border-gray-200",
    Partiel:
      "bg-orange-50 text-orange-700 border-orange-100",
    Payé:
      "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   CARTE DÉTAIL
========================================================= */

function DetailCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.06] p-5">

      <div className="flex items-start gap-3">

        <span className="text-xl">
          {icon}
        </span>

        <div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            {label}
          </p>

          <p className="mt-2 text-sm font-medium leading-6">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}