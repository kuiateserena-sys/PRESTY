"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type Periode = "7 jours" | "30 jours" | "6 mois" | "12 mois";

type EvolutionData = {
  mois: string;
  reservations: number;
  revenus: number;
};

/* ============================================================
   DONNÉES 7 JOURS
============================================================ */

const data7Jours: EvolutionData[] = [
  {
    mois: "Lun.",
    reservations: 5,
    revenus: 55000,
  },
  {
    mois: "Mar.",
    reservations: 4,
    revenus: 40000,
  },
  {
    mois: "Mer.",
    reservations: 6,
    revenus: 60000,
  },
  {
    mois: "Jeu.",
    reservations: 3,
    revenus: 45000,
  },
  {
    mois: "Ven.",
    reservations: 6,
    revenus: 55000,
  },
  {
    mois: "Sam.",
    reservations: 2,
    revenus: 30000,
  },
  {
    mois: "Dim.",
    reservations: 0,
    revenus: 0,
  },
];

/* ============================================================
   DONNÉES 30 JOURS
============================================================ */

const data30Jours: EvolutionData[] = [
  {
    mois: "J1",
    reservations: 4,
    revenus: 35000,
  },
  {
    mois: "J5",
    reservations: 3,
    revenus: 35000,
  },
  {
    mois: "J10",
    reservations: 5,
    revenus: 45000,
  },
  {
    mois: "J15",
    reservations: 2,
    revenus: 30000,
  },
  {
    mois: "J20",
    reservations: 11,
    revenus: 100000,
  },
  {
    mois: "J25",
    reservations: 8,
    revenus: 70000,
  },
  {
    mois: "J30",
    reservations: 13,
    revenus: 120000,
  },
];

/* ============================================================
   DONNÉES 6 MOIS
============================================================ */

const data6Mois: EvolutionData[] = [
  {
    mois: "Mars",
    reservations: 18,
    revenus: 180000,
  },
  {
    mois: "Avril",
    reservations: 24,
    revenus: 245000,
  },
  {
    mois: "Mai",
    reservations: 31,
    revenus: 310000,
  },
  {
    mois: "Juin",
    reservations: 28,
    revenus: 285000,
  },
  {
    mois: "Juillet",
    reservations: 20,
    revenus: 300000,
  },
  {
    mois: "Août",
    reservations: 25,
    revenus: 250000,
  },
];

/* ============================================================
   DONNÉES 12 MOIS
============================================================ */

const data12Mois: EvolutionData[] = [
  {
    mois: "Sept.",
    reservations: 20,
    revenus: 195000,
  },
  {
    mois: "Oct.",
    reservations: 23,
    revenus: 220000,
  },
  {
    mois: "Nov.",
    reservations: 26,
    revenus: 250000,
  },
  {
    mois: "Déc.",
    reservations: 34,
    revenus: 330000,
  },
  {
    mois: "Jan.",
    reservations: 29,
    revenus: 280000,
  },
  {
    mois: "Fév.",
    reservations: 35,
    revenus: 345000,
  },
  {
    mois: "Mars",
    reservations: 38,
    revenus: 370000,
  },
  {
    mois: "Avril",
    reservations: 39,
    revenus: 410000,
  },
  {
    mois: "Mai",
    reservations: 35,
    revenus: 290000,
  },
  {
    mois: "Juin",
    reservations: 41,
    revenus: 400000,
  },
  {
    mois: "Juillet",
    reservations: 48,
    revenus: 475000,
  },
  {
    mois: "Août",
    reservations: 49,
    revenus: 510000,
  },
];

/* ============================================================
   PRESTATIONS
============================================================ */

const prestationsData = [
  {
    nom: "Nattes",
    reservations: 42,
  },
  {
    nom: "Rasta américain",
    reservations: 35,
  },
  {
    nom: "Lace frontale",
    reservations: 29,
  },
  {
    nom: "Passe-mèche",
    reservations: 25,
  },
  {
    nom: "Locks",
    reservations: 21,
  },
  {
    nom: "Chignon",
    reservations: 16,
  },
];

/* ============================================================
   SALON / DOMICILE
============================================================ */

const lieuData = [
  {
    name: "Au salon",
    value: 68,
  },
  {
    name: "À domicile",
    value: 32,
  },
];

const lieuColors = [
  "#4b176d",
  "#d69e2e",
];

/* ============================================================
   PAIEMENTS
============================================================ */

const paiementData = [
  {
    name: "Payé intégralement",
    value: 40,
  },
  {
    name: "Paiement partiel",
    value: 30,
  },
  {
    name: "Non payé",
    value: 18,
  },
  {
    name: "Après prestation",
    value: 12,
  },
];

const paiementColors = [
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

/* ============================================================
   FORMATAGE ARGENT
============================================================ */

function formatMoney(value: number) {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

/* ============================================================
   TOOLTIP
============================================================ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-purple-100 bg-white px-4 py-3 shadow-xl">
      <p className="mb-2 text-xs font-semibold text-gray-400">
        {label}
      </p>

      {payload.map((item, index) => (
        <p
          key={index}
          className="text-sm font-bold text-[#4b176d]"
        >
          {item.dataKey === "revenus"
            ? formatMoney(Number(item.value))
            : `${item.value} réservations`}
        </p>
      ))}
    </div>
  );
}

/* ============================================================
   CARTE STATISTIQUE
============================================================ */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  trend,
}: {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
}) {
  return (
    <div className="group rounded-3xl border border-purple-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold text-[#24112f]">
            {value}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>

      </div>

      {trend && (
        <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          ↗ {trend}
        </div>
      )}

    </div>
  );
}

/* ============================================================
   PAGE STATISTIQUES
============================================================ */

export default function StatistiquesPage() {

  const [periode, setPeriode] =
    useState<Periode>("6 mois");

  /* ==========================================================
     CHANGEMENT RÉEL DES DONNÉES
  ========================================================== */

  const evolutionData = useMemo(() => {

    switch (periode) {

      case "7 jours":
        return data7Jours;

      case "30 jours":
        return data30Jours;

      case "6 mois":
        return data6Mois;

      case "12 mois":
        return data12Mois;

      default:
        return data6Mois;
    }

  }, [periode]);

  /* ==========================================================
     CALCULS AUTOMATIQUES
  ========================================================== */

  const totalReservations = evolutionData.reduce(
    (total, item) =>
      total + item.reservations,
    0
  );

  const totalRevenus = evolutionData.reduce(
    (total, item) =>
      total + item.revenus,
    0
  );

  return (
    <main className="min-h-screen bg-[#faf8fc] px-4 py-6 md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            EN-TÊTE
        ================================================== */}

        <section className="mb-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4b176d] text-xl shadow-md">
                  📊
                </div>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-[#4b176d]">
                  Analyse PRESTY
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#24112f] md:text-4xl">
                Statistiques
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Visualisez les performances de PRESTY,
                les réservations, les revenus, les prestations
                et les habitudes de vos clientes.
              </p>

            </div>

            {/* =============================================
                FILTRE PÉRIODE
            ============================================== */}

            <div className="rounded-2xl border border-purple-100 bg-white p-2 shadow-sm">

              <select
                value={periode}
                onChange={(event) =>
                  setPeriode(
                    event.target.value as Periode
                  )
                }
                className="rounded-xl border-0 bg-white px-4 py-2.5 text-sm font-semibold text-[#4b176d] outline-none"
              >

                <option value="7 jours">
                  7 jours
                </option>

                <option value="30 jours">
                  30 jours
                </option>

                <option value="6 mois">
                  6 mois
                </option>

                <option value="12 mois">
                  12 mois
                </option>

              </select>

            </div>

          </div>

        </section>

        {/* ==================================================
            CARTES KPI
        ================================================== */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            icon="📅"
            title="Réservations"
            value={totalReservations.toString()}
            subtitle={`sur ${periode}`}
            trend="+18,4 %"
          />

          <StatCard
            icon="💰"
            title="Revenus"
            value={
              totalRevenus >= 1000000
                ? `${(
                    totalRevenus / 1000000
                  ).toFixed(2)} M`
                : `${Math.round(
                    totalRevenus / 1000
                  )} k`
            }
            subtitle={`sur ${periode}`}
            trend="+21,7 %"
          />

          <StatCard
            icon="👩🏾"
            title="Clientes"
            value="126"
            subtitle="clientes enregistrées"
            trend="+12,2 %"
          />

          <StatCard
            icon="🏠"
            title="À domicile"
            value="32 %"
            subtitle="des réservations"
          />

          <StatCard
            icon="✨"
            title="Prestation populaire"
            value="Nattes"
            subtitle="42 réservations"
          />

        </section>

        {/* ==================================================
            GRAPHIQUES PRINCIPAUX
        ================================================== */}

        <section className="mb-6 grid gap-6 xl:grid-cols-2">

          {/* ===============================================
              RÉSERVATIONS
          ================================================ */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-6">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <h2 className="text-lg font-bold text-[#24112f]">
                  Évolution des réservations
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Données sur {periode}
                </p>

              </div>

              <div className="rounded-xl bg-purple-50 px-3 py-2 text-xs font-bold text-[#4b176d]">
                {totalReservations} rendez-vous
              </div>

            </div>

            <div className="h-[320px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={evolutionData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="mois"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                  />

                  <Line
                    type="monotone"
                    dataKey="reservations"
                    name="Réservations"
                    stroke="#4b176d"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      strokeWidth: 3,
                      fill: "#ffffff",
                    }}
                    activeDot={{
                      r: 8,
                    }}
                    animationDuration={1200}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ===============================================
              REVENUS
          ================================================ */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-6">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <h2 className="text-lg font-bold text-[#24112f]">
                  Évolution des revenus
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Revenus générés sur {periode}
                </p>

              </div>

              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
                {formatMoney(totalRevenus)}
              </div>

            </div>

            <div className="h-[320px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={evolutionData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="mois"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                    }}
                    tickFormatter={(value) =>
                      `${value / 1000}k`
                    }
                  />

                  <Tooltip
                    formatter={(value) =>
                      formatMoney(Number(value))
                    }
                  />

                  <Bar
                    dataKey="revenus"
                    name="Revenus"
                    fill="#4b176d"
                    radius={[
                      8,
                      8,
                      0,
                      0,
                    ]}
                    animationDuration={1200}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </section>

        {/* ==================================================
            PRESTATIONS
        ================================================== */}

        <section className="mb-6 rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-6">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-[#24112f]">
              Prestations les plus demandées
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Les coiffures qui génèrent le plus de
              réservations.
            </p>

          </div>

          <div className="h-[360px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={prestationsData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="nom"
                  width={130}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="reservations"
                  name="Réservations"
                  fill="#4b176d"
                  radius={[
                    0,
                    8,
                    8,
                    0,
                  ]}
                  animationDuration={1200}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>

        {/* ==================================================
            SALON / DOMICILE + PAIEMENTS
        ================================================== */}

        <section className="mb-6 grid gap-6 lg:grid-cols-2">

          {/* ===============================================
              SALON / DOMICILE
          ================================================ */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-[#24112f]">
                Salon ou domicile ?
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Répartition des lieux de rendez-vous.
              </p>

            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row">

              <div className="h-[250px] w-full md:w-1/2">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={lieuData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      animationDuration={1200}
                    >

                      {lieuData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              lieuColors[index]
                            }
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `${value}%`
                      }
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="w-full space-y-4 md:w-1/2">

                <div className="rounded-2xl bg-purple-50 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-[#24112f]">
                      📍 Au salon
                    </span>

                    <span className="font-bold text-[#4b176d]">
                      68 %
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    127 rendez-vous
                  </p>

                </div>

                <div className="rounded-2xl bg-amber-50 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-[#24112f]">
                      🏠 À domicile
                    </span>

                    <span className="font-bold text-amber-600">
                      32 %
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    60 rendez-vous
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ===============================================
              PAIEMENTS
          ================================================ */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm md:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-bold text-[#24112f]">
                État des paiements
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Répartition des différents règlements.
              </p>

            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row">

              <div className="h-[250px] w-full md:w-1/2">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={paiementData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                      animationDuration={1200}
                    >

                      {paiementData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              paiementColors[
                                index
                              ]
                            }
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `${value}%`
                      }
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="w-full space-y-3 md:w-1/2">

                {paiementData.map(
                  (item, index) => (

                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                    >

                      <div className="flex items-center gap-2">

                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              paiementColors[
                                index
                              ],
                          }}
                        />

                        <span className="text-xs font-medium text-gray-600">
                          {item.name}
                        </span>

                      </div>

                      <span className="text-sm font-bold text-[#24112f]">
                        {item.value} %
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </section>

        {/* ==================================================
            BLOC FINAL
        ================================================== */}

        <section className="rounded-3xl bg-gradient-to-r from-[#321044] to-[#5b2180] p-6 text-white shadow-lg md:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                PRESTY Analytics
              </span>

              <h2 className="mt-3 text-2xl font-bold">
                Une vision claire de votre activité
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100">
                Ces statistiques permettront à
                l'administratrice de suivre l'évolution
                de PRESTY et de prendre de meilleures
                décisions concernant les prestations,
                les rendez-vous et les paiements.
              </p>

            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-4xl">
              📈
            </div>

          </div>

        </section>

      </div>

    </main>
  );
}