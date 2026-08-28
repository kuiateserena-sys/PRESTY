"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function RendezVousDetailPage() {
  const params = useParams();

  const appointmentId = Number(params.id);

  const appointment = appointments.find(
    (item) => item.id === appointmentId
  );

  if (!appointment) {
    return (
      <main className="min-h-screen bg-[#faf8f6] px-6 py-10 text-[#211d20]">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/admin/rendez-vous"
            className="inline-flex rounded-full border border-[#563065]/15 px-5 py-2.5 text-sm text-[#563065] transition hover:bg-[#563065] hover:text-white"
          >
            ← Retour aux rendez-vous
          </Link>

          <div className="mt-10 rounded-[2rem] border border-black/[0.06] bg-white p-12 text-center shadow-sm">
            <div className="text-4xl">⌕</div>

            <h1 className="mt-5 text-2xl font-medium">
              Rendez-vous introuvable
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Ce rendez-vous n'existe pas ou n'est plus disponible.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const initials = appointment.client
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#211d20]">
      {/* HEADER */}

      <header className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-7 md:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
                PRESTY — Rendez-vous
              </p>

              <h1 className="mt-3 text-3xl font-light tracking-[-0.04em] md:text-4xl">
                Détails de la cliente
              </h1>
            </div>

            <Link
              href="/admin/rendez-vous"
              className="inline-flex w-fit rounded-full border border-[#563065]/15 px-5 py-2.5 text-sm font-medium text-[#563065] transition hover:bg-[#563065] hover:text-white"
            >
              ← Retour
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENU */}

      <section className="px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-[1200px]">
          {/* IDENTITÉ */}

          <div className="rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-[#eadff0] text-xl font-medium text-[#563065]">
                  {initials}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    Cliente
                  </p>

                  <h2 className="mt-2 text-3xl font-light">
                    {appointment.client}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Cliente #{appointment.id}
                  </p>
                </div>
              </div>

              <StatusBadge status={appointment.statut} />
            </div>
          </div>

          {/* RENDEZ-VOUS */}

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
              Rendez-vous
            </p>

            <h2 className="mt-3 text-3xl font-light">
              Informations de la prestation
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <InfoCard
              label="Prestation"
              value={appointment.prestation}
              icon="✦"
            />

            <InfoCard
              label="Date"
              value={appointment.date}
              icon="📅"
            />

            <InfoCard
              label="Heure"
              value={appointment.heure}
              icon="◷"
            />

            <InfoCard
              label="Lieu"
              value={appointment.lieu}
              icon={appointment.lieu === "Salon" ? "✦" : "⌂"}
            />
          </div>

          {/* PAIEMENT */}

          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
              Paiement
            </p>

            <h2 className="mt-3 text-3xl font-light">
              Situation du paiement
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-black/[0.06] bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Montant
              </p>

              <p className="mt-4 text-2xl font-light">
                {appointment.montant}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-black/[0.06] bg-white p-7 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Paiement
              </p>

              <div className="mt-4">
                <PaymentBadge payment={appointment.paiement} />
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin/rendez-vous"
              className="inline-flex items-center justify-center rounded-full border border-[#563065]/15 px-6 py-3 text-sm font-medium text-[#563065] transition hover:bg-[#563065] hover:text-white"
            >
              ← Tous les rendez-vous
            </Link>
          </div>

          {/* SIGNATURE PRESTY */}

          <footer className="mt-20 border-t border-black/[0.06] pt-10 text-center">
            <p className="text-[10px] font-medium tracking-[0.25em] text-[#563065]">
              PRESTY
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Votre beauté, votre moment.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COMPOSANTS
========================================================= */

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-black/[0.06] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#f3edf5] text-[#563065]">
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
            {label}
          </p>

          <p className="mt-3 text-lg font-medium">
            {value}
          </p>
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
      className={`w-fit rounded-full px-4 py-2 text-xs font-medium ${styles[status]}`}
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
      className={`inline-flex rounded-full px-4 py-2 text-xs font-medium ${styles[payment]}`}
    >
      {payment === "Aucun"
        ? "Non payé"
        : payment === "50%"
        ? "50 % payé"
        : "Total payé"}
    </span>
  );
}