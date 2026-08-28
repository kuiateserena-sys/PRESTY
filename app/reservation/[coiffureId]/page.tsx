"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

export default function DetailPage() {
  const { language } = usePresty();
  const params = useParams<{ coiffureId: string }>();
  const fr = language === "fr";
  const c = prestyCategories.find((item) => item.id === params.coiffureId);
  const [selectedImage, setSelectedImage] = useState("");

  if (!c) return notFound();

  const activeImage = selectedImage || c.images[0];

  const t = fr
    ? {
        back: "Retour aux prestations",
        ey: "Détail de la prestation",
        price: "Prix",
        duration: "Durée",
        included: "Ce qui est inclus",
        items: ["Lavage", "Préparation", "Réalisation de la coiffure", "Finitions"],
        continue: "Continuer",
        note: "Choisissez votre date, votre créneau et votre lieu à l'étape suivante.",
      }
    : {
        back: "Back to services",
        ey: "Service details",
        price: "Price",
        duration: "Duration",
        included: "What's included",
        items: ["Wash", "Preparation", "Hairstyle", "Finishing"],
        continue: "Continue",
        note: "Choose your date, time slot and location at the next step.",
      };

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />

      <section className="px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1300px]">
          <Link href="/prestations" className="text-sm text-[var(--presty-purple)] hover:underline">
            ← {t.back}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="presty-float relative h-[560px] overflow-hidden rounded-[2.5rem] bg-[var(--presty-soft)] shadow-2xl">
                <Image
                  src={activeImage}
                  alt={fr ? c.titleFr : c.titleEn}
                  fill
                  sizes="650px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-3 text-xs font-medium text-[#211d20]">
                  PRESTY · {fr ? c.titleFr : c.titleEn}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2">
                {c.images.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 overflow-hidden rounded-xl border-2 ${
                      activeImage === img ? "border-[var(--presty-purple)]" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="100px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">{t.ey}</p>
              <h1 className="mt-4 text-5xl font-light tracking-[-.05em] md:text-6xl">
                {fr ? c.titleFr : c.titleEn}
              </h1>
              <p className="mt-5 text-sm leading-8 text-[var(--presty-muted)]">
                {fr ? c.descriptionFr : c.descriptionEn}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="presty-float rounded-2xl border border-[var(--presty-border)] bg-[var(--presty-surface)] p-5">
                  <p className="label">{t.price}</p>
                  <p className="mt-3 text-xl font-medium">{c.price.toLocaleString("fr-FR")} FCFA</p>
                </div>
                <div className="presty-float rounded-2xl border border-[var(--presty-border)] bg-[var(--presty-surface)] p-5" style={{ animationDelay: ".35s" }}>
                  <p className="label">{t.duration}</p>
                  <p className="mt-3 text-xl font-medium">{c.duration}</p>
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7">
                <p className="label">{t.included}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {t.items.map((item) => (
                    <p key={item} className="text-sm">
                      ✓ {item}
                    </p>
                  ))}
                </div>
              </div>

              <Link
                href={`/reservation/${c.id}/booking`}
                className="mt-8 flex w-full justify-center rounded-full bg-[var(--presty-purple)] px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-1"
              >
                {t.continue} →
              </Link>
              <p className="mt-4 text-xs leading-6 text-[var(--presty-muted)]">{t.note}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
