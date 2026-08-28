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
};

const makeImages = (slug: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/images/coiffures/${slug}/${index + 1}.jpeg`);

export const prestyCategories: PrestyCategory[] = [
  { id: "nattes-natureles", sourceName: "Nattes Natureles", titleFr: "Nattes Natureles", titleEn: "Natural Braids", descriptionFr: "Des nattes réalisées avec précision pour un résultat propre et élégant.", descriptionEn: "Carefully crafted braids for a neat and elegant result.", price: 5000, duration: "2h", images: makeImages("nattes-natureles", 6) },
  { id: "rastas-americains", sourceName: "Rastas Americains", titleFr: "Rastas Americains", titleEn: "American Rastas", descriptionFr: "Un style structuré et élégant, travaillé avec soin.", descriptionEn: "A structured and elegant style, carefully crafted.", price: 10000, duration: "3h", images: makeImages("rastas-americains", 6) },
  { id: "rasta-americains-boucles", sourceName: "Rasta Americais & Boucles", titleFr: "Rasta Americais & Boucles", titleEn: "American Rastas & Curls", descriptionFr: "Une combinaison de rastas et de boucles pour un rendu unique.", descriptionEn: "A combination of rastas and curls for a unique finish.", price: 10000, duration: "3h 30", images: makeImages("rasta-americains-boucles", 6) },
  { id: "passe-meche-americains", sourceName: "Passe-mèche Americains", titleFr: "Passe-mèche Americains", titleEn: "American Passe-mèche", descriptionFr: "Une réalisation élégante et soigneusement travaillée.", descriptionEn: "An elegant style, carefully crafted.", price: 10000, duration: "2h 30", images: makeImages("passe-meche-americains", 6) },
  { id: "passe-meche-americains-boucles", sourceName: "Passe-mèche Americains & boucles", titleFr: "Passe-mèche Americains & boucles", titleEn: "American Passe-mèche & Curls", descriptionFr: "Le passe-mèche associé aux boucles pour une finition raffinée.", descriptionEn: "Passe-mèche combined with curls for a refined finish.", price: 10000, duration: "3h", images: makeImages("passe-meche-americains-boucles", 6) },
  { id: "locks", sourceName: "Locks", titleFr: "Locks", titleEn: "Locks", descriptionFr: "Une coiffure authentique et personnalisée.", descriptionEn: "An authentic and personalized hairstyle.", price: 10000, duration: "3h", images: makeImages("locks", 6) },
  { id: "locks-boucles", sourceName: "Locks & Boucles", titleFr: "Locks & Boucles", titleEn: "Locks & Curls", descriptionFr: "Des locks sublimées par de belles boucles.", descriptionEn: "Locks enhanced with beautiful curls.", price: 10000, duration: "3h 30", images: makeImages("locks-boucles", 7) },
  { id: "lace-frontale", sourceName: "Lace Frontale", titleFr: "Lace Frontale", titleEn: "Lace Frontal", descriptionFr: "Une pose soignée pour un rendu naturel.", descriptionEn: "A carefully applied lace for a natural finish.", price: 10000, duration: "2h 30", images: makeImages("lace-frontale", 6) },
  { id: "lace-frontale-chignon", sourceName: "Lace Frontale & chignon", titleFr: "Lace Frontale & chignon", titleEn: "Lace Frontal & Bun", descriptionFr: "Une lace frontale accompagnée d'un chignon élégant.", descriptionEn: "A lace frontal paired with an elegant bun.", price: 10000, duration: "3h", images: makeImages("lace-frontale-chignon", 6) },
  { id: "french-curls", sourceName: "French Curls", titleFr: "French Curls", titleEn: "French Curls", descriptionFr: "Des boucles élégantes pour une finition pleine de caractère.", descriptionEn: "Elegant curls with a distinctive finish.", price: 10000, duration: "2h", images: makeImages("french-curls", 6) },
];

export const prestyPhotos = prestyCategories.flatMap((category) => category.images);
