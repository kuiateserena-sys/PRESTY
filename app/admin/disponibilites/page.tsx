"use client";

import { useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type JourPlanning = {
  id: number;
  jour: string;
  ouvert: boolean;
  debut: string;
  fin: string;
  pauseDebut: string;
  pauseFin: string;
};

type Indisponibilite = {
  id: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  motif: string;
};

/* =========================================================
   DONNÉES INITIALES
========================================================= */

const planningInitial: JourPlanning[] = [
  {
    id: 1,
    jour: "Lundi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 2,
    jour: "Mardi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 3,
    jour: "Mercredi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 4,
    jour: "Jeudi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 5,
    jour: "Vendredi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 6,
    jour: "Samedi",
    ouvert: true,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "13:00",
    pauseFin: "14:00",
  },
  {
    id: 7,
    jour: "Dimanche",
    ouvert: false,
    debut: "09:00",
    fin: "19:00",
    pauseDebut: "",
    pauseFin: "",
  },
];

const indisponibilitesInitiales: Indisponibilite[] = [
  {
    id: 1,
    date: "28/08/2026",
    heureDebut: "14:00",
    heureFin: "19:00",
    motif: "Indisponibilité exceptionnelle",
  },
];

/* =========================================================
   CRÉNEAUX DE DÉMONSTRATION
   À remplacer plus tard par les vrais rendez-vous API
========================================================= */

const creneauxDemo = [
  {
    heure: "09:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "10:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "11:00",
    statut: "reserve",
    cliente: "Cliente",
    prestation: "Lace frontale",
  },
  {
    heure: "12:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "13:00",
    statut: "pause",
    cliente: "",
    prestation: "",
  },
  {
    heure: "14:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "15:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "16:00",
    statut: "reserve",
    cliente: "Cliente",
    prestation: "Rasta américains",
  },
  {
    heure: "17:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
  {
    heure: "18:00",
    statut: "disponible",
    cliente: "",
    prestation: "",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function DisponibilitePage() {
  const [planning, setPlanning] =
    useState<JourPlanning[]>(planningInitial);

  const [indisponibilites, setIndisponibilites] =
    useState<Indisponibilite[]>(
      indisponibilitesInitiales
    );

  const [jourSelectionne, setJourSelectionne] =
    useState("Lundi");

  const [domicileActif, setDomicileActif] =
    useState(true);

  const [modal, setModal] = useState<
    "modifier" | "indisponibilite" | null
  >(null);

  const [jourEdition, setJourEdition] =
    useState<JourPlanning | null>(null);

  const [nouvelleIndisponibilite, setNouvelleIndisponibilite] =
    useState({
      date: "",
      heureDebut: "09:00",
      heureFin: "19:00",
      motif: "",
    });

  /* =======================================================
     STATISTIQUES
  ======================================================= */

  const joursOuverts = planning.filter(
    (jour) => jour.ouvert
  ).length;

  const joursFermes = planning.filter(
    (jour) => !jour.ouvert
  ).length;

  const creneauxDisponibles = creneauxDemo.filter(
    (creneau) => creneau.statut === "disponible"
  ).length;

  /* =======================================================
     JOUR SÉLECTIONNÉ
  ======================================================= */

  const jourActuel = useMemo(
    () =>
      planning.find(
        (jour) => jour.jour === jourSelectionne
      ),
    [planning, jourSelectionne]
  );

  /* =======================================================
     MODIFIER LE PLANNING
  ======================================================= */

  function ouvrirModification(jour: JourPlanning) {
    setJourEdition({ ...jour });
    setModal("modifier");
  }

  function enregistrerModification() {
    if (!jourEdition) return;

    setPlanning((ancien) =>
      ancien.map((jour) =>
        jour.id === jourEdition.id
          ? jourEdition
          : jour
      )
    );

    setModal(null);
    setJourEdition(null);
  }

  /* =======================================================
     AJOUTER UNE INDISPONIBILITÉ
  ======================================================= */

  function ajouterIndisponibilite() {
    if (
      !nouvelleIndisponibilite.date ||
      !nouvelleIndisponibilite.motif
    ) {
      alert(
        "Veuillez renseigner la date et le motif."
      );
      return;
    }

    const nouvelle: Indisponibilite = {
      id: Date.now(),
      date: nouvelleIndisponibilite.date,
      heureDebut:
        nouvelleIndisponibilite.heureDebut,
      heureFin:
        nouvelleIndisponibilite.heureFin,
      motif: nouvelleIndisponibilite.motif,
    };

    setIndisponibilites((ancien) => [
      ...ancien,
      nouvelle,
    ]);

    setNouvelleIndisponibilite({
      date: "",
      heureDebut: "09:00",
      heureFin: "19:00",
      motif: "",
    });

    setModal(null);
  }

  /* =======================================================
     SUPPRIMER UNE INDISPONIBILITÉ
  ======================================================= */

  function supprimerIndisponibilite(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous supprimer cette indisponibilité ?"
    );

    if (!confirmation) return;

    setIndisponibilites((ancien) =>
      ancien.filter((item) => item.id !== id)
    );
  }

  /* =======================================================
     RENDU
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#faf8fb] px-4 py-6 text-[#2d2131] dark:bg-[#151116] dark:text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            EN-TÊTE
        ================================================= */}

        <div className="mb-7">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b638f]">
            PRESTY · Administration
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Disponibilité
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Gérez les horaires de travail, les pauses,
                les indisponibilités et les créneaux de la
                coiffeuse.
              </p>
            </div>

            <button
              onClick={() =>
                setModal("indisponibilite")
              }
              className="rounded-2xl bg-[#563065] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#472553] hover:shadow-md"
            >
              + Ajouter une indisponibilité
            </button>

          </div>
        </div>

        {/* =================================================
            STATISTIQUES
        ================================================= */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Carte 1 */}

          <div className="rounded-3xl border border-[#eadfea] bg-white p-5 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

            <div className="flex items-center justify-between">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Jours ouverts
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/20">
                ✓
              </span>

            </div>

            <p className="mt-3 text-3xl font-bold">
              {joursOuverts}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              sur 7 jours
            </p>

          </div>

          {/* Carte 2 */}

          <div className="rounded-3xl border border-[#eadfea] bg-white p-5 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

            <div className="flex items-center justify-between">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Jour de repos
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-[#302630]">
                −
              </span>

            </div>

            <p className="mt-3 text-3xl font-bold">
              {joursFermes}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Dimanche
            </p>

          </div>

          {/* Carte 3 */}

          <div className="rounded-3xl border border-[#eadfea] bg-white p-5 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

            <div className="flex items-center justify-between">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Créneaux libres
              </p>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1e8f3] text-[#563065] dark:bg-[#38293c]">
                ◷
              </span>

            </div>

            <p className="mt-3 text-3xl font-bold">
              {creneauxDisponibles}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Exemple pour aujourd'hui
            </p>

          </div>

          {/* Carte 4 */}

          <div className="rounded-3xl border border-[#eadfea] bg-white p-5 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

            <div className="flex items-center justify-between">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                À domicile
              </p>

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  domicileActif
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              />

            </div>

            <p className="mt-3 text-lg font-bold">
              {domicileActif
                ? "Activé"
                : "Désactivé"}
            </p>

            <button
              onClick={() =>
                setDomicileActif(!domicileActif)
              }
              className="mt-1 text-xs font-medium text-[#563065] hover:underline"
            >
              Modifier
            </button>

          </div>

        </div>

        {/* =================================================
            HORAIRES HABITUELS
        ================================================= */}

        <section className="mb-7 overflow-hidden rounded-3xl border border-[#eadfea] bg-white shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

          <div className="flex flex-col gap-3 border-b border-[#eee6ef] p-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#332a34]">

            <div>
              <h2 className="font-semibold">
                Horaires habituels
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Planning général de la coiffeuse du lundi
                au dimanche.
              </p>
            </div>

            <div className="rounded-xl bg-[#f8f3f9] px-3 py-2 text-xs font-medium text-[#563065] dark:bg-[#302630] dark:text-[#dfc7e3]">
              Lundi → Samedi · 09h00 → 19h00
            </div>

          </div>

          {/* TABLEAU */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left">

              <thead>
                <tr className="border-b border-[#eee6ef] text-xs text-gray-500 dark:border-[#332a34] dark:text-gray-400">

                  <th className="px-5 py-4 font-medium">
                    Jour
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Horaires
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Pause
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Statut
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {planning.map((jour) => (

                  <tr
                    key={jour.id}
                    className="border-b border-[#f0eaf1] transition last:border-0 hover:bg-[#fcfafc] dark:border-[#302830] dark:hover:bg-[#251e26]"
                  >

                    {/* JOUR */}

                    <td className="px-5 py-4">

                      <button
                        onClick={() =>
                          setJourSelectionne(
                            jour.jour
                          )
                        }
                        className={`font-semibold ${
                          jourSelectionne ===
                          jour.jour
                            ? "text-[#563065]"
                            : ""
                        }`}
                      >
                        {jour.jour}
                      </button>

                    </td>

                    {/* HORAIRES */}

                    <td className="px-5 py-4">

                      {jour.ouvert ? (
                        <span className="text-sm font-medium">
                          {jour.debut}
                          <span className="mx-2 text-gray-400">
                            →
                          </span>
                          {jour.fin}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          —
                        </span>
                      )}

                    </td>

                    {/* PAUSE */}

                    <td className="px-5 py-4">

                      {jour.ouvert &&
                      jour.pauseDebut ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {jour.pauseDebut}
                          <span className="mx-2 text-gray-400">
                            →
                          </span>
                          {jour.pauseFin}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          —
                        </span>
                      )}

                    </td>

                    {/* STATUT */}

                    <td className="px-5 py-4">

                      {jour.ouvert ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">

                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                          Ouvert

                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:bg-[#302630] dark:text-gray-400">

                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />

                          Repos

                        </span>
                      )}

                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() =>
                          ouvrirModification(
                            jour
                          )
                        }
                        className="rounded-xl border border-[#e4d9e6] px-3 py-2 text-xs font-semibold text-[#563065] transition hover:bg-[#f8f3f9] dark:border-[#403542] dark:hover:bg-[#302630]"
                      >
                        Modifier
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            CRÉNEAUX
        ================================================= */}

        <section className="mb-7 rounded-3xl border border-[#eadfea] bg-white shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

          <div className="border-b border-[#eee6ef] p-5 dark:border-[#332a34]">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-[#8b638f]">
                  Planning du jour
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Créneaux · {jourSelectionne}
                </h2>

              </div>

              <div className="flex gap-2 text-[10px]">

                <span className="rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-700 dark:bg-green-950/20 dark:text-green-400">
                  ● Disponible
                </span>

                <span className="rounded-full bg-red-50 px-3 py-1.5 font-medium text-red-600 dark:bg-red-950/20 dark:text-red-400">
                  ● Réservé
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-500 dark:bg-[#302630]">
                  ● Pause
                </span>

              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px] text-left">

              <thead>

                <tr className="border-b border-[#eee6ef] text-xs text-gray-500 dark:border-[#332a34] dark:text-gray-400">

                  <th className="px-5 py-4 font-medium">
                    Heure
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Statut
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Cliente
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Prestation
                  </th>

                </tr>

              </thead>

              <tbody>

                {creneauxDemo.map((creneau) => {

                  const reserve =
                    creneau.statut ===
                    "reserve";

                  const pause =
                    creneau.statut ===
                    "pause";

                  return (

                    <tr
                      key={creneau.heure}
                      className="border-b border-[#f0eaf1] last:border-0 dark:border-[#302830]"
                    >

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold">
                          {creneau.heure}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        {reserve ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:bg-red-950/20 dark:text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Réservé
                          </span>
                        ) : pause ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:bg-[#302630] dark:text-gray-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Pause
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-950/20 dark:text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Disponible
                          </span>
                        )}

                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">

                        {creneau.cliente ||
                          "—"}

                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">

                        {creneau.prestation ||
                          "—"}

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            INDISPONIBILITÉS
        ================================================= */}

        <section className="mb-7 overflow-hidden rounded-3xl border border-[#eadfea] bg-white shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">

          <div className="flex flex-col gap-3 border-b border-[#eee6ef] p-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#332a34]">

            <div>

              <h2 className="font-semibold">
                Indisponibilités exceptionnelles
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Les périodes pendant lesquelles la
                coiffeuse ne pourra pas recevoir de
                clientes.
              </p>

            </div>

            <button
              onClick={() =>
                setModal("indisponibilite")
              }
              className="rounded-xl bg-[#f1e8f3] px-4 py-2.5 text-xs font-semibold text-[#563065] transition hover:bg-[#e8dbe9] dark:bg-[#38293c] dark:text-[#e2c8e7]"
            >
              + Ajouter
            </button>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left">

              <thead>

                <tr className="border-b border-[#eee6ef] text-xs text-gray-500 dark:border-[#332a34]">

                  <th className="px-5 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Horaires
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Motif
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {indisponibilites.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      Aucune indisponibilité
                      exceptionnelle.
                    </td>

                  </tr>

                ) : (

                  indisponibilites.map(
                    (item) => (

                      <tr
                        key={item.id}
                        className="border-b border-[#f0eaf1] last:border-0 dark:border-[#302830]"
                      >

                        <td className="px-5 py-4 text-sm font-semibold">
                          {item.date}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.heureDebut}
                          <span className="mx-2">
                            →
                          </span>
                          {item.heureFin}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {item.motif}
                        </td>

                        <td className="px-5 py-4 text-right">

                          <button
                            onClick={() =>
                              supprimerIndisponibilite(
                                item.id
                              )
                            }
                            className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100 dark:bg-red-950/20"
                          >
                            Supprimer
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            INFORMATIONS
        ================================================= */}

        <div className="rounded-3xl border border-[#eadfea] bg-[#f8f3f9] p-5 dark:border-[#332a34] dark:bg-[#211b22]">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#563065] shadow-sm dark:bg-[#302630]">
              i
            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Fonctionnement des disponibilités
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Les horaires habituels définissent les
                heures pendant lesquelles la coiffeuse
                accepte les rendez-vous. Les pauses et les
                indisponibilités exceptionnelles bloquent
                temporairement certains créneaux.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          MODALE MODIFICATION DES HORAIRES
      ================================================= */}

      {modal === "modifier" &&
        jourEdition && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl dark:bg-[#211b22]">

              <div className="mb-6 flex items-start justify-between">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b638f]">
                    PRESTY
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Modifier les horaires
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {jourEdition.jour}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setModal(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf4] text-lg dark:bg-[#302630]"
                >
                  ×
                </button>

              </div>

              {/* OUVERT / FERMÉ */}

              <label className="mb-5 flex cursor-pointer items-center justify-between rounded-2xl bg-[#f8f3f9] p-4 dark:bg-[#2a222c]">

                <div>

                  <p className="text-sm font-semibold">
                    Journée travaillée
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    La coiffeuse accepte les
                    rendez-vous ce jour.
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={jourEdition.ouvert}
                  onChange={(e) =>
                    setJourEdition({
                      ...jourEdition,
                      ouvert:
                        e.target.checked,
                    })
                  }
                  className="h-5 w-5 accent-[#563065]"
                />

              </label>

              {/* HORAIRES */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="mb-1.5 block text-xs font-medium">
                    Début
                  </label>

                  <input
                    type="time"
                    value={
                      jourEdition.debut
                    }
                    onChange={(e) =>
                      setJourEdition({
                        ...jourEdition,
                        debut:
                          e.target.value,
                      })
                    }
                    disabled={
                      !jourEdition.ouvert
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#563065] disabled:opacity-40 dark:border-[#403542] dark:bg-[#19151b]"
                  />

                </div>

                <div>

                  <label className="mb-1.5 block text-xs font-medium">
                    Fin
                  </label>

                  <input
                    type="time"
                    value={
                      jourEdition.fin
                    }
                    onChange={(e) =>
                      setJourEdition({
                        ...jourEdition,
                        fin: e.target.value,
                      })
                    }
                    disabled={
                      !jourEdition.ouvert
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#563065] disabled:opacity-40 dark:border-[#403542] dark:bg-[#19151b]"
                  />

                </div>

              </div>

              {/* PAUSE */}

              <div className="mt-5">

                <p className="mb-2 text-xs font-semibold">
                  Pause
                </p>

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="time"
                    value={
                      jourEdition.pauseDebut
                    }
                    onChange={(e) =>
                      setJourEdition({
                        ...jourEdition,
                        pauseDebut:
                          e.target.value,
                      })
                    }
                    disabled={
                      !jourEdition.ouvert
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#563065] disabled:opacity-40 dark:border-[#403542] dark:bg-[#19151b]"
                  />

                  <input
                    type="time"
                    value={
                      jourEdition.pauseFin
                    }
                    onChange={(e) =>
                      setJourEdition({
                        ...jourEdition,
                        pauseFin:
                          e.target.value,
                      })
                    }
                    disabled={
                      !jourEdition.ouvert
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#563065] disabled:opacity-40 dark:border-[#403542] dark:bg-[#19151b]"
                  />

                </div>

              </div>

              {/* BOUTONS */}

              <div className="mt-7 flex gap-2">

                <button
                  onClick={() =>
                    setModal(null)
                  }
                  className="flex-1 rounded-xl border border-[#e5dbe7] py-3 text-xs font-semibold dark:border-[#403542]"
                >
                  Annuler
                </button>

                <button
                  onClick={
                    enregistrerModification
                  }
                  className="flex-1 rounded-xl bg-[#563065] py-3 text-xs font-semibold text-white transition hover:bg-[#472553]"
                >
                  Enregistrer
                </button>

              </div>

            </div>

          </div>
        )}

      {/* =================================================
          MODALE INDISPONIBILITÉ
      ================================================= */}

      {modal === "indisponibilite" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl dark:bg-[#211b22]">

            <div className="mb-6 flex items-start justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b638f]">
                  PRESTY
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Ajouter une indisponibilité
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Bloquez une période exceptionnelle.
                </p>

              </div>

              <button
                onClick={() =>
                  setModal(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf4] text-lg dark:bg-[#302630]"
              >
                ×
              </button>

            </div>

            <div className="space-y-4">

              {/* DATE */}

              <div>

                <label className="mb-1.5 block text-xs font-medium">
                  Date
                </label>

                <input
                  type="date"
                  value={
                    nouvelleIndisponibilite.date
                  }
                  onChange={(e) =>
                    setNouvelleIndisponibilite(
                      {
                        ...nouvelleIndisponibilite,
                        date: e.target.value,
                      }
                    )
                  }
                  className="w-full rounded-xl border border-[#e4d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                />

              </div>

              {/* HORAIRES */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="mb-1.5 block text-xs font-medium">
                    De
                  </label>

                  <input
                    type="time"
                    value={
                      nouvelleIndisponibilite.heureDebut
                    }
                    onChange={(e) =>
                      setNouvelleIndisponibilite(
                        {
                          ...nouvelleIndisponibilite,
                          heureDebut:
                            e.target.value,
                        }
                      )
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />

                </div>

                <div>

                  <label className="mb-1.5 block text-xs font-medium">
                    À
                  </label>

                  <input
                    type="time"
                    value={
                      nouvelleIndisponibilite.heureFin
                    }
                    onChange={(e) =>
                      setNouvelleIndisponibilite(
                        {
                          ...nouvelleIndisponibilite,
                          heureFin:
                            e.target.value,
                        }
                      )
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />

                </div>

              </div>

              {/* MOTIF */}

              <div>

                <label className="mb-1.5 block text-xs font-medium">
                  Motif
                </label>

                <textarea
                  value={
                    nouvelleIndisponibilite.motif
                  }
                  onChange={(e) =>
                    setNouvelleIndisponibilite(
                      {
                        ...nouvelleIndisponibilite,
                        motif: e.target.value,
                      }
                    )
                  }
                  rows={3}
                  placeholder="Ex : rendez-vous personnel, congé..."
                  className="w-full resize-none rounded-xl border border-[#e4d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                />

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-7 flex gap-2">

              <button
                onClick={() =>
                  setModal(null)
                }
                className="flex-1 rounded-xl border border-[#e5dbe7] py-3 text-xs font-semibold dark:border-[#403542]"
              >
                Annuler
              </button>

              <button
                onClick={
                  ajouterIndisponibilite
                }
                className="flex-1 rounded-xl bg-[#563065] py-3 text-xs font-semibold text-white transition hover:bg-[#472553]"
              >
                Ajouter
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

