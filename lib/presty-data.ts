export type PrestyCategory = {
  id: string;
  sourceName: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  price: number;
  duration: string;
  images: string[];
  available: boolean;
};

const makeImages = (slug: string, count: number) =>
  Array.from(
    { length: count },
    (_, index) => `/prestations/${slug}/${index + 1}.jpeg`
  );

export const prestyCategories: PrestyCategory[] = [
  {
    id: "lace-frontale",
    sourceName: "Lace Frontale",
    titleFr: "Lace Frontale",
    titleEn: "Lace Frontal",
    descriptionFr:
      "Une pose soignée pour un rendu naturel, élégant et parfaitement travaillé.",
    descriptionEn:
      "A carefully applied lace frontal for a natural, elegant and refined finish.",
    price: 10000,
    duration: "2h 30",
    images: makeImages("lace-frontale", 6),
    available: true,
  },

  {
    id: "lace-frontale-chignon",
    sourceName: "Lace Frontale & Chignon",
    titleFr: "Lace Frontale & Chignon",
    titleEn: "Lace Frontal & Bun",
    descriptionFr:
      "Une lace frontale sublimée par un chignon élégant et soigneusement réalisé.",
    descriptionEn:
      "A lace frontal enhanced with an elegant and carefully styled bun.",
    price: 10000,
    duration: "3h",
    images: makeImages("lace-frontale-chignon", 6),
    available: true,
  },

  {
    id: "locks",
    sourceName: "Locks",
    titleFr: "Locks",
    titleEn: "Locks",
    descriptionFr:
      "Une coiffure authentique et personnalisée, réalisée avec soin.",
    descriptionEn:
      "An authentic and personalized hairstyle, carefully crafted.",
    price: 10000,
    duration: "3h",
    images: makeImages("locks", 6),
    available: true,
  },

  {
    id: "locks-boucles",
    sourceName: "Locks & Boucles",
    titleFr: "Locks & Boucles",
    titleEn: "Locks & Curls",
    descriptionFr:
      "Des locks sublimées par de belles boucles pour une finition élégante.",
    descriptionEn:
      "Locks enhanced with beautiful curls for an elegant finish.",
    price: 10000,
    duration: "3h 30",
    images: makeImages("locks-boucles", 6),
    available: true,
  },

  {
    id: "nattes-naturelles",
    sourceName: "Nattes Naturelles",
    titleFr: "Nattes Naturelles",
    titleEn: "Natural Braids",
    descriptionFr:
      "Des nattes réalisées avec précision pour un résultat propre et élégant.",
    descriptionEn:
      "Carefully crafted natural braids for a neat and elegant result.",
    price: 5000,
    duration: "2h",
    images: makeImages("nattes-naturelles", 6),
    available: true,
  },

  {
    id: "passe-meche-americains",
    sourceName: "Passe-mèche Américains",
    titleFr: "Passe-mèche Américains",
    titleEn: "American Passe-mèche",
    descriptionFr:
      "Une réalisation élégante et soigneusement travaillée.",
    descriptionEn:
      "An elegant style, carefully crafted.",
    price: 10000,
    duration: "2h 30",
    images: makeImages("passe-meche-americains", 6),
    available: true,
  },

  {
    id: "passe-meche-americains-boucles",
    sourceName: "Passe-mèche Américains & Boucles",
    titleFr: "Passe-mèche Américains & Boucles",
    titleEn: "American Passe-mèche & Curls",
    descriptionFr:
      "Le passe-mèche associé aux boucles pour une finition raffinée.",
    descriptionEn:
      "Passe-mèche combined with curls for a refined finish.",
    price: 10000,
    duration: "3h",
    images: makeImages(
      "passe-meche-americains-boucles",
      6
    ),
    available: true,
  },

  {
    id: "rasta-americains-boucles",
    sourceName: "Rasta Américains & Boucles",
    titleFr: "Rasta Américains & Boucles",
    titleEn: "American Rastas & Curls",
    descriptionFr:
      "Une combinaison de rastas et de boucles pour un rendu unique et élégant.",
    descriptionEn:
      "A combination of American rastas and curls for a unique and elegant finish.",
    price: 10000,
    duration: "3h 30",
    images: makeImages(
      "rasta-americains-boucles",
      6
    ),
    available: true,
  },

  {
    id: "rastas-americains",
    sourceName: "Rasta Américains",
    titleFr: "Rasta Américains",
    titleEn: "American Rastas",
    descriptionFr:
      "Un style structuré et élégant, travaillé avec soin.",
    descriptionEn:
      "A structured and elegant style, carefully crafted.",
    price: 10000,
    duration: "3h",
    images: makeImages(
      "rasta-americains",
      6
    ),
    available: true,
  },

  {
    id: "makeup",
    sourceName: "Make Up",
    titleFr: "Make Up",
    titleEn: "Make Up",
    descriptionFr:
      "Service de maquillage prochainement disponible chez Presty.",
    descriptionEn:
      "Make Up service coming soon at Presty.",
    price: 0,
    duration: "Bientôt disponible",
    images: makeImages("makeUp", 1),
    available: false,
  },

  {
    id: "manicure",
    sourceName: "Manucure",
    titleFr: "Manucure",
    titleEn: "Manicure",
    descriptionFr:
      "Service de manucure prochainement disponible chez Presty.",
    descriptionEn:
      "Manicure service coming soon at Presty.",
    price: 0,
    duration: "Bientôt disponible",
    images: makeImages("manicure", 1),
    available: false,
  },

  {
    id: "pedicure",
    sourceName: "Pédicure",
    titleFr: "Pédicure",
    titleEn: "Pedicure",
    descriptionFr:
      "Service de pédicure prochainement disponible chez Presty.",
    descriptionEn:
      "Pedicure service coming soon at Presty.",
    price: 0,
    duration: "Bientôt disponible",
    images: makeImages("pédicure", 1),
    available: false,
  },
];

export const prestyPhotos = prestyCategories.flatMap(
  (category) => category.images
);