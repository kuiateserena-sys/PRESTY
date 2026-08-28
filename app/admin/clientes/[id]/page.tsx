"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";

/* =========================================================
   TYPES
========================================================= */

type Prestation = {
  nom: string;
  description: string;
  prix: number;
  duree: string;
  image: string;
};

type RendezVous = {
  id: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  lieu: "Salon" | "Domicile";
  localisation: string;
  statut: string;
  paiement: {
    methode: string;
    montant: number;
    statut: string;
  };
  prestations: Prestation[];
};

type Cliente = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  statut: "Active" | "Inactive";
  rendezVous: RendezVous[];
};

/* =========================================================
   DONNÉES DES CLIENTES
   =========================================================
   Pour l'instant les données sont simulées.
   Plus tard, elles pourront venir du backend Spring Boot.
========================================================= */

const clientes: Record<string, Cliente> = {

  /* =======================================================
     SÉRÉNA
  ======================================================= */

  "1": {
    id: "1",
    prenom: "Séréna",
    nom: "Kuiaté",
    email: "serena@example.com",
    telephone: "+237 6 52 79 02 84",
    statut: "Active",

    rendezVous: [
      {
        id: "PRESTY-001",

        date: "28 août 2026",
        heureDebut: "13h30",
        heureFin: "15h30",

        lieu: "Salon",
        localisation: "",

        statut: "Confirmé",

        paiement: {
          methode: "Paiement à la réservation",
          montant: 5000,
          statut: "Payé",
        },

        prestations: [
          {
            nom: "Nattes américaines",
            description:
              "Une coiffure élégante et soigneusement réalisée, adaptée au style et aux envies de la cliente.",
            prix: 5000,
            duree: "2h",
            image:
              "/images/prestations/nattes-americaines/1.jpeg",
          },
          {
            nom: "Nattes américaines",
            description:
              "Une réalisation soignée avec un rendu élégant et durable.",
            prix: 5000,
            duree: "2h",
            image:
              "/images/prestations/nattes-americaines/2.jpeg",
          },
        ],
      },
    ],
  },

  /* =======================================================
     CLARA
  ======================================================= */

  "2": {
    id: "2",
    prenom: "Clara",
    nom: "Mbarga",
    email: "clara@example.com",
    telephone: "+237 6 70 45 12 30",
    statut: "Active",

    rendezVous: [
      {
        id: "PRESTY-002",

        date: "29 août 2026",
        heureDebut: "10h00",
        heureFin: "12h30",

        lieu: "Salon",
        localisation: "",

        statut: "Confirmé",

        paiement: {
          methode: "Paiement à la réservation",
          montant: 10000,
          statut: "Payé",
        },

        prestations: [
          {
            nom: "Lace frontale",
            description:
              "Une pose élégante et naturelle permettant d'obtenir un rendu sophistiqué et harmonieux.",
            prix: 10000,
            duree: "2h30",
            image:
              "/images/prestations/lace-frontale/1.jpeg",
          },
          {
            nom: "Lace frontale & chignon",
            description:
              "Une combinaison raffinée entre la pose de lace et une finition chignon élégante.",
            prix: 12000,
            duree: "3h",
            image:
              "/images/prestations/lace-frontale-chignon/1.jpeg",
          },
        ],
      },
    ],
  },

  /* =======================================================
     MÉLANIE
  ======================================================= */

  "3": {
    id: "3",
    prenom: "Mélanie",
    nom: "Ngo",
    email: "melanie@example.com",
    telephone: "+237 6 91 23 45 67",
    statut: "Active",

    rendezVous: [
      {
        id: "PRESTY-003",

        date: "30 août 2026",
        heureDebut: "14h00",
        heureFin: "16h30",

        lieu: "Domicile",
        localisation: "Bonamoussadi, Douala",

        statut: "Confirmé",

        paiement: {
          methode: "Paiement à la réservation",
          montant: 8000,
          statut: "Non payé",
        },

        prestations: [
          {
            nom: "Rasta américains",
            description:
              "Des rasta américains réalisés avec précision pour un style moderne et élégant.",
            prix: 8000,
            duree: "2h30",
            image:
              "/images/prestations/rasta-americains/1.jpeg",
          },
          {
            nom: "Rasta américains & boucles",
            description:
              "Une version raffinée des rasta américains avec une finition bouclée.",
            prix: 9000,
            duree: "3h",
            image:
              "/images/prestations/rasta-americains-boucles/1.jpeg",
          },
        ],
      },
    ],
  },

  /* =======================================================
     ESTELLE
  ======================================================= */

  "4": {
    id: "4",
    prenom: "Estelle",
    nom: "Foko",
    email: "estelle@example.com",
    telephone: "+237 6 78 56 34 21",
    statut: "Active",

    rendezVous: [
      {
        id: "PRESTY-004",

        date: "31 août 2026",
        heureDebut: "09h00",
        heureFin: "11h30",

        lieu: "Salon",
        localisation: "",

        statut: "Confirmé",

        paiement: {
          methode: "Paiement à la réservation",
          montant: 7000,
          statut: "Payé",
        },

        prestations: [
          {
            nom: "Passe-mèche américain",
            description:
              "Une coiffure élégante réalisée avec soin pour un résultat naturel et sophistiqué.",
            prix: 7000,
            duree: "2h30",
            image:
              "/images/prestations/passe-meche-americains/1.jpeg",
          },
          {
            nom: "Passe-mèche américain & boucles",
            description:
              "Une finition bouclée donnant davantage de volume et de caractère à la coiffure.",
            prix: 8000,
            duree: "3h",
            image:
              "/images/prestations/passe-meche-americains-boucles/1.jpeg",
          },
        ],
      },
    ],
  },

  /* =======================================================
     GRÂCE
  ======================================================= */

  "5": {
    id: "5",
    prenom: "Grâce",
    nom: "Tchoumi",
    email: "grace@example.com",
    telephone: "+237 6 88 34 76 10",
    statut: "Inactive",

    rendezVous: [
      {
        id: "PRESTY-005",

        date: "02 septembre 2026",
        heureDebut: "15h00",
        heureFin: "17h00",

        lieu: "Salon",
        localisation: "",

        statut: "En attente",

        paiement: {
          methode: "Paiement à la réservation",
          montant: 6000,
          statut: "Non payé",
        },

        prestations: [
          {
            nom: "Locks",
            description:
              "Une prestation locks réalisée avec soin pour mettre en valeur la personnalité et le style de la cliente.",
            prix: 6000,
            duree: "2h",
            image:
              "/images/prestations/locks/1.jpeg",
          },
          {
            nom: "Locks & boucles",
            description:
              "Une finition élégante avec des boucles pour apporter du volume et du mouvement.",
            prix: 7000,
            duree: "2h30",
            image:
              "/images/prestations/locks-boucles/1.jpeg",
          },
        ],
      },
    ],
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function ClientRendezVousPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = use(params);

  const cliente = clientes[id];

  /* =======================================================
     CLIENTE INTROUVABLE
  ======================================================= */

  if (!cliente) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f7] px-6">

        <div className="w-full max-w-lg rounded-[2rem] border border-black/[0.06] bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            ⌕
          </div>

          <h1 className="mt-5 text-2xl font-medium">
            Cliente introuvable
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            La cliente correspondant à cette référence
            n'existe pas.
          </p>

          <Link
            href="/admin/clientes"
            className="mt-7 inline-flex rounded-full bg-[#563065] px-6 py-3 text-sm text-white transition hover:bg-[#42234e]"
          >
            ← Retour aux clientes
          </Link>

        </div>

      </main>
    );
  }

  const dernierRendezVous =
    cliente.rendezVous[0];

  return (
    <main className="min-h-screen bg-[#f8f5f7] text-[#211d20]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">

          {/* LOGO */}

          <Link
            href="/admin"
            className="text-xl font-semibold tracking-[0.28em]"
          >
            PRESTY
          </Link>

          {/* TITRE */}

          <div className="hidden text-center md:block">

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#76547f]">
              Administration
            </p>

            <h1 className="mt-1 text-lg font-medium">
              Détails cliente
            </h1>

          </div>

          {/* RETOUR */}

          <Link
            href="/admin/clientes"
            className="flex items-center gap-2 rounded-full border border-[#563065]/15 bg-white px-5 py-3 text-sm transition hover:-translate-x-1 hover:border-[#563065]/30 hover:bg-[#faf8f6]"
          >
            <span>←</span>
            Retour
          </Link>

        </div>

      </header>

      {/* =====================================================
          CONTENU
      ====================================================== */}

      <section className="px-6 py-10 md:px-10 md:py-14">

        <div className="mx-auto max-w-[1300px]">

          {/* =================================================
              EN-TÊTE CLIENTE
          ================================================== */}

          <div className="mb-10">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#76547f]">
              Profil cliente
            </p>

            <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eadff0] text-lg font-semibold text-[#563065]">
                    {cliente.prenom.charAt(0)}
                    {cliente.nom.charAt(0)}
                  </div>

                  <div>

                    <h2 className="text-4xl font-light tracking-[-0.04em] md:text-6xl">

                      {cliente.prenom}{" "}

                      <span className="font-serif italic text-[#563065]">
                        {cliente.nom}
                      </span>

                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                      Cliente #{cliente.id}
                    </p>

                  </div>

                </div>

              </div>

              <span
                className={`w-fit rounded-full px-5 py-2 text-xs font-medium ${
                  cliente.statut === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                ● {cliente.statut}
              </span>

            </div>

          </div>

          {/* =================================================
              INFORMATIONS CLIENTE
          ================================================== */}

          <div className="mb-8 rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-9">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#563065]/10 text-[#563065]">
                👤
              </div>

              <div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  Informations
                </p>

                <h3 className="mt-1 text-xl font-medium">
                  Coordonnées de la cliente
                </h3>

              </div>

            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">

              <div className="rounded-2xl bg-[#f8f5f7] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Nom complet
                </p>

                <p className="mt-2 text-sm font-medium">
                  {cliente.prenom} {cliente.nom}
                </p>

              </div>

              <div className="rounded-2xl bg-[#f8f5f7] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Email
                </p>

                <p className="mt-2 text-sm font-medium">
                  {cliente.email}
                </p>

              </div>

              <div className="rounded-2xl bg-[#f8f5f7] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Téléphone
                </p>

                <p className="mt-2 text-sm font-medium">
                  {cliente.telephone}
                </p>

              </div>

              <div className="rounded-2xl bg-[#f8f5f7] p-5">

                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Nombre de rendez-vous
                </p>

                <p className="mt-2 text-sm font-medium text-[#563065]">
                  {cliente.rendezVous.length} rendez-vous
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              RENDEZ-VOUS
          ================================================== */}

          {cliente.rendezVous.map((rendezVous) => (

            <div
              key={rendezVous.id}
              className="mb-10"
            >

              {/* =================================================
                  TITRE DU RENDEZ-VOUS
              ================================================== */}

              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">

                <div>

                  <p className="text-xs uppercase tracking-[0.3em] text-[#76547f]">
                    Rendez-vous
                  </p>

                  <h2 className="mt-2 text-3xl font-light md:text-4xl">
                    {rendezVous.date}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Référence : {rendezVous.id}
                  </p>

                </div>

                <span className="w-fit rounded-full bg-green-50 px-5 py-2 text-xs font-medium text-green-700">
                  ● {rendezVous.statut}
                </span>

              </div>

              {/* =================================================
                  GRILLE PRINCIPALE
              ================================================== */}

              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">

                {/* =================================================
                    PRESTATIONS
                ================================================== */}

                <div className="space-y-6">

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-9">

                    <div className="mb-7">

                      <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                        Prestations choisies
                      </p>

                      <h3 className="mt-2 text-2xl font-medium">
                        {rendezVous.prestations.length} prestation
                        {rendezVous.prestations.length > 1
                          ? "s"
                          : ""}
                      </h3>

                    </div>

                    <div className="space-y-6">

                      {rendezVous.prestations.map(
                        (prestation, index) => (

                          <div
                            key={`${prestation.nom}-${index}`}
                            className="overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-[#faf8f6]"
                          >

                            {/* IMAGE */}

                            <div className="relative h-[300px] w-full overflow-hidden">

                              <Image
                                src={prestation.image}
                                alt={prestation.nom}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition duration-500 hover:scale-105"
                              />

                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">

                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                                  Prestation {index + 1}
                                </p>

                                <h4 className="mt-2 text-2xl font-light text-white">
                                  {prestation.nom}
                                </h4>

                              </div>

                            </div>

                            {/* DETAILS */}

                            <div className="p-6">

                              <p className="text-sm leading-7 text-gray-500">
                                {prestation.description}
                              </p>

                              <div className="mt-6 grid grid-cols-2 gap-3">

                                <div className="rounded-xl bg-white p-4">

                                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                                    Prix
                                  </p>

                                  <p className="mt-2 text-sm font-medium text-[#563065]">
                                    {prestation.prix.toLocaleString(
                                      "fr-FR"
                                    )}{" "}
                                    FCFA
                                  </p>

                                </div>

                                <div className="rounded-xl bg-white p-4">

                                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                                    Durée
                                  </p>

                                  <p className="mt-2 text-sm font-medium">
                                    {prestation.duree}
                                  </p>

                                </div>

                              </div>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </div>

                {/* =================================================
                    INFORMATIONS DU RENDEZ-VOUS
                ================================================== */}

                <div className="space-y-6">

                  {/* DATE + CRÉNEAU */}

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-9">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#563065]/10 text-[#563065]">
                        📅
                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                          Rendez-vous
                        </p>

                        <h3 className="mt-1 text-xl font-medium">
                          Date & créneau
                        </h3>

                      </div>

                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">

                      <div className="rounded-2xl bg-[#f8f5f7] p-5">

                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                          Date
                        </p>

                        <p className="mt-2 text-base font-medium">
                          {rendezVous.date}
                        </p>

                      </div>

                      <div className="rounded-2xl bg-[#f8f5f7] p-5">

                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                          Créneau
                        </p>

                        <p className="mt-2 text-base font-medium">
                          {rendezVous.heureDebut} –{" "}
                          {rendezVous.heureFin}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* LIEU */}

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-9">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#563065]/10 text-[#563065]">
                        📍
                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                          Lieu
                        </p>

                        <h3 className="mt-1 text-xl font-medium">
                          {rendezVous.lieu}
                        </h3>

                      </div>

                    </div>

                    {rendezVous.lieu === "Domicile" && (
                      <div className="mt-6 rounded-2xl bg-[#f8f5f7] p-5">

                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                          Localisation
                        </p>

                        <p className="mt-2 text-sm">
                          {rendezVous.localisation}
                        </p>

                      </div>
                    )}

                  </div>

                  {/* PAIEMENT */}

                  <div className="rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-sm md:p-9">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#563065]/10 text-[#563065]">
                        💳
                      </div>

                      <div>

                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                          Paiement
                        </p>

                        <h3 className="mt-1 text-xl font-medium">
                          Informations de paiement
                        </h3>

                      </div>

                    </div>

                    <div className="mt-7 space-y-4">

                      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">

                        <span className="text-sm text-gray-500">
                          Mode
                        </span>

                        <span className="text-right text-sm font-medium">
                          {rendezVous.paiement.methode}
                        </span>

                      </div>

                      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">

                        <span className="text-sm text-gray-500">
                          Montant
                        </span>

                        <span className="text-sm font-medium text-[#563065]">
                          {rendezVous.paiement.montant.toLocaleString(
                            "fr-FR"
                          )}{" "}
                          FCFA
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Statut
                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-medium ${
                            rendezVous.paiement.statut ===
                            "Payé"
                              ? "bg-green-50 text-green-700"
                              : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {rendezVous.paiement.statut}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

          {/* =================================================
              RÉSUMÉ FINAL
          ================================================== */}

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-[#211d20] p-8 text-white md:p-10">

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

              <div>

                <p className="text-xs uppercase tracking-[0.3em] text-[#c9a9d1]">
                  PRESTY
                </p>

                <h3 className="mt-3 text-3xl font-light">
                  Historique de {cliente.prenom}
                </h3>

                <p className="mt-3 max-w-[650px] text-sm leading-7 text-white/55">
                  Retrouvez ici les informations de la cliente,
                  ses prestations, ses rendez-vous, les créneaux
                  sélectionnés ainsi que les informations de paiement.
                </p>

              </div>

              <div className="text-left md:text-right">

                <p className="font-serif text-3xl italic text-[#c9a9d1]">
                  PRESTY
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Votre beauté, votre moment.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              RETOUR
          ================================================== */}

          <div className="mt-8 flex justify-center">

            <Link
              href="/admin/clientes"
              className="rounded-full border border-[#563065]/15 bg-white px-7 py-3 text-sm font-medium text-[#563065] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#563065] hover:text-white"
            >
              ← Retour à la liste des clientes
            </Link>

          </div>

          {/* ID TECHNIQUE */}

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Référence de la cliente : {cliente.id}
          </p>

        </div>

      </section>

    </main>
  );
}