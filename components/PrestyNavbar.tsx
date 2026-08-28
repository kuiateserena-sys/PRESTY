"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PrestyControls from "./PrestyControls";
import { usePresty } from "./PrestyThemeProvider";

export default function PrestyNavbar() {
  const { language } = usePresty();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const fr = language === "fr";
  const t = fr ? { home: "Accueil", services: "Prestations", approach: "Notre approche", homeService: "À domicile", retrieve: "Ma réservation", gallery: "Galerie", contact: "Contact", book: "Réserver", menu: "Menu" } : { home: "Home", services: "Services", approach: "Our approach", homeService: "Home service", retrieve: "My booking", gallery: "Gallery", contact: "Contact", book: "Book now", menu: "Menu" };
  const links = [
    ["/", t.home, "home"],
    ["/prestations", t.services, "services"],
    ["/#approche", t.approach, "approach"],
    ["/#domicile", t.homeService, "homeService"],
    ["/reservation/retrouver", t.retrieve, "retrieve"],
    ["/#galerie", t.gallery, "gallery"],
    ["/#contact", t.contact, "contact"],
  ] as const;

  const go = (href: string) => {
    setOpen(false);
    if (href === "/" && pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="mx-auto flex max-w-[1420px] items-center justify-between rounded-full border border-[var(--presty-border)] bg-[var(--presty-nav)] px-5 py-3 shadow-[0_14px_45px_rgba(55,20,70,.08)] backdrop-blur-xl md:px-6 md:py-4">
        <Link href="/" onClick={() => go("/")} className="presty-logo text-xl font-semibold tracking-[.28em] text-[var(--presty-text)]">PRESTY</Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([href, label, key]) => {
            const active = (key === "home" && pathname === "/") || (key === "services" && pathname.startsWith("/prestations")) || (key === "homeService" && pathname.startsWith("/services-domicile")) || (key === "retrieve" && pathname.startsWith("/reservation/retrouver"));
            return <Link key={key} href={href} onClick={() => go(href)} className={`nav-link relative px-1 py-1 text-sm text-[var(--presty-text)] ${active ? "active" : ""}`}>{label}</Link>;
          })}
        </div>
        <div className="hidden items-center gap-2 md:flex"><PrestyControls /><Link href="/prestations" className="rounded-full bg-[var(--presty-purple)] px-5 py-2.5 text-sm text-white shadow-lg transition hover:-translate-y-0.5">{t.book}</Link></div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--presty-border)] text-[var(--presty-text)] md:hidden" aria-label={t.menu}>{open ? "×" : "☰"}</button>
      </nav>
      {open && <div className="mx-4 mt-2 rounded-3xl border border-[var(--presty-border)] bg-[var(--presty-nav)] p-5 shadow-xl backdrop-blur-xl md:hidden"><div className="grid gap-2">{links.map(([href, label, key]) => <Link key={key} href={href} onClick={() => go(href)} className="rounded-2xl px-4 py-3 text-sm text-[var(--presty-text)] hover:bg-[var(--presty-soft)]">{label}</Link>)}<div className="flex items-center justify-between border-t border-[var(--presty-border)] pt-4"><PrestyControls /><Link href="/prestations" onClick={() => setOpen(false)} className="rounded-full bg-[var(--presty-purple)] px-4 py-2 text-sm text-white">{t.book}</Link></div></div></div>}
    </header>
  );
}
