"use client";

import Link from "next/link";

export default function AdminAccessButton() {
  return (
    <Link
      href="/admin/login"
      className="inline-flex items-center gap-2 rounded-full bg-[#563065] px-5 py-3 text-sm font-medium text-white"
    >
      🔒 Espace professionnel
    </Link>
  );
}