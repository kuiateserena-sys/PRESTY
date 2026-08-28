"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Client = {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  rendezVous: number;
  totalPaye: string;
  dernierRendezVous: string;
  statut: "Active" | "Inactive";
};

const clients: Client[] = [
  {
    id: 1,
    prenom: "Séréna",
    nom: "Kuiaté",
    email: "serena@example.com",
    telephone: "+237 6 52 79 02 84",
    rendezVous: 4,
    totalPaye: "25 000 FCFA",
    dernierRendezVous: "24 août 2026",
    statut: "Active",
  },
  {
    id: 2,
    prenom: "Clara",
    nom: "Mbarga",
    email: "clara@example.com",
    telephone: "+237 6 70 45 12 30",
    rendezVous: 3,
    totalPaye: "35 000 FCFA",
    dernierRendezVous: "24 août 2026",
    statut: "Active",
  },
  {
    id: 3,
    prenom: "Mélanie",
    nom: "Ngo",
    email: "melanie@example.com",
    telephone: "+237 6 91 23 45 67",
    rendezVous: 2,
    totalPaye: "10 000 FCFA",
    dernierRendezVous: "25 août 2026",
    statut: "Active",
  },
  {
    id: 4,
    prenom: "Estelle",
    nom: "Foko",
    email: "estelle@example.com",
    telephone: "+237 6 78 56 34 21",
    rendezVous: 5,
    totalPaye: "42 000 FCFA",
    dernierRendezVous: "26 août 2026",
    statut: "Active",
  },
  {
    id: 5,
    prenom: "Grâce",
    nom: "Tchoumi",
    email: "grace@example.com",
    telephone: "+237 6 88 34 76 10",
    rendezVous: 1,
    totalPaye: "10 000 FCFA",
    dernierRendezVous: "27 août 2026",
    statut: "Inactive",
  },
];

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Toutes");

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const fullName =
        `${client.prenom} ${client.nom}`.toLowerCase();

      const searchValue = search.toLowerCase();

      const matchesSearch =
        fullName.includes(searchValue) ||
        client.email.toLowerCase().includes(searchValue) ||
        client.telephone.includes(search);

      const matchesFilter =
        filter === "Toutes" || client.statut === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const activeClients = clients.filter(
    (client) => client.statut === "Active"
  ).length;

  const totalAppointments = clients.reduce(
    (total, client) => total + client.rendezVous,
    0
  );

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#211d20]">

      {/* =====================================================
          EN-TÊTE
      ====================================================== */}

      <section className="border-b border-black/[0.06] bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1500px]">

          <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
            Administration
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h1 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                Clientes
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                Retrouvez les clientes de PRESTY et consultez
                leur activité et leur historique.
              </p>
            </div>

            <div className="rounded-full bg-[#563065] px-5 py-3 text-sm text-white">
              {clients.length} clientes
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENU
      ====================================================== */}

      <section className="px-6 py-8 md:px-10">

        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              STATISTIQUES
          ================================================== */}

          <div className="grid gap-4 md:grid-cols-3">

            <StatCard
              title="Total clientes"
              value={clients.length}
              icon="◉"
            />

            <StatCard
              title="Clientes actives"
              value={activeClients}
              icon="✓"
            />

            <StatCard
              title="Rendez-vous"
              value={totalAppointments}
              icon="⌁"
            />

          </div>

          {/* =================================================
              RECHERCHE + FILTRES
          ================================================== */}

          <div className="mt-8 rounded-[1.5rem] border border-black/[0.06] bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* RECHERCHE */}

              <div className="relative w-full lg:max-w-md">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Rechercher une cliente..."
                  className="w-full rounded-full border border-black/10 bg-[#faf8f6] py-3 pl-11 pr-5 text-sm outline-none transition focus:border-[#563065]"
                />

              </div>

              {/* FILTRES */}

              <div className="flex flex-wrap gap-2">

                {["Toutes", "Active", "Inactive"].map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFilter(status)}
                      className={`rounded-full px-5 py-2.5 text-xs transition ${
                        filter === status
                          ? "bg-[#563065] text-white"
                          : "border border-black/10 bg-white text-gray-600 hover:bg-[#faf8f6]"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              LISTE DES CLIENTES
          ================================================== */}

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white shadow-sm">

            {/* =================================================
                VERSION ORDINATEUR
            ================================================== */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[950px] border-collapse">

                <thead>

                  <tr className="border-b border-black/[0.06] bg-[#faf8f6] text-left">

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Cliente
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Contact
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Rendez-vous
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Total payé
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Dernier rendez-vous
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Statut
                    </th>

                    <th className="px-6 py-5 text-right text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (

                      <tr
                        key={client.id}
                        className="border-b border-black/[0.05] transition hover:bg-[#faf8f6]/70"
                      >

                        {/* CLIENTE */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <Avatar
                              prenom={client.prenom}
                              nom={client.nom}
                            />

                            <div>

                              <p className="text-sm font-medium">
                                {client.prenom} {client.nom}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                Cliente #{client.id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CONTACT */}

                        <td className="px-6 py-5">

                          <p className="text-sm text-gray-600">
                            {client.email}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {client.telephone}
                          </p>

                        </td>

                        {/* RENDEZ-VOUS */}

                        <td className="px-6 py-5">

                          <span className="rounded-full bg-[#f3edf5] px-3 py-1.5 text-xs font-medium text-[#563065]">
                            {client.rendezVous}
                          </span>

                        </td>

                        {/* TOTAL */}

                        <td className="px-6 py-5 text-sm font-medium">
                          {client.totalPaye}
                        </td>

                        {/* DERNIER RDV */}

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {client.dernierRendezVous}
                        </td>

                        {/* STATUT */}

                        <td className="px-6 py-5">

                          <ClientStatus
                            status={client.statut}
                          />

                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5 text-right">

                          <Link
                            href={`/admin/clientes/${client.id}`}
                            className="inline-flex rounded-full border border-[#563065]/15 px-4 py-2 text-xs font-medium text-[#563065] transition hover:bg-[#563065] hover:text-white"
                          >
                            Voir
                          </Link>

                        </td>

                      </tr>

                    ))
                  ) : (

                    <tr>

                      <td
                        colSpan={7}
                        className="px-6 py-16 text-center"
                      >

                        <div className="text-3xl">
                          ⌕
                        </div>

                        <p className="mt-3 text-sm font-medium">
                          Aucune cliente trouvée
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Essayez une autre recherche ou un autre filtre.
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* =================================================
                VERSION MOBILE
            ================================================== */}

            <div className="divide-y divide-black/[0.05] md:hidden">

              {filteredClients.length > 0 ? (

                filteredClients.map((client) => (

                  <div
                    key={client.id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <Avatar
                          prenom={client.prenom}
                          nom={client.nom}
                        />

                        <div>

                          <p className="text-sm font-medium">
                            {client.prenom} {client.nom}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {client.email}
                          </p>

                        </div>

                      </div>

                      <ClientStatus
                        status={client.statut}
                      />

                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <InfoBox
                        label="Rendez-vous"
                        value={`${client.rendezVous}`}
                      />

                      <InfoBox
                        label="Total payé"
                        value={client.totalPaye}
                      />

                      <InfoBox
                        label="Téléphone"
                        value={client.telephone}
                      />

                      <InfoBox
                        label="Dernier RDV"
                        value={client.dernierRendezVous}
                      />

                    </div>

                    <Link
                      href={`/admin/clientes/${client.id}`}
                      className="mt-5 block rounded-full bg-[#563065] py-3 text-center text-xs font-medium text-white transition hover:bg-[#42234e]"
                    >
                      Voir la cliente
                    </Link>

                  </div>

                ))

              ) : (

                <div className="p-10 text-center">

                  <div className="text-3xl">
                    ⌕
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Aucune cliente trouvée
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Essayez une autre recherche ou un autre filtre.
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* =================================================
              SIGNATURE PRESTY
          ================================================== */}

          <div className="mt-12 border-t border-black/[0.06] py-8 text-center">

            <p className="font-serif text-2xl tracking-[0.15em] text-[#563065]">
              PRESTY
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gray-400">
              Rendez-vous & beauté
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Votre beauté, votre moment.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   COMPOSANTS
========================================================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-black/[0.06] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {title}
          </p>

          <p className="mt-4 text-3xl font-light">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3edf5] text-sm text-[#563065]">
          {icon}
        </div>

      </div>

    </div>
  );
}

function Avatar({
  prenom,
  nom,
}: {
  prenom: string;
  nom: string;
}) {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#eadff0] text-xs font-semibold text-[#563065]">
      {prenom.charAt(0)}
      {nom.charAt(0)}
    </div>
  );
}

function ClientStatus({
  status,
}: {
  status: Client["statut"];
}) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
        status === "Active"
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#faf8f6] p-3">

      <p className="text-[9px] uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-gray-700">
        {value}
      </p>

    </div>
  );
}