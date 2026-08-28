import Link from "next/link";

const statistics = [
  {
    label: "Rendez-vous aujourd'hui",
    value: "5",
    detail: "+3 depuis hier",
  },
  {
    label: "Rendez-vous à venir",
    value: "28",
    detail: "Cette semaine",
  },
  {
    label: "Chiffre d'affaires",
    value: "350 000 FCFA",
    detail: "Ce mois",
  },
];

const popularServices = [
  {
    number: "01",
    name: "Rastas Americains",
    bookings: "46 rendez-vous",
    percentage: 82,
  },
  {
    number: "02",
    name: "Pose Lace Frontale",
    bookings: "38 rendez-vous",
    percentage: 73,
  },
  {
    number: "03",
    name: "Locks",
    bookings: "32 rendez-vous",
    percentage: 57,
  },
];

const appointments = [
  {
    client: "Marie Claire",
    service: "Tresses collées",
    time: "10h00",
    status: "Confirmé",
  },
  {
    client: "Sarah D.",
    service: "Soin profond",
    time: "12h00",
    status: "Confirmé",
  },
  {
    client: "Julie M.",
    service: "Perruque naturelle",
    time: "14h00",
    status: "En attente",
  },
  {
    client: "Fatou B.",
    service: "Nattes simples",
    time: "16h00",
    status: "Confirmé",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1500px]">

      {/* =====================================================
          BIENVENUE
      ====================================================== */}

      <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

        <div>

          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#76547f]">
            Tableau de bord
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] md:text-5xl">
            Bonjour, Administratrice 👋🏾
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-white/50">
            Voici un aperçu de l'activité de PRESTY aujourd'hui.
          </p>

        </div>

        <Link
          href="/admin/rendez-vous"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-[#563065] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#563065]/20 transition hover:-translate-y-1 hover:bg-[#42234e]"
        >
          <span>+</span>
          Nouveau rendez-vous
        </Link>

      </section>

      {/* =====================================================
          STATISTIQUES
      ====================================================== */}

      <section className="grid gap-5 md:grid-cols-3">

        {statistics.map((stat, index) => (

          <article
            key={stat.label}
            className="group relative overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
          >

            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#563065]/[0.05] blur-2xl transition-transform duration-700 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gray-400">
                  {stat.label}
                </p>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#563065]/[0.07] text-[#563065]">
                  {index === 0 && "◷"}
                  {index === 1 && "↗"}
                  {index === 2 && "₣"}
                </span>

              </div>

              <p className="mt-5 text-3xl font-medium tracking-[-0.04em]">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {stat.detail}
              </p>

            </div>

          </article>

        ))}

      </section>

      {/* =====================================================
          CONTENU
      ====================================================== */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

        {/* =================================================
            PRESTATIONS LES PLUS DEMANDÉES
        ================================================== */}

        <article className="rounded-[1.5rem] border border-black/[0.06] bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
                Activité
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Prestations les plus demandées
              </h2>

            </div>

            <Link
              href="/admin/statistiques"
              className="text-xs font-medium text-[#563065] transition hover:opacity-60"
            >
              Voir les statistiques →
            </Link>

          </div>

          <div className="mt-8 space-y-6">

            {popularServices.map((service) => (

              <div key={service.name}>

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#563065]/[0.07] text-xs font-medium text-[#563065]">
                      {service.number}
                    </span>

                    <div>

                      <p className="text-sm font-medium">
                        {service.name}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400">
                        {service.bookings}
                      </p>

                    </div>

                  </div>

                  <span className="text-xs font-medium text-gray-400">
                    {service.percentage}%
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/[0.05] dark:bg-white/[0.08]">

                  <div
                    className="h-full rounded-full bg-[#563065] transition-all duration-1000"
                    style={{
                      width: `${service.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </article>

        {/* =================================================
            APERÇU ACTIVITÉ
        ================================================== */}

        <article className="rounded-[1.5rem] border border-black/[0.06] bg-[#211d20] p-7 text-white shadow-sm">

          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#c9a9d1]">
            Aujourd'hui
          </p>

          <h2 className="mt-3 text-2xl font-light">
            Une journée bien remplie.
          </h2>

          <p className="mt-3 max-w-[400px] text-sm leading-7 text-white/50">
            Suivez facilement les rendez-vous et l'activité de votre espace PRESTY.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

              <p className="text-2xl font-medium">
                12
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                rendez-vous
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

              <p className="text-2xl font-medium">
                08
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                confirmés
              </p>

            </div>

          </div>

          <Link
            href="/admin/calendrier"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 text-xs font-medium transition hover:bg-white hover:text-[#211d20]"
          >
            Ouvrir le calendrier
            <span>→</span>
          </Link>

        </article>

      </section>

      {/* =====================================================
          RENDEZ-VOUS RÉCENTS
      ====================================================== */}

      <section className="mt-6 rounded-[1.5rem] border border-black/[0.06] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">

        <div className="flex flex-col justify-between gap-4 border-b border-black/[0.06] p-7 dark:border-white/10 md:flex-row md:items-center">

          <div>

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
              Rendez-vous
            </p>

            <h2 className="mt-2 text-xl font-medium">
              Derniers rendez-vous
            </h2>

          </div>

          <Link
            href="/admin/rendez-vous"
            className="text-xs font-medium text-[#563065] transition hover:opacity-60"
          >
            Voir tous les rendez-vous →
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="border-b border-black/[0.05] text-left dark:border-white/10">

                <th className="px-7 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Clientes
                </th>

                <th className="px-7 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Prestation
                </th>

                <th className="px-7 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Heure
                </th>

                <th className="px-7 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Statut
                </th>

                <th className="px-7 py-4 text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr
                  key={`${appointment.client}-${appointment.time}`}
                  className="border-b border-black/[0.04] transition hover:bg-[#563065]/[0.025] dark:border-white/[0.06] dark:hover:bg-white/[0.03]"
                >

                  <td className="px-7 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#563065]/[0.08] text-xs font-medium text-[#563065]">
                        {appointment.client.charAt(0)}
                      </div>

                      <span className="text-sm font-medium">
                        {appointment.client}
                      </span>

                    </div>

                  </td>

                  <td className="px-7 py-5 text-sm text-gray-500 dark:text-white/60">
                    {appointment.service}
                  </td>

                  <td className="px-7 py-5 text-sm">
                    {appointment.time}
                  </td>

                  <td className="px-7 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-[9px] font-medium ${
                        appointment.status === "Confirmé"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-orange-500/10 text-orange-600"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td className="px-7 py-5">

                    <Link
                      href="/admin/rendez-vous"
                      className="text-xs font-medium text-[#563065] hover:underline"
                    >
                      Voir
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* =====================================================
          SIGNATURE
      ====================================================== */}

      <div className="py-12 text-center">

        <p className="font-serif text-xl tracking-[0.18em] text-[#563065] dark:text-[#d8b9df]">
          PRESTY
        </p>

        <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-gray-400">
          Administration · Beauté · Élégance · Gestion
        </p>

      </div>

    </div>
  );
}