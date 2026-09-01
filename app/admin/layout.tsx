"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    href: "/admin",
    label: "Tableau de bord",
    icon: "dashboard",
  },
  {
    href: "/admin/rendez-vous",
    label: "Rendez-vous",
    icon: "calendar",
  },
  {
    href: "/admin/calendrier",
    label: "Calendrier",
    icon: "calendarDays",
  },
  {
    href: "/admin/prestations",
    label: "Prestations",
    icon: "scissors",
  },
  {
    href: "/admin/disponibilites",
    label: "Disponibilités",
    icon: "clock",
  },
  {
    href: "/admin/clientes",
    label: "Clients",
    icon: "users",
  },
  {
    href: "/admin/paiements",
    label: "Paiements",
    icon: "wallet",
  },
  {
    href: "/admin/services-domicile",
    label: "Services à domicile",
    icon: "home",
  },
  {
    href: "/admin/statistiques",
    label: "Statistiques",
    icon: "chart",
  },
];

function MenuIcon({ type }: { type: string }) {
  const common = "h-[18px] w-[18px] shrink-0";

  switch (type) {
    case "dashboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "calendar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 9h18" />
          <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
        </svg>
      );

    case "calendarDays":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 9h18" />
          <circle cx="8" cy="13" r="1" />
          <circle cx="12" cy="13" r="1" />
          <circle cx="16" cy="13" r="1" />
          <circle cx="8" cy="17" r="1" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      );

    case "scissors":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <circle cx="6" cy="7" r="3" />
          <circle cx="6" cy="17" r="3" />
          <path d="M8.5 8.5 20 20M8.5 15.5 20 4" />
        </svg>
      );

    case "clock":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8M18 14c1.8.7 3 2.4 3 4.5" />
        </svg>
      );

    case "wallet":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M4 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13" />
          <path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z" />
        </svg>
      );

    case "home":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v10h14V10M9 20v-6h6v6" />
        </svg>
      );

    case "chart":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={common}
        >
          <path d="M4 19V5M4 19h17" />
          <path d="m7 15 4-4 3 2 5-6" />
        </svg>
      );

    default:
      return null;
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#faf8f6] text-[#211d20] transition-colors dark:bg-[#151117] dark:text-white">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] border-r border-black/[0.07] bg-white dark:border-white/10 dark:bg-[#1b161e] lg:flex lg:flex-col">

        {/* LOGO */}

        <div className="flex h-[90px] items-center border-b border-black/[0.06] px-7 dark:border-white/10">

          <Link
            href="/admin"
            className="text-xl font-semibold tracking-[0.22em] text-[#563065] dark:text-[#d8b9df]"
          >
            PRESTY
          </Link>

        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-7">

          <p className="mb-4 px-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            Administration
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-[#563065] text-white shadow-lg shadow-[#563065]/20"
                      : "text-gray-500 hover:translate-x-1 hover:bg-[#563065]/[0.06] hover:text-[#563065] dark:text-white/60 dark:hover:bg-white/[0.05] dark:hover:text-white"
                  }`}
                >
                  <MenuIcon type={item.icon} />

                  <span>{item.label}</span>
                </Link>
              );
            })}

          </div>

        </nav>

        {/* BAS DE SIDEBAR */}

        <div className="border-t border-black/[0.06] p-4 dark:border-white/10">

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500 transition hover:bg-black/[0.04] hover:text-[#563065] dark:text-white/60 dark:hover:bg-white/[0.05] dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-[18px] w-[18px]"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>

            Retour au site
          </Link>

        </div>

      </aside>

      {/* =====================================================
          CONTENU PRINCIPAL
      ====================================================== */}

      <div className="lg:pl-[260px]">

        {/* HEADER */}

        <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-black/[0.06] bg-white/80 px-6 backdrop-blur-xl dark:border-white/10 dark:bg-[#151117]/80 md:px-10">

          <div>

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-gray-400">
              Espace administrateur
            </p>

            <p className="mt-1 text-sm font-medium">
              Gestion de PRESTY
            </p>

          </div>

          {/* =================================================
              ACTIONS DU HEADER
          ================================================== */}

          <div className="flex items-center gap-3">

            {/* APERÇU DU SITE */}

            <Link
              href="/"
              aria-label="Voir le site PRESTY"
              title="Voir le site PRESTY"
              className="group flex h-10 items-center gap-2 rounded-full border border-black/[0.07] bg-white px-4 text-xs font-medium text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#563065]/30 hover:text-[#563065] hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 dark:hover:border-white/20 dark:hover:text-white"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[17px] w-[17px] transition-transform duration-300 group-hover:scale-110"
              >
                <path d="m3 11 9-8 9 8" />
                <path d="M5 10v10h14V10" />
                <path d="M9 20v-6h6v6" />
              </svg>

              <span className="hidden sm:inline">
                Voir le site
              </span>

            </Link>

            {/* PROFIL ADMINISTRATEUR */}

            <div className="flex items-center gap-3 rounded-full border border-black/[0.07] bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.04]">

              {/* LOGO PRESTY */}

              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#563065]/20 bg-[#563065]/10 shadow-sm">

                <Image
                  src="/images/logo-presty.jpeg"
                  alt="Logo PRESTY"
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                />

              </div>

              {/* INFORMATIONS */}

              <div className="hidden sm:block">

                <p className="text-xs font-medium">
                  Administratrice
                </p>

                <p className="text-[9px] text-gray-400">
                  Gestionnaire PRESTY
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* PAGE */}

        <main className="min-h-[calc(100vh-76px)] px-5 py-7 md:px-10 md:py-10">
          {children}
        </main>

      </div>

    </div>
  );
}