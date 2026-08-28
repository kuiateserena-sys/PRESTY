"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Prestation = {
  id: number;
  nom: string;
  dossier: string;
  nombreImages: number;
  description: string;
  prix: number;
  duree: string;
  horaires: string;
  domicile: boolean;
  active: boolean;
  inclus: string[];
};

const prestationsInitiales: Prestation[] = [
  {
    id: 1,
    nom: "Lace frontale",
    dossier: "lace-frontale",
    nombreImages: 6,
    description:
      "Une pose élégante et naturelle pour un rendu raffiné et parfaitement adapté.",
    prix: 10000,
    duree: "1h30",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Pose", "Finition", "Conseils d'entretien"],
  },
  {
    id: 2,
    nom: "Lace frontale & chignon",
    dossier: "lace-frontale-chignon",
    nombreImages: 6,
    description:
      "Une combinaison élégante entre lace frontale et chignon pour une allure sophistiquée.",
    prix: 12000,
    duree: "2h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Pose", "Coiffage", "Finition"],
  },
  {
    id: 3,
    nom: "Locks",
    dossier: "locks",
    nombreImages: 6,
    description:
      "Une coiffure intemporelle mettant en valeur la beauté et le caractère des locks.",
    prix: 10000,
    duree: "3h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Finition", "Conseils"],
  },
  {
    id: 4,
    nom: "Locks & boucles",
    dossier: "locks-boucles",
    nombreImages: 6,
    description:
      "Des locks sublimées par de magnifiques boucles pour un style original et élégant.",
    prix: 20000,
    duree: "3h30",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Boucles", "Finition"],
  },
  {
    id: 5,
    nom: "Nattes naturelles",
    dossier: "nattes-naturelles",
    nombreImages: 6,
    description:
      "Des nattes naturelles réalisées avec soin pour un style authentique et élégant.",
    prix: 5000,
    duree: "1h30",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Finition", "Conseils"],
  },
  {
    id: 6,
    nom: "Passe-mèche américains",
    dossier: "passe-meche-americains",
    nombreImages: 6,
    description:
      "Une coiffure moderne et élégante réalisée avec précision pour un rendu harmonieux.",
    prix: 10000,
    duree: "2h30",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Finition"],
  },
  {
    id: 7,
    nom: "Passe-mèche américains & boucles",
    dossier: "passe-meche-americains-boucles",
    nombreImages: 6,
    description:
      "Un passe-mèche élégant accompagné de boucles pour une finition sophistiquée.",
    prix: 12000,
    duree: "3h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Boucles", "Finition"],
  },
  {
    id: 8,
    nom: "Rasta américains & boucles",
    dossier: "rasta-americains-boucles",
    nombreImages: 6,
    description:
      "Des rastas américains sublimés par des boucles pour un style moderne et raffiné.",
    prix: 12000,
    duree: "3h30",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Boucles", "Finition"],
  },
  {
    id: 9,
    nom: "Rasta américains",
    dossier: "rasta-americains",
    nombreImages: 6,
    description:
      "Des rastas américains élégants et soigneusement réalisés pour un résultat durable.",
    prix: 10000,
    duree: "3h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: true,
    inclus: ["Coiffure", "Finition", "Conseils"],
  },

  // PRESTATIONS BIENTÔT DISPONIBLES
  {
    id: 10,
    nom: "Make Up",
    dossier: "makeUp",
    nombreImages: 1,
    description:
      "Une prestation maquillage élégante pour sublimer votre visage lors de vos occasions spéciales.",
    prix: 5000,
    duree: "1h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: false,
    inclus: ["Maquillage", "Finition"],
  },
  {
    id: 11,
    nom: "Manicure",
    dossier: "manicure",
    nombreImages: 1,
    description:
      "Une prestation dédiée à la beauté et au soin des mains.",
    prix: 5000,
    duree: "45 min",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: false,
    inclus: ["Soin", "Finition"],
  },
  {
    id: 12,
    nom: "Pédicure",
    dossier: "pédicure",
    nombreImages: 1,
    description:
      "Une prestation complète pour prendre soin de vos pieds avec élégance.",
    prix: 5000,
    duree: "1h",
    horaires: "09h00 - 19h00",
    domicile: true,
    active: false,
    inclus: ["Soin", "Finition"],
  },
];

function formatPrix(prix: number) {
  return `${new Intl.NumberFormat("fr-FR").format(prix)} FCFA`;
}

function getImages(prestation: Prestation) {
  return Array.from(
    { length: prestation.nombreImages },
    (_, index) =>
      `/prestations/${prestation.dossier}/${index + 1}.jpeg`
  );
}

export default function AdminPrestationsPage() {
  const [prestations, setPrestations] = useState(
    prestationsInitiales
  );

  const [recherche, setRecherche] = useState("");

  const [filtre, setFiltre] = useState<
    "toutes" | "actives" | "desactivees"
  >("toutes");

  const [imagesActuelles, setImagesActuelles] = useState<
    Record<number, number>
  >({});

  const [selected, setSelected] =
    useState<Prestation | null>(null);

  const [modal, setModal] = useState<
    "voir" | "modifier" | "ajouter" | null
  >(null);

  // Formulaire
  const [form, setForm] = useState<Prestation>(
    prestationsInitiales[0]
  );

  /* =====================================================
     DÉFILEMENT AUTOMATIQUE
  ===================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setImagesActuelles((ancien) => {
        const nouveau = { ...ancien };

        prestations.forEach((prestation) => {
          if (prestation.nombreImages > 1) {
            nouveau[prestation.id] =
              ((ancien[prestation.id] || 0) + 1) %
              prestation.nombreImages;
          }
        });

        return nouveau;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [prestations]);

  /* =====================================================
     FILTRE
  ===================================================== */

  const prestationsFiltrees = prestations.filter(
    (prestation) => {
      const rechercheOK = prestation.nom
        .toLowerCase()
        .includes(recherche.toLowerCase());

      if (!rechercheOK) return false;

      if (filtre === "actives") {
        return prestation.active;
      }

      if (filtre === "desactivees") {
        return !prestation.active;
      }

      return true;
    }
  );

  const nombreActives = prestations.filter(
    (p) => p.active
  ).length;

  const nombreDesactivees = prestations.filter(
    (p) => !p.active
  ).length;

  /* =====================================================
     STATUT
  ===================================================== */

  function changerStatut(id: number) {
    setPrestations((ancienne) =>
      ancienne.map((prestation) =>
        prestation.id === id
          ? {
              ...prestation,
              active: !prestation.active,
            }
          : prestation
      )
    );
  }

  /* =====================================================
     VOIR
  ===================================================== */

  function voirPrestation(prestation: Prestation) {
    setSelected(prestation);
    setModal("voir");
  }

  /* =====================================================
     MODIFIER
  ===================================================== */

  function modifierPrestation(prestation: Prestation) {
    setForm({ ...prestation });
    setSelected(prestation);
    setModal("modifier");
  }

  /* =====================================================
     SUPPRIMER
  ===================================================== */

  function supprimerPrestation(id: number) {
    const prestation = prestations.find(
      (p) => p.id === id
    );

    if (!prestation) return;

    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer "${prestation.nom}" ?`
    );

    if (!confirmation) return;

    setPrestations((ancienne) =>
      ancienne.filter((p) => p.id !== id)
    );
  }

  /* =====================================================
     ENREGISTRER MODIFICATION
  ===================================================== */

  function enregistrerModification() {
    setPrestations((ancienne) =>
      ancienne.map((prestation) =>
        prestation.id === form.id ? form : prestation
      )
    );

    setSelected(form);
    setModal("voir");
  }

  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#faf8fb] px-4 py-6 text-[#2d2131] dark:bg-[#151116] dark:text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b638f]">
              PRESTY · Administration
            </p>

            <h1 className="text-3xl font-semibold">
              Prestations
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gérez les prestations proposées par la coiffeuse.
            </p>
          </div>

        </div>

        {/* ================= STATISTIQUES ================= */}

        <div className="mb-6 grid grid-cols-3 gap-3">

          <div className="rounded-2xl border border-[#eadfea] bg-white p-4 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">
            <p className="text-xs text-gray-500">
              Total
            </p>

            <p className="mt-1 text-2xl font-bold">
              {prestations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfea] bg-white p-4 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">
            <p className="text-xs text-gray-500">
              Actives
            </p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {nombreActives}
            </p>
          </div>

          <div className="rounded-2xl border border-[#eadfea] bg-white p-4 shadow-sm dark:border-[#332a34] dark:bg-[#211b22]">
            <p className="text-xs text-gray-500">
              Bientôt
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-500">
              {nombreDesactivees}
            </p>
          </div>

        </div>

        {/* ================= RECHERCHE ================= */}

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#eadfea] bg-white p-3 shadow-sm dark:border-[#332a34] dark:bg-[#211b22] sm:flex-row">

          <input
            type="text"
            value={recherche}
            onChange={(e) =>
              setRecherche(e.target.value)
            }
            placeholder="Rechercher une prestation..."
            className="flex-1 rounded-xl border border-[#e4d9e6] bg-[#fcfafc] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
          />

          <div className="flex gap-2">

            <button
              onClick={() => setFiltre("toutes")}
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${
                filtre === "toutes"
                  ? "bg-[#563065] text-white"
                  : "bg-[#f3edf4] dark:bg-[#302630]"
              }`}
            >
              Toutes
            </button>

            <button
              onClick={() => setFiltre("actives")}
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${
                filtre === "actives"
                  ? "bg-[#563065] text-white"
                  : "bg-[#f3edf4] dark:bg-[#302630]"
              }`}
            >
              Actives
            </button>

            <button
              onClick={() => setFiltre("desactivees")}
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold ${
                filtre === "desactivees"
                  ? "bg-[#563065] text-white"
                  : "bg-[#f3edf4] dark:bg-[#302630]"
              }`}
            >
              Bientôt
            </button>

          </div>
        </div>

        {/* ================= CARTES ================= */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {prestationsFiltrees.map((prestation) => {

            const images = getImages(prestation);

            const imageIndex =
              imagesActuelles[prestation.id] || 0;

            return (
              <article
                key={prestation.id}
                className="overflow-hidden rounded-[24px] border border-[#eadfea] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#332a34] dark:bg-[#211b22]"
              >

                {/* IMAGE PLUS COMPACTE */}

                <div className="relative h-52 overflow-hidden">

                  <Image
                    src={images[imageIndex]}
                    alt={prestation.nom}
                    fill
                    className="object-cover transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* STATUT */}

                  <div className="absolute left-3 top-3">

                    {prestation.active ? (
                      <span className="rounded-full bg-green-500/90 px-2.5 py-1 text-[11px] font-semibold text-white">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        Bientôt disponible
                      </span>
                    )}

                  </div>

                  {/* PHOTO X/6 */}

                  {prestation.nombreImages > 1 && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                      {imageIndex + 1}/{prestation.nombreImages}
                    </span>
                  )}

                  {/* TITRE + PRIX */}

                  <div className="absolute bottom-3 left-4 right-4">

                    <h2 className="text-lg font-semibold text-white">
                      {prestation.nom}
                    </h2>

                    <p className="mt-0.5 text-sm font-medium text-white">
                      {formatPrix(prestation.prix)}
                    </p>

                  </div>

                  {/* POINTS */}

                  {prestation.nombreImages > 1 && (
                    <div className="absolute bottom-4 right-4 flex gap-1">

                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setImagesActuelles(
                              (ancienne) => ({
                                ...ancienne,
                                [prestation.id]:
                                  index,
                              })
                            )
                          }
                          className={`h-1.5 rounded-full transition-all ${
                            index === imageIndex
                              ? "w-4 bg-white"
                              : "w-1.5 bg-white/50"
                          }`}
                        />
                      ))}

                    </div>
                  )}

                </div>

                {/* INFORMATIONS */}

                <div className="p-4">

                  <p className="line-clamp-2 min-h-[40px] text-xs leading-5 text-gray-500 dark:text-gray-400">
                    {prestation.description}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <div className="rounded-xl bg-[#f8f3f9] p-2.5 dark:bg-[#2a222c]">
                      <p className="text-[10px] text-gray-500">
                        Durée
                      </p>

                      <p className="mt-0.5 text-xs font-semibold">
                        {prestation.duree}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#f8f3f9] p-2.5 dark:bg-[#2a222c]">
                      <p className="text-[10px] text-gray-500">
                        Horaires
                      </p>

                      <p className="mt-0.5 text-xs font-semibold">
                        {prestation.horaires}
                      </p>
                    </div>

                  </div>

                  <div className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
                    {prestation.domicile
                      ? "🏠 Disponible à domicile"
                      : "🏢 Salon uniquement"}
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-4 grid grid-cols-3 gap-2">

                    <button
                      onClick={() =>
                        voirPrestation(prestation)
                      }
                      className="rounded-xl border border-[#e5dbe7] py-2 text-xs font-semibold transition hover:bg-[#f8f3f9] dark:border-[#403542] dark:hover:bg-[#302630]"
                    >
                      Voir
                    </button>

                    <button
                      onClick={() =>
                        modifierPrestation(prestation)
                      }
                      className="rounded-xl bg-[#f0e5f2] py-2 text-xs font-semibold text-[#563065] transition hover:bg-[#e6d8e9] dark:bg-[#38293c] dark:text-[#e2c8e7]"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() =>
                        supprimerPrestation(prestation.id)
                      }
                      className="rounded-xl bg-red-50 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100 dark:bg-red-950/20"
                    >
                      Supprimer
                    </button>

                  </div>

                  {/* ACTIVATION */}

                  <button
                    onClick={() =>
                      changerStatut(prestation.id)
                    }
                    className="mt-2 w-full rounded-xl py-2 text-[11px] font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-[#302630]"
                  >
                    {prestation.active
                      ? "Désactiver cette prestation"
                      : "Activer cette prestation"}
                  </button>

                </div>
              </article>
            );
          })}

        </div>

        {/* ================= MODALE VOIR ================= */}

        {modal === "voir" && selected && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl dark:bg-[#211b22]">

              {/* IMAGE COMPACTE */}

              <div className="relative h-56">

                <Image
                  src={
                    getImages(selected)[
                      imagesActuelles[selected.id] || 0
                    ]
                  }
                  alt={selected.nom}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                  onClick={() => setModal(null)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
                >
                  ×
                </button>

                <div className="absolute bottom-4 left-5">

                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
                      selected.active
                        ? "bg-green-500"
                        : "bg-black/60"
                    }`}
                  >
                    {selected.active
                      ? "Active"
                      : "Bientôt disponible"}
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {selected.nom}
                  </h2>

                </div>
              </div>

              {/* CONTENU */}

              <div className="p-5">

                <div className="mb-4 flex items-center justify-between">

                  <div>
                    <p className="text-[11px] text-gray-500">
                      Prix
                    </p>

                    <p className="text-lg font-bold text-[#563065]">
                      {formatPrix(selected.prix)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] text-gray-500">
                      Durée
                    </p>

                    <p className="text-sm font-semibold">
                      {selected.duree}
                    </p>
                  </div>

                </div>

                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {selected.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">

                  <div className="rounded-xl bg-[#f8f3f9] p-3 dark:bg-[#2a222c]">
                    <p className="text-[10px] text-gray-500">
                      Horaires
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {selected.horaires}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8f3f9] p-3 dark:bg-[#2a222c]">
                    <p className="text-[10px] text-gray-500">
                      À domicile
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {selected.domicile
                        ? "Oui"
                        : "Non"}
                    </p>
                  </div>

                </div>

                <div className="mt-5">

                  <h3 className="text-sm font-semibold">
                    La prestation comprend
                  </h3>

                  <div className="mt-2 space-y-1.5">

                    {selected.inclus.map((element) => (
                      <div
                        key={element}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-[#563065]">
                          ✓
                        </span>

                        {element}
                      </div>
                    ))}

                  </div>

                </div>

                {!selected.active && (
                  <div className="mt-4 rounded-xl bg-gray-100 p-3 text-center text-xs font-medium text-gray-600 dark:bg-[#302630] dark:text-gray-300">
                    Cette prestation est actuellement
                    indisponible à la réservation.
                  </div>
                )}

                <div className="mt-5 flex gap-2">

                  <button
                    onClick={() =>
                      modifierPrestation(selected)
                    }
                    className="flex-1 rounded-xl bg-[#563065] py-3 text-xs font-semibold text-white"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 rounded-xl border border-[#e5dbe7] py-3 text-xs font-semibold dark:border-[#403542]"
                  >
                    Fermer
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= MODALE MODIFICATION ================= */}

        {modal === "modifier" && selected && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl dark:bg-[#211b22]">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8b638f]">
                    PRESTY
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Modifier la prestation
                  </h2>
                </div>

                <button
                  onClick={() => setModal(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edf4] dark:bg-[#302630]"
                >
                  ×
                </button>

              </div>

              <div className="space-y-4">

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Nom
                  </label>

                  <input
                    value={form.nom}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nom: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Prix
                  </label>

                  <input
                    type="number"
                    value={form.prix}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        prix: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Durée
                  </label>

                  <input
                    value={form.duree}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duree: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#e4d9e6] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Horaires
                  </label>

                  <input
                    value={form.horaires}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        horaires: e.target.value,
                      })
                    }
                    placeholder="Ex : 09h00 - 18h00"
                    className="w-full rounded-xl border border-[#e4d9e6] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full resize-none rounded-xl border border-[#e4d9e6] px-4 py-2.5 text-sm outline-none focus:border-[#563065] dark:border-[#403542] dark:bg-[#19151b]"
                  />
                </div>

                <label className="flex items-center gap-3 rounded-xl bg-[#f8f3f9] p-3 dark:bg-[#2a222c]">

                  <input
                    type="checkbox"
                    checked={form.domicile}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        domicile: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#563065]"
                  />

                  <span className="text-xs font-medium">
                    Disponible à domicile
                  </span>

                </label>

              </div>

              <div className="mt-6 flex gap-2">

                <button
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-xl border border-[#e5dbe7] py-3 text-xs font-semibold dark:border-[#403542]"
                >
                  Annuler
                </button>

                <button
                  onClick={enregistrerModification}
                  className="flex-1 rounded-xl bg-[#563065] py-3 text-xs font-semibold text-white"
                >
                  Enregistrer
                </button>

              </div>

            </div>
          </div>
        )}
      </div>
    </main>
  );
}