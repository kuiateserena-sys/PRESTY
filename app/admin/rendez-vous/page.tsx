"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

type AppointmentStatus = "Confirmé" | "En attente" | "Annulé";

type Appointment = {
  id: number;
  client: string;
  prestation: string;
  date: string;
  heure: string;
  lieu: "Salon" | "Domicile";
  paiement: "Aucun" | "50%" | "100%";
  montant: string;
  statut: AppointmentStatus;
};

const appointments: Appointment[] = [
  {
    id: 1,
    client: "Séréna Kuiaté",
    prestation: "Nattes américaines",
    date: "24 août 2026",
    heure: "10:30 AM",
    lieu: "Salon",
    paiement: "50%",
    montant: "2 500 FCFA",
    statut: "Confirmé",
  },
  {
    id: 2,
    client: "Clara Mbarga",
    prestation: "Rasta américain",
    date: "24 août 2026",
    heure: "01:30 PM",
    lieu: "Domicile",
    paiement: "100%",
    montant: "15 000 FCFA",
    statut: "Confirmé",
  },
  {
    id: 3,
    client: "Mélanie Ngo",
    prestation: "Lace frontale",
    date: "25 août 2026",
    heure: "09:00 AM",
    lieu: "Salon",
    paiement: "Aucun",
    montant: "10 000 FCFA",
    statut: "En attente",
  },
  {
    id: 4,
    client: "Estelle Foko",
    prestation: "Locks & boucles",
    date: "26 août 2026",
    heure: "03:00 PM",
    lieu: "Domicile",
    paiement: "50%",
    montant: "8 000 FCFA",
    statut: "Confirmé",
  },
  {
    id: 5,
    client: "Grâce Tchoumi",
    prestation: "French Curls",
    date: "27 août 2026",
    heure: "11:00 AM",
    lieu: "Salon",
    paiement: "Aucun",
    montant: "10 000 FCFA",
    statut: "En attente",
  },
];

export default function RendezVousPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.client
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.prestation
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "Tous" || appointment.statut === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const total = appointments.length;
  const confirmed = appointments.filter(
    (item) => item.statut === "Confirmé"
  ).length;
  const pending = appointments.filter(
    (item) => item.statut === "En attente"
  ).length;
  const cancelled = appointments.filter(
    (item) => item.statut === "Annulé"
  ).length;

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#211d20]">
      {/* HEADER */}

      <section className="border-b border-black/[0.06] bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
            Administration
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                Rendez-vous
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
                Consultez et gérez les rendez-vous de vos clientes
                depuis votre espace administrateur.
              </p>
            </div>

            <div className="rounded-full bg-[#563065] px-5 py-3 text-sm text-white">
              {total} rendez-vous
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          {/* STATISTIQUES */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total"
              value={total}
              icon="📅"
            />

            <StatCard
              label="Confirmés"
              value={confirmed}
              icon="✓"
            />

            <StatCard
              label="En attente"
              value={pending}
              icon="◷"
            />

            <StatCard
              label="Annulés"
              value={cancelled}
              icon="×"
            />
          </div>

          {/* OUTILS */}

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
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher une cliente ou une prestation..."
                  className="w-full rounded-full border border-black/10 bg-[#faf8f6] py-3 pl-11 pr-5 text-sm outline-none transition focus:border-[#563065]"
                />
              </div>

              {/* FILTRE */}

              <div className="flex flex-wrap gap-2">
                {["Tous", "Confirmé", "En attente", "Annulé"].map(
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

          {/* TABLEAU */}

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#faf8f6] text-left">
                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Cliente
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Prestation
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Date
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Créneau
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Lieu
                    </th>

                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                      Paiement
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
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-b border-black/[0.05] transition hover:bg-[#faf8f6]/70"
                      >
                        {/* CLIENTE */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eadff0] text-sm font-medium text-[#563065]">
                              {appointment.client
                                .split(" ")
                                .map((word) => word[0])
                                .slice(0, 2)
                                .join("")}
                            </div>

                            <div>
                              <p className="text-sm font-medium">
                                {appointment.client}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                Cliente #{appointment.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* PRESTATION */}

                        <td className="px-6 py-5">
                          <p className="text-sm font-medium">
                            {appointment.prestation}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {appointment.montant}
                          </p>
                        </td>

                        {/* DATE */}

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {appointment.date}
                        </td>

                        {/* HEURE */}

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-[#f3edf5] px-3 py-1.5 text-xs font-medium text-[#563065]">
                            {appointment.heure}
                          </span>
                        </td>

                        {/* LIEU */}

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm">
                            <span>
                              {appointment.lieu === "Salon"
                                ? "✦"
                                : "⌂"}
                            </span>

                            <span>{appointment.lieu}</span>
                          </div>
                        </td>

                        {/* PAIEMENT */}

                        <td className="px-6 py-5">
                          <PaymentBadge
                            payment={appointment.paiement}
                          />
                        </td>

                        {/* STATUT */}

                        <td className="px-6 py-5">
                          <StatusBadge
                            status={appointment.statut}
                          />
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5 text-right">
                    <Link
                    href={`/admin/rendez-vous/${appointment.id}`}
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
                        colSpan={8}
                        className="px-6 py-16 text-center"
                      >
                        <div className="text-3xl">⌕</div>

                        <p className="mt-3 text-sm font-medium">
                          Aucun rendez-vous trouvé
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Essayez une autre recherche ou un autre
                          filtre.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* NOTE */}

        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COMPOSANTS
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
    <div className="rounded-[1.5rem] border border-black/[0.06] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            {label}
          </p>

          <p className="mt-4 text-3xl font-light">{value}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3edf5] text-sm text-[#563065]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  const styles = {
    Confirmé: "bg-green-50 text-green-700",
    "En attente": "bg-orange-50 text-orange-700",
    Annulé: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({
  payment,
}: {
  payment: "Aucun" | "50%" | "100%";
}) {
  const styles = {
    Aucun: "bg-gray-100 text-gray-600",
    "50%": "bg-orange-50 text-orange-700",
    "100%": "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${styles[payment]}`}
    >
      {payment === "Aucun"
        ? "Non payé"
        : payment === "50%"
        ? "50 % payé"
        : "Total payé"}
    </span>
  );
}