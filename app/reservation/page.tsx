"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

function CategoryCard({
  category,
  fr,
}: {
  category: (typeof prestyCategories)[number];
  fr: boolean;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (category.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        previous === category.images.length - 1 ? 0 : previous + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [category.images.length]);

  const title = fr ? category.titleFr : category.titleEn;
  const description = fr
    ? category.descriptionFr
    : category.descriptionEn;

  const cardContent = (
    <>
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden sm:h-72">
        <Image
          src={category.images[currentImage]}
          alt={`${title} - photo ${currentImage + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badge indisponible */}
        {!category.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full border border-white/40 bg-black/50 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-md">
              {fr ? "Bientôt disponible" : "Coming soon"}
            </span>
          </div>
        )}

        {/* Compteur de photos */}
        {category.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {category.images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentImage
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* INFORMATIONS */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-medium tracking-tight">
            {title}
          </h2>

          {category.available && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--presty-muted)]">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--presty-border)] pt-4">
          {category.available ? (
            <>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--presty-muted)]">
                  {fr ? "À partir de" : "From"}
                </p>

                <p className="mt-1 font-medium">
                  {category.price.toLocaleString("fr-FR")} FCFA
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--presty-muted)]">
                  {fr ? "Durée" : "Duration"}
                </p>

                <p className="mt-1 font-medium">
                  {category.duration}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm font-medium text-[var(--presty-purple)]">
              {fr
                ? "Service prochainement disponible"
                : "Service coming soon"}
            </p>
          )}
        </div>

        {category.available && (
          <div className="mt-5 text-sm font-medium text-[var(--presty-purple)] transition-transform duration-300 group-hover:translate-x-1">
            {fr ? "Voir les détails" : "View details"} →
          </div>
        )}
      </div>
    </>
  );

  if (!category.available) {
    return (
      <div className="group overflow-hidden rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] opacity-80">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/reservation/${category.id}`}
      className="group block overflow-hidden rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      {cardContent}
    </Link>
  );
}

export default function ReservationPage() {
  const { language } = usePresty();
  const fr = language === "fr";

  const t = fr
    ? {
        eyebrow: "Réservation",
        title: "Choisissez votre prestation",
        text: "Découvrez nos différentes prestations, consultez les détails de chaque coiffure et choisissez celle qui vous correspond.",
        available: "Prestations disponibles",
        unavailable: "Bientôt disponibles",
      }
    : {
        eyebrow: "Booking",
        title: "Choose your service",
        text: "Discover our different services, explore each hairstyle and choose the one that suits you.",
        available: "Available services",
        unavailable: "Coming soon",
      };

  const availableCategories = prestyCategories.filter(
    (category) => category.available
  );

  const unavailableCategories = prestyCategories.filter(
    (category) => !category.available
  );

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />

      <section className="px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1300px]">

          {/* EN-TÊTE */}
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--presty-purple)]">
              {t.eyebrow}
            </p>

            <h1 className="mt-5 text-5xl font-light tracking-tight md:text-7xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-[700px] text-sm leading-7 text-[var(--presty-muted)]">
              {t.text}
            </p>
          </div>

          {/* PRESTATIONS DISPONIBLES */}
          <div className="mt-16">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-2xl font-light md:text-3xl">
                {t.available}
              </h2>

              <span className="text-xs uppercase tracking-[0.2em] text-[var(--presty-muted)]">
                {availableCategories.length}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  fr={fr}
                />
              ))}
            </div>
          </div>

          {/* SERVICES BIENTÔT DISPONIBLES */}
          {unavailableCategories.length > 0 && (
            <div className="mt-20">
              <div className="mb-7">
                <h2 className="text-2xl font-light md:text-3xl">
                  {t.unavailable}
                </h2>

                <p className="mt-2 text-sm text-[var(--presty-muted)]">
                  {fr
                    ? "Ces prestations seront prochainement proposées par Presty."
                    : "These services will soon be available at Presty."}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {unavailableCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    fr={fr}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}