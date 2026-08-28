"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

type Booking = {
  reservationCode?: string;
  date: string;
  start?: string;
  time?: string;
  duration: number;
  serviceId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location: "salon" | "home";
  address?: string;
  total?: number;
  amount?: number;
  status?: string;
};

function readBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem("presty-bookings") || "[]") as Booking[];
  } catch {
    return [];
  }
}

export default function RetrieveBookingPage() {
  const { language } = usePresty();
  const fr = language === "fr";
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [message, setMessage] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);

  const t = fr
    ? {
        ey: "Suivi de réservation",
        title: "Retrouvez votre rendez-vous.",
        text: "Aucun compte n'est nécessaire. Utilisez votre numéro de réservation et le téléphone renseigné lors de la réservation.",
        code: "Numéro de réservation",
        codePh: "Ex. PRESTY-8F42K",
        phone: "Téléphone",
        phonePh: "Le numéro utilisé lors de la réservation",
        find: "Voir ma réservation",
        service: "Prestation",
        date: "Date",
        time: "Créneau",
        place: "Lieu",
        address: "Adresse",
        total: "Total",
        status: "Statut",
        confirmed: "Confirmée",
        cancelled: "Annulée",
        salon: "Au salon",
        home: "À domicile",
        cancel: "Annuler mon rendez-vous",
        cancelTitle: "Annuler ce rendez-vous ?",
        cancelText: "Cette action libérera le créneau afin qu'il puisse être réservé à nouveau.",
        back: "Retour",
        confirmCancel: "Confirmer l'annulation",
        no: "Conserver le rendez-vous",
        notFound: "Aucune réservation ne correspond à ces informations.",
        done: "Votre rendez-vous a été annulé. Le créneau est maintenant libéré.",
        unavailable: "Cette réservation est déjà annulée.",
      }
    : {
        ey: "Booking tracking",
        title: "Find your appointment.",
        text: "No account is required. Use your reservation number and the phone number entered during booking.",
        code: "Reservation number",
        codePh: "e.g. PRESTY-8F42K",
        phone: "Phone",
        phonePh: "The phone number used for booking",
        find: "View my booking",
        service: "Service",
        date: "Date",
        time: "Time slot",
        place: "Location",
        address: "Address",
        total: "Total",
        status: "Status",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        salon: "At the salon",
        home: "At home",
        cancel: "Cancel my appointment",
        cancelTitle: "Cancel this appointment?",
        cancelText: "This will release the slot so it can be booked again.",
        back: "Back",
        confirmCancel: "Confirm cancellation",
        no: "Keep appointment",
        notFound: "No booking matches these details.",
        done: "Your appointment has been cancelled. The slot is now available again.",
        unavailable: "This booking is already cancelled.",
      };

  const service = useMemo(() => booking ? prestyCategories.find((c) => c.id === booking.serviceId) : null, [booking]);

  const findBooking = () => {
    setMessage("");
    setBooking(null);
    const normalizedCode = code.trim().toUpperCase();
    const normalizedPhone = phone.replace(/\s/g, "");
    const found = readBookings().find((item) =>
      item.reservationCode?.toUpperCase() === normalizedCode &&
      (item.phone || "").replace(/\s/g, "") === normalizedPhone
    );
    if (!found) {
      setMessage(t.notFound);
      return;
    }
    setBooking(found);
  };

  const cancelBooking = () => {
    if (!booking) return;
    const all = readBookings();
    const updated = all.map((item) =>
      item.reservationCode === booking.reservationCode ? { ...item, status: "CANCELLED" } : item
    );
    localStorage.setItem("presty-bookings", JSON.stringify(updated));
    localStorage.setItem("presty-last-booking", JSON.stringify({ ...booking, status: "CANCELLED" }));
    setBooking({ ...booking, status: "CANCELLED" });
    setCancelOpen(false);
    setMessage(t.done);
  };

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />
      <section className="px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1050px]">
          <Link href="/" className="text-sm text-[var(--presty-purple)] hover:underline">← {t.back}</Link>
          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">{t.ey}</p>
            <h1 className="mt-4 text-5xl font-light tracking-[-.05em] md:text-7xl">{t.title}</h1>
            <p className="mx-auto mt-5 max-w-[700px] text-sm leading-8 text-[var(--presty-muted)]">{t.text}</p>
          </div>

          <div className="mx-auto mt-12 max-w-[700px] rounded-[2.2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7 shadow-xl md:p-9">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="text-sm">
                <span className="label">{t.code}</span>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t.codePh} className="mt-3 w-full rounded-2xl border border-[var(--presty-border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--presty-purple)]" />
              </label>
              <label className="text-sm">
                <span className="label">{t.phone}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.phonePh} className="mt-3 w-full rounded-2xl border border-[var(--presty-border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--presty-purple)]" />
              </label>
            </div>
            <button type="button" onClick={findBooking} className="mt-7 w-full rounded-full bg-[var(--presty-purple)] px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-1">{t.find} →</button>
            {message && <p className="mt-5 rounded-2xl bg-[var(--presty-soft)] p-4 text-sm leading-6 text-[var(--presty-muted)]">{message}</p>}
          </div>

          {booking && service && (
            <div className="presty-float mt-10 overflow-hidden rounded-[2.5rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] shadow-2xl">
              <div className="grid lg:grid-cols-[.7fr_1.3fr]">
                <div className="relative min-h-[330px] bg-[var(--presty-soft)]">
                  <Image src={service.images[0]} alt={fr ? service.titleFr : service.titleEn} fill sizes="500px" className="object-cover" />
                </div>
                <div className="p-7 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="label">{t.code}</p>
                      <p className="mt-2 text-xl font-semibold tracking-[.12em] text-[var(--presty-purple)]">{booking.reservationCode}</p>
                    </div>
                    <span className={`rounded-full px-4 py-2 text-xs font-medium ${booking.status === "CANCELLED" ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}`}>{booking.status === "CANCELLED" ? t.cancelled : t.confirmed}</span>
                  </div>
                  <h2 className="mt-7 text-3xl font-light">{fr ? service.titleFr : service.titleEn}</h2>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2 text-sm">
                    <div className="rounded-2xl bg-[var(--presty-soft)] p-4"><span className="label">{t.date}</span><p className="mt-2">{booking.date}</p></div>
                    <div className="rounded-2xl bg-[var(--presty-soft)] p-4"><span className="label">{t.time}</span><p className="mt-2">{booking.time || booking.start}</p></div>
                    <div className="rounded-2xl bg-[var(--presty-soft)] p-4"><span className="label">{t.place}</span><p className="mt-2">{booking.location === "home" ? t.home : t.salon}</p></div>
                    <div className="rounded-2xl bg-[var(--presty-soft)] p-4"><span className="label">{t.total}</span><p className="mt-2 font-medium">{(booking.total || 0).toLocaleString("fr-FR")} FCFA</p></div>
                  </div>
                  {booking.address && <div className="mt-4 rounded-2xl bg-[var(--presty-soft)] p-4 text-sm"><span className="label">{t.address}</span><p className="mt-2">{booking.address}</p></div>}

                  {booking.status !== "CANCELLED" && (
                    <button type="button" onClick={() => setCancelOpen(true)} className="mt-8 rounded-full border border-red-500/20 bg-red-500/5 px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/10">{t.cancel}</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {cancelOpen && booking && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7 shadow-2xl">
            <h2 className="text-2xl font-medium">{t.cancelTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--presty-muted)]">{t.cancelText}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setCancelOpen(false)} className="rounded-full border border-[var(--presty-border)] px-5 py-3 text-sm">{t.no}</button>
              <button type="button" onClick={cancelBooking} className="rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white">{t.confirmCancel}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
