"use client";

import { useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type AppointmentStatus = "Confirmé" | "En attente" | "Annulé";

type PaymentStatus = "Aucun" | "50%" | "100%";

type LocationType = "Salon" | "Domicile";

type Appointment = {
  id: number;
  client: string;
  prestation: string;
  date: string;
  heure: string;
  lieu: LocationType;
  paiement: PaymentStatus;
  montant: string;
  statut: AppointmentStatus;
};

/* =========================================================
   DONNÉES DE DÉMONSTRATION
========================================================= */

const appointments: Appointment[] = [
  {
    id: 1,
    client: "Séréna Kuiaté",
    prestation: "Nattes américaines",
    date: "2026-08-24",
    heure: "10:30",
    lieu: "Salon",
    paiement: "50%",
    montant: "5 000 FCFA",
    statut: "Confirmé",
  },

  {
    id: 2,
    client: "Clara Mbarga",
    prestation: "Rasta américain",
    date: "2026-08-24",
    heure: "13:30",
    lieu: "Domicile",
    paiement: "100%",
    montant: "15 000 FCFA",
    statut: "Confirmé",
  },

  {
    id: 3,
    client: "Mélanie Ngo",
    prestation: "Pose lace",
    date: "2026-08-25",
    heure: "09:00",
    lieu: "Salon",
    paiement: "Aucun",
    montant: "10 000 FCFA",
    statut: "En attente",
  },

  {
    id: 4,
    client: "Estelle Foko",
    prestation: "Locks & boucles",
    date: "2026-08-26",
    heure: "15:00",
    lieu: "Domicile",
    paiement: "50%",
    montant: "8 000 FCFA",
    statut: "Confirmé",
  },

  {
    id: 5,
    client: "Grâce Tchoumi",
    prestation: "French Curls",
    date: "2026-08-27",
    heure: "11:00",
    lieu: "Salon",
    paiement: "Aucun",
    montant: "10 000 FCFA",
    statut: "En attente",
  },

  {
    id: 6,
    client: "Nathalie Essomba",
    prestation: "Chignon élégant",
    date: "2026-08-28",
    heure: "14:00",
    lieu: "Salon",
    paiement: "100%",
    montant: "12 000 FCFA",
    statut: "Confirmé",
  },

  {
    id: 7,
    client: "Laura Kamga",
    prestation: "Passe-mèche américaine",
    date: "2026-08-29",
    heure: "09:30",
    lieu: "Domicile",
    paiement: "50%",
    montant: "9 000 FCFA",
    statut: "Confirmé",
  },

  {
    id: 8,
    client: "Carine Mballa",
    prestation: "Nattes américaines",
    date: "2026-08-29",
    heure: "14:30",
    lieu: "Salon",
    paiement: "Aucun",
    montant: "10 000 FCFA",
    statut: "En attente",
  },

  {
    id: 9,
    client: "Sandra Ngoa",
    prestation: "Locks",
    date: "2026-08-31",
    heure: "10:00",
    lieu: "Salon",
    paiement: "100%",
    montant: "18 000 FCFA",
    statut: "Confirmé",
  },
];

/* =========================================================
   CONSTANTES CALENDRIER
========================================================= */

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const weekDays = [
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
  "Dim",
];

/* =========================================================
   PAGE
========================================================= */

export default function CalendrierPage() {
  const today = new Date(2026, 7, 24);

  const [currentMonth, setCurrentMonth] = useState(
    today.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    today.getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState(
    "2026-08-24"
  );

  /* =======================================================
     CALCUL DES JOURS
  ======================================================= */

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    );

    const lastDay = new Date(
      currentYear,
      currentMonth + 1,
      0
    );

    let startingDay = firstDay.getDay();

    /*
     * JavaScript :
     * dimanche = 0
     *
     * Notre calendrier :
     * lundi = 0
     */

    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    const daysInMonth = lastDay.getDate();

    const previousMonthLastDay = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    const days = [];

    /* Jours du mois précédent */

    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthLastDay - i,
        currentMonth: false,
        date: "",
      });
    }

    /* Jours du mois actuel */

    for (let day = 1; day <= daysInMonth; day++) {
      const month = String(currentMonth + 1).padStart(2, "0");

      const dayString = String(day).padStart(2, "0");

      days.push({
        day,
        currentMonth: true,
        date: `${currentYear}-${month}-${dayString}`,
      });
    }

    /* Jours du mois suivant */

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        day: nextDay,
        currentMonth: false,
        date: "",
      });

      nextDay++;
    }

    return days;
  }, [currentMonth, currentYear]);

  /* =======================================================
     RENDEZ-VOUS DE LA DATE SÉLECTIONNÉE
  ======================================================= */

  const selectedAppointments = appointments.filter(
    (appointment) =>
      appointment.date === selectedDate
  );

  /* =======================================================
     STATISTIQUES DU MOIS
  ======================================================= */

  const monthAppointments = appointments.filter(
    (appointment) => {
      const date = new Date(
        `${appointment.date}T00:00:00`
      );

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }
  );

  const confirmedCount = monthAppointments.filter(
    (item) => item.statut === "Confirmé"
  ).length;

  const pendingCount = monthAppointments.filter(
    (item) => item.statut === "En attente"
  ).length;

  const cancelledCount = monthAppointments.filter(
    (item) => item.statut === "Annulé"
  ).length;

  /* =======================================================
     CHANGER DE MOIS
  ======================================================= */

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }

    setSelectedDate("");
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }

    setSelectedDate("");
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate("2026-08-24");
  };

  /* =======================================================
     RENDEZ-VOUS D'UN JOUR
  ======================================================= */

  const getAppointmentsForDate = (
    date: string
  ) => {
    return appointments.filter(
      (appointment) =>
        appointment.date === date
    );
  };

  /* =======================================================
     FORMATAGE DE LA DATE
  ======================================================= */

  const formatSelectedDate = () => {
    if (!selectedDate) {
      return "Sélectionnez une date";
    }

    const date = new Date(
      `${selectedDate}T00:00:00`
    );

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* =======================================================
     RENDU
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#211d20]">

      {/* ===================================================
          EN-TÊTE
      =================================================== */}

      <section className="border-b border-[#563065]/10 bg-white px-6 py-8 md:px-10">

        <div className="mx-auto max-w-[1500px]">

          <p className="text-[11px] uppercase tracking-[0.3em] text-[#76547f]">
            Administration
          </p>

          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <h1 className="text-4xl font-light tracking-[-0.04em] text-[#211d20] md:text-5xl">
                Calendrier
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#716b72]">
                Visualisez les rendez-vous de la journée,
                consultez les disponibilités et gérez
                facilement le planning de PRESTY.
              </p>

            </div>

            <button
              type="button"
              onClick={goToToday}
              className="w-fit rounded-full border border-[#563065]/15 bg-white px-5 py-3 text-sm font-medium text-[#563065] transition hover:bg-[#f7f1f9]"
            >
              Aujourd'hui
            </button>

          </div>

        </div>

      </section>

      {/* ===================================================
          CONTENU PRINCIPAL
      =================================================== */}

      <section className="px-5 py-8 md:px-8 lg:px-10">

        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              STATISTIQUES
          ================================================= */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <CalendarStat
              label="Rendez-vous du mois"
              value={monthAppointments.length}
              description="Toutes les réservations"
              icon="📅"
            />

            <CalendarStat
              label="Confirmés"
              value={confirmedCount}
              description="Rendez-vous validés"
              icon="✓"
              type="confirmed"
            />

            <CalendarStat
              label="En attente"
              value={pendingCount}
              description="À traiter"
              icon="◷"
              type="pending"
            />

            <CalendarStat
              label="Annulés"
              value={cancelledCount}
              description="Ce mois-ci"
              icon="×"
              type="cancelled"
            />

          </div>

          {/* =================================================
              CALENDRIER + DÉTAILS
          ================================================= */}

          <div className="grid gap-6 xl:grid-cols-[1fr_390px]">

            {/* =================================================
                CALENDRIER
            ================================================= */}

            <div className="overflow-hidden rounded-[1.75rem] border border-[#563065]/10 bg-white shadow-[0_10px_40px_rgba(86,48,101,0.06)]">

              {/* EN-TÊTE CALENDRIER */}

              <div className="border-b border-[#563065]/10 px-5 py-5 md:px-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#96769f]">
                      Planning
                    </p>

                    <h2 className="mt-1 text-2xl font-medium text-[#211d20]">
                      {months[currentMonth]}{" "}
                      {currentYear}
                    </h2>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={previousMonth}
                      aria-label="Mois précédent"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#563065]/10 bg-white text-[#563065] transition hover:bg-[#f7f1f9]"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={goToToday}
                      className="rounded-full border border-[#563065]/10 px-4 py-2 text-xs font-medium text-[#563065] transition hover:bg-[#f7f1f9]"
                    >
                      Aujourd'hui
                    </button>

                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Mois suivant"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#563065]/10 bg-white text-[#563065] transition hover:bg-[#f7f1f9]"
                    >
                      →
                    </button>

                  </div>

                </div>

              </div>

              {/* LÉGENDE */}

              <div className="flex flex-wrap gap-4 border-b border-[#563065]/10 px-5 py-4 md:px-7">

                <Legend
                  color="bg-[#563065]"
                  label="Confirmé"
                />

                <Legend
                  color="bg-[#d68a32]"
                  label="En attente"
                />

                <Legend
                  color="bg-[#c75c67]"
                  label="Annulé"
                />

                <Legend
                  color="bg-[#cfc8d2]"
                  label="Disponible"
                />

              </div>

              {/* JOURS DE LA SEMAINE */}

              <div className="grid grid-cols-7 border-b border-[#563065]/10 bg-[#fbf9fc]">

                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="border-r border-[#563065]/10 px-2 py-3 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-[#8a818d] last:border-r-0 md:text-xs"
                  >
                    {day}
                  </div>
                ))}

              </div>

              {/* GRILLE */}

              <div className="grid grid-cols-7">

                {calendarDays.map(
                  (calendarDay, index) => {

                    const dayAppointments =
                      calendarDay.currentMonth
                        ? getAppointmentsForDate(
                            calendarDay.date
                          )
                        : [];

                    const isSelected =
                      calendarDay.date ===
                      selectedDate;

                    const isToday =
                      calendarDay.date ===
                      "2026-08-24";

                    return (
                      <button
                        type="button"
                        key={`${calendarDay.date}-${index}`}
                        disabled={
                          !calendarDay.currentMonth
                        }
                        onClick={() =>
                          calendarDay.currentMonth &&
                          setSelectedDate(
                            calendarDay.date
                          )
                        }
                        className={`relative min-h-[125px] border-r border-b border-[#563065]/10 p-2 text-left transition md:min-h-[145px] md:p-3 ${
                          calendarDay.currentMonth
                            ? "bg-white hover:bg-[#fcf9fd]"
                            : "cursor-default bg-[#fbfafb] text-[#c4bec6]"
                        } ${
                          isSelected
                            ? "bg-[#f7f0f9] ring-2 ring-inset ring-[#563065]/25"
                            : ""
                        }`}
                      >

                        {/* NUMÉRO DU JOUR */}

                        <div className="flex items-center justify-between">

                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                              isToday
                                ? "bg-[#563065] font-semibold text-white"
                                : isSelected
                                ? "bg-[#eadcf0] font-semibold text-[#563065]"
                                : "text-[#4f494f]"
                            }`}
                          >
                            {calendarDay.day}
                          </span>

                          {dayAppointments.length >
                            0 && (
                            <span className="text-[10px] text-[#8f8592]">
                              {dayAppointments.length} RDV
                            </span>
                          )}

                        </div>

                        {/* RENDEZ-VOUS */}

                        <div className="mt-3 space-y-1.5">

                          {dayAppointments
                            .slice(0, 3)
                            .map((appointment) => (
                              <MiniAppointment
                                key={
                                  appointment.id
                                }
                                appointment={
                                  appointment
                                }
                              />
                            ))}

                          {dayAppointments.length >
                            3 && (
                            <p className="px-1 text-[10px] font-medium text-[#563065]">
                              +
                              {dayAppointments.length -
                                3}{" "}
                              autre(s)
                            </p>
                          )}

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* =================================================
                PANNEAU DÉTAILS
            ================================================= */}

            <aside className="h-fit overflow-hidden rounded-[1.75rem] border border-[#563065]/10 bg-white shadow-[0_10px_40px_rgba(86,48,101,0.06)] xl:sticky xl:top-6">

              {/* EN-TÊTE */}

              <div className="border-b border-[#563065]/10 bg-[#fbf9fc] px-6 py-6">

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#96769f]">
                  Détails du planning
                </p>

                <h2 className="mt-2 text-xl font-medium capitalize text-[#211d20]">
                  {formatSelectedDate()}
                </h2>

              </div>

              {/* DISPONIBILITÉ */}

              <div className="border-b border-[#563065]/10 px-6 py-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#938b95]">
                      Disponibilité
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#211d20]">
                      {selectedAppointments.length ===
                      0
                        ? "Journée disponible"
                        : selectedAppointments.length ===
                          1
                        ? "1 rendez-vous prévu"
                        : `${selectedAppointments.length} rendez-vous prévus`}
                    </p>

                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      selectedAppointments.length ===
                      0
                        ? "bg-[#edf8f1] text-[#398057]"
                        : "bg-[#f3edf5] text-[#563065]"
                    }`}
                  >
                    {selectedAppointments.length ===
                    0
                      ? "✓"
                      : "◷"}
                  </div>

                </div>

              </div>

              {/* RENDEZ-VOUS */}

              <div className="max-h-[600px] overflow-y-auto p-5">

                {selectedAppointments.length >
                0 ? (
                  <div className="space-y-4">

                    {selectedAppointments.map(
                      (appointment) => (
                        <AppointmentDetails
                          key={appointment.id}
                          appointment={
                            appointment
                          }
                        />
                      )
                    )}

                  </div>
                ) : (
                  <EmptyDay />
                )}

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   STATISTIQUE
========================================================= */

function CalendarStat({
  label,
  value,
  description,
  icon,
  type = "default",
}: {
  label: string;
  value: number;
  description: string;
  icon: string;
  type?: "default" | "confirmed" | "pending" | "cancelled";
}) {
  const iconStyles = {
    default: "bg-[#f3edf5] text-[#563065]",
    confirmed: "bg-[#edf8f1] text-[#398057]",
    pending: "bg-[#fff5e8] text-[#b36a1e]",
    cancelled: "bg-[#fdf0f1] text-[#b84e5a]",
  };

  return (
    <div className="rounded-[1.5rem] border border-[#563065]/10 bg-white p-5 shadow-[0_6px_25px_rgba(86,48,101,0.04)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#938b95]">
            {label}
          </p>

          <p className="mt-3 text-3xl font-light text-[#211d20]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#938b95]">
            {description}
          </p>

        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${iconStyles[type]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LÉGENDE
========================================================= */

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span className="text-xs text-[#716b72]">
        {label}
      </span>

    </div>
  );
}

/* =========================================================
   PETIT RENDEZ-VOUS DANS LE CALENDRIER
========================================================= */

function MiniAppointment({
  appointment,
}: {
  appointment: Appointment;
}) {
  const statusStyles = {
    Confirmé:
      "border-l-[#563065] bg-[#f3edf5] text-[#563065]",

    "En attente":
      "border-l-[#d68a32] bg-[#fff6eb] text-[#9a5e1d]",

    Annulé:
      "border-l-[#c75c67] bg-[#fdf0f1] text-[#ad4652]",
  };

  return (
    <div
      className={`overflow-hidden rounded-md border-l-[3px] px-2 py-1.5 ${statusStyles[appointment.statut]}`}
    >

      <p className="truncate text-[10px] font-semibold">
        {appointment.heure} ·{" "}
        {appointment.client}
      </p>

      <p className="mt-0.5 truncate text-[9px] opacity-75">
        {appointment.prestation}
      </p>

    </div>
  );
}

/* =========================================================
   DÉTAILS D'UN RENDEZ-VOUS
========================================================= */

function AppointmentDetails({
  appointment,
}: {
  appointment: Appointment;
}) {
  const initials = appointment.client
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#563065]/10 bg-white">

      {/* CLIENTE */}

      <div className="border-b border-[#563065]/10 bg-[#fbf9fc] p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eadff0] text-sm font-medium text-[#563065]">
            {initials}
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-[#211d20]">
              {appointment.client}
            </p>

            <p className="mt-1 text-xs text-[#938b95]">
              Cliente #{appointment.id}
            </p>

          </div>

        </div>

      </div>

      {/* STATUT */}

      <div className="flex items-center justify-between border-b border-[#563065]/10 px-5 py-4">

        <span className="text-xs text-[#716b72]">
          Statut
        </span>

        <StatusBadge
          status={appointment.statut}
        />

      </div>

      {/* INFORMATIONS */}

      <div className="p-5">

        <div className="space-y-4">

          <DetailRow
            icon="✦"
            label="Prestation"
            value={appointment.prestation}
          />

          <DetailRow
            icon="📅"
            label="Date"
            value={formatDate(
              appointment.date
            )}
          />

          <DetailRow
            icon="◷"
            label="Horaire"
            value={appointment.heure}
          />

          <DetailRow
            icon={
              appointment.lieu ===
              "Salon"
                ? "✦"
                : "⌂"
            }
            label="Lieu"
            value={
              appointment.lieu
            }
          />

          <DetailRow
            icon="FC"
            label="Montant"
            value={
              appointment.montant
            }
          />

        </div>

      </div>

      {/* PAIEMENT */}

      <div className="border-t border-[#563065]/10 bg-[#fcfafc] p-5">

        <p className="text-[10px] uppercase tracking-[0.2em] text-[#938b95]">
          Paiement
        </p>

        <div className="mt-3 flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-[#211d20]">
              {getPaymentLabel(
                appointment.paiement
              )}
            </p>

            <p className="mt-1 text-xs text-[#938b95]">
              {getPaymentDescription(
                appointment.paiement
              )}
            </p>

          </div>

          <PaymentBadge
            payment={
              appointment.paiement
            }
          />

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LIGNE D'INFORMATION
========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#f3edf5] text-[11px] font-medium text-[#563065]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-[0.12em] text-[#9a929c]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium text-[#211d20]">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   STATUT
========================================================= */

function StatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  const styles = {
    Confirmé:
      "bg-[#edf8f1] text-[#398057] border-[#398057]/10",

    "En attente":
      "bg-[#fff5e8] text-[#a6641c] border-[#d68a32]/10",

    Annulé:
      "bg-[#fdf0f1] text-[#b84e5a] border-[#c75c67]/10",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   PAIEMENT
========================================================= */

function PaymentBadge({
  payment,
}: {
  payment: PaymentStatus;
}) {
  const styles = {
    Aucun:
      "bg-[#f4f2f4] text-[#716b72]",

    "50%":
      "bg-[#fff5e8] text-[#a6641c]",

    "100%":
      "bg-[#edf8f1] text-[#398057]",
  };

  const labels = {
    Aucun: "Non payé",
    "50%": "50 % payé",
    "100%": "Total payé",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${styles[payment]}`}
    >
      {labels[payment]}
    </span>
  );
}

/* =========================================================
   JOUR VIDE
========================================================= */

function EmptyDay() {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-[#563065]/15 bg-[#fcfafc] px-6 py-12 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3edf5] text-xl text-[#563065]">
        ✓
      </div>

      <h3 className="mt-5 text-sm font-medium text-[#211d20]">
        Aucun rendez-vous
      </h3>

      <p className="mt-2 max-w-[230px] text-xs leading-6 text-[#938b95]">
        Cette journée est actuellement
        disponible pour une nouvelle
        réservation.
      </p>

    </div>
  );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString: string) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

/* =========================================================
   PAIEMENT — TEXTE
========================================================= */

function getPaymentLabel(
  payment: PaymentStatus
) {
  switch (payment) {
    case "100%":
      return "Paiement complet";

    case "50%":
      return "Acompte de 50 %";

    default:
      return "Aucun paiement";
  }
}

function getPaymentDescription(
  payment: PaymentStatus
) {
  switch (payment) {
    case "100%":
      return "La totalité de la prestation a été réglée.";

    case "50%":
      return "La moitié du montant a été réglée.";

    default:
      return "Aucun paiement enregistré pour ce rendez-vous.";
  }
}