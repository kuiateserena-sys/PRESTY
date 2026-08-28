"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

function durationToMinutes(value: string) {
  const hours = Number(value.match(/(\d+)h/)?.[1] || 0);
  const minutes = Number(value.match(/(\d+)\s*min/)?.[1] || 0);
  return hours * 60 + minutes;
}

function dateDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
}

function formatClock12(totalMinutes: number) {
  const h24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

function parseClock12(value: string) {
  const [clock, period] = value.split(" ");
  const [hours, minutes] = clock.split(":").map(Number);
  let h24 = hours;
  if (period === "PM" && hours !== 12) h24 += 12;
  if (period === "AM" && hours === 12) h24 = 0;
  return h24 * 60 + minutes;
}

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem("presty-bookings") || "[]") as {
      date: string;
      start: string;
      duration: number;
    }[];
  } catch {
    return [];
  }
}

export default function BookingPage() {
  const { language } = usePresty();
  const params = useParams<{ coiffureId: string }>();
  const router = useRouter();
  const fr = language === "fr";
  const c = prestyCategories.find((item) => item.id === params.coiffureId);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState<"salon" | "home">("salon");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!c) return notFound();

  const durationMinutes = durationToMinutes(c.duration);
  const minDate = new Date().toISOString().split("T")[0];

  const availableSlots = useMemo(() => {
    if (!date || dateDay(date) === 0) return [];

    const bookings = getBookings();
    const slots: string[] = [];

    // PRESTY works Monday to Saturday, 09:00 AM to 07:00 PM.
    for (let start = 9 * 60; start + durationMinutes <= 19 * 60; start += 30) {
      const end = start + durationMinutes;
      const occupied = bookings.some((booking) => {
        if (booking.date !== date) return false;
        const existingStart = parseClock12(booking.start);
        const existingEnd = existingStart + booking.duration;
        return start < existingEnd && existingStart < end;
      });

      if (!occupied) {
        slots.push(`${formatClock12(start)} → ${formatClock12(end)}`);
      }
    }

    return slots;
  }, [date, durationMinutes]);

  const selectedStart = time ? parseClock12(time.split(" → ")[0]) : null;
  const selectedEnd = selectedStart !== null ? selectedStart + durationMinutes : null;
  const supplement = location === "home" ? 5000 : 0;
  const total = c.price + supplement;

  const t = fr
    ? {
        ey: "Réservation",
        title: "Préparez votre rendez-vous",
        text: "Choisissez votre date et votre créneau disponible. Indiquez ensuite le lieu et vos informations pour finaliser la réservation.",
        service: "Prestation",
        duration: "Durée",
        price: "Prix de base",
        date: "Date du rendez-vous",
        time: "Créneau disponible",
        hours: "Disponibilités : lundi à samedi · 09h00 à 19h00",
        timeHint: "Ouvrez le menu pour choisir précisément l’heure et les minutes. Les créneaux sont proposés toutes les 30 minutes, avec AM/PM.",
        place: "Lieu du rendez-vous",
        salon: "Au salon",
        home: "À domicile",
        salonText: "Votre prestation se déroule au salon.",
        homeText: "+ 5 000 FCFA sur le prix de la prestation.",
        address: "Localisation / adresse",
        addressPh: "Quartier, adresse ou point de repère",
        client: "Informations client",
        first: "Prénom",
        last: "Nom",
        phone: "Téléphone",
        firstPh: "Votre prénom",
        lastPh: "Votre nom",
        phonePh: "Ex. 6XX XXX XXX",
        summary: "Récapitulatif",
        base: "Prestation",
        supplement: "Domicile",
        total: "Total",
        reserve: "Réserver",
        back: "Retour au détail",
        required: "Complétez les informations obligatoires.",
        sunday: "Le dimanche n'est pas disponible.",
        noSlots: "Aucun créneau disponible pour cette date et cette durée.",
        chooseDate: "Choisissez d'abord une date.",
        reminder: "Un rappel est prévu 24 h avant le rendez-vous pour la cliente et la coiffeuse.",
      }
    : {
        ey: "Booking",
        title: "Prepare your appointment",
        text: "Choose your date and available time slot. Then select the location and enter your details to complete the booking.",
        service: "Service",
        duration: "Duration",
        price: "Base price",
        date: "Appointment date",
        time: "Available time slot",
        hours: "Availability: Monday to Saturday · 09:00 AM to 07:00 PM",
        timeHint: "Open the menu to choose the exact hour and minutes. Slots are offered every 30 minutes with AM/PM.",
        place: "Appointment location",
        salon: "At the salon",
        home: "At home",
        salonText: "Your service takes place at the salon.",
        homeText: "+ 5,000 FCFA added to the service price.",
        address: "Location / address",
        addressPh: "Neighborhood, address or landmark",
        client: "Client information",
        first: "First name",
        last: "Last name",
        phone: "Phone",
        firstPh: "Your first name",
        lastPh: "Your last name",
        phonePh: "e.g. 6XX XXX XXX",
        summary: "Summary",
        base: "Service",
        supplement: "Home service",
        total: "Total",
        reserve: "Book",
        back: "Back to details",
        required: "Please complete all required information.",
        sunday: "Sunday is unavailable.",
        noSlots: "No available slot for this date and duration.",
        chooseDate: "Choose a date first.",
        reminder: "A reminder is planned 24 hours before the appointment for both client and professional.",
      };

  const handleReserve = () => {
    setError("");

    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !date || !time) {
      setError(t.required);
      return;
    }

    if (dateDay(date) === 0) {
      setError(t.sunday);
      return;
    }

    if (location === "home" && !address.trim()) {
      setError(t.required);
      return;
    }

    if (selectedStart === null || selectedEnd === null) {
      setError(t.required);
      return;
    }

    const query = new URLSearchParams({
      date,
      time,
      location,
      address,
      firstName,
      lastName,
      phone,
      duration: String(durationMinutes),
      total: String(total),
    });

    router.push(`/reservation/${c.id}/payment?${query.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />

      <section className="px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1280px]">
          <Link href={`/reservation/${c.id}`} className="text-sm text-[var(--presty-purple)] hover:underline">
            ← {t.back}
          </Link>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">{t.ey}</p>
            <h1 className="mt-4 text-5xl font-light tracking-[-.05em] md:text-7xl">{t.title}</h1>
            <p className="mt-5 max-w-[850px] text-sm leading-8 text-[var(--presty-muted)]">{t.text}</p>
          </div>

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
            <div className="presty-float flex h-full min-h-[700px] flex-col overflow-hidden rounded-[2.2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] shadow-xl">
              <div className="relative min-h-[520px] flex-1 bg-[var(--presty-soft)] md:min-h-[560px]">
                <Image src={c.images[0]} alt={fr ? c.titleFr : c.titleEn} fill sizes="520px" className="object-contain p-4 md:p-6" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-5 py-3 text-xs font-medium text-[#211d20]">
                  PRESTY · {fr ? c.titleFr : c.titleEn}
                </div>
              </div>
              <div className="p-7 md:p-8">
                <p className="label">{t.service}</p>
                <h2 className="mt-3 text-2xl font-medium">{fr ? c.titleFr : c.titleEn}</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[var(--presty-soft)] p-4">
                    <p className="label">{t.price}</p>
                    <p className="mt-2 font-medium">{c.price.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--presty-soft)] p-4">
                    <p className="label">{t.duration}</p>
                    <p className="mt-2 font-medium">{c.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7 shadow-xl md:p-9">
              <div className="rounded-2xl bg-[var(--presty-soft)] p-5">
                <p className="text-xs font-semibold text-[var(--presty-purple)]">{t.hours}</p>
                <p className="mt-2 text-xs leading-6 text-[var(--presty-muted)]">{t.reminder}</p>
              </div>

              <div className="mt-9 border-t border-[var(--presty-border)] pt-8">
                <p className="label">{t.client}</p>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div><label className="label" htmlFor="first">{t.first}</label><input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="field" placeholder={t.firstPh} /></div>
                  <div><label className="label" htmlFor="last">{t.last}</label><input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} className="field" placeholder={t.lastPh} /></div>
                </div>
                <div className="mt-5"><label className="label" htmlFor="phone">{t.phone}</label><input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="field" placeholder={t.phonePh} /></div>
              </div>


              <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-end">
                <div>
                  <label className="label" htmlFor="date">{t.date}</label>
                  <input
                    id="date"
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(event) => { setDate(event.target.value); setTime(""); setError(""); }}
                    className="field"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="time">{t.time}</label>
                  <select
                    id="time"
                    value={time}
                    onChange={(event) => { setTime(event.target.value); setError(""); }}
                    disabled={!date || dateDay(date) === 0}
                    className="field cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">{!date ? t.chooseDate : t.time}</option>
                    {availableSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  <p className="mt-2 text-[11px] leading-5 text-[var(--presty-muted)]">{t.timeHint}</p>
                </div>
              </div>

              {date && dateDay(date) !== 0 && availableSlots.length === 0 && (
                <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-[var(--presty-text)]">{t.noSlots}</div>
              )}

              <div className="mt-9">
                <p className="label">{t.place}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <button type="button" onClick={() => setLocation("salon")} className={`rounded-2xl border p-5 text-left transition ${location === "salon" ? "border-[var(--presty-purple)] bg-[var(--presty-soft)] shadow-sm" : "border-[var(--presty-border)] bg-[var(--presty-surface)] hover:-translate-y-1"}`}>
                    <span className="flex items-center justify-between"><strong>{t.salon}</strong><span className="text-[var(--presty-purple)]">{location === "salon" ? "✓" : "○"}</span></span>
                    <span className="mt-2 block text-xs leading-5 text-[var(--presty-muted)]">{t.salonText}</span>
                  </button>
                  <button type="button" onClick={() => setLocation("home")} className={`rounded-2xl border p-5 text-left transition ${location === "home" ? "border-[var(--presty-purple)] bg-[var(--presty-soft)] shadow-sm" : "border-[var(--presty-border)] bg-[var(--presty-surface)] hover:-translate-y-1"}`}>
                    <span className="flex items-center justify-between"><strong>{t.home}</strong><span className="text-[var(--presty-purple)]">{location === "home" ? "✓" : "○"}</span></span>
                    <span className="mt-2 block text-xs leading-5 text-[var(--presty-muted)]">{t.homeText}</span>
                  </button>
                </div>
              </div>

              {location === "home" && (
                <div className="mt-5">
                  <label className="label" htmlFor="address">{t.address}</label>
                  <input id="address" value={address} onChange={(event) => setAddress(event.target.value)} className="field" placeholder={t.addressPh} />
                </div>
              )}

              <div className="mt-9 rounded-[1.7rem] bg-[var(--presty-dark-section)] p-6 text-white">
                <p className="text-xs uppercase tracking-[.25em] text-white/55">{t.summary}</p>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-5"><span className="text-white/65">{t.base}</span><strong>{c.price.toLocaleString("fr-FR")} FCFA</strong></div>
                  <div className="flex justify-between gap-5"><span className="text-white/65">{t.supplement}</span><strong>{supplement ? `+ ${supplement.toLocaleString("fr-FR")} FCFA` : "0 FCFA"}</strong></div>
                  <div className="mt-4 flex justify-between gap-5 border-t border-white/10 pt-4"><span>{t.total}</span><strong className="text-lg">{total.toLocaleString("fr-FR")} FCFA</strong></div>
                </div>
              </div>

              {error && <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs leading-6 text-red-700 dark:text-red-300">{error}</p>}

              <button type="button" onClick={handleReserve} className="mt-7 w-full rounded-full bg-[var(--presty-purple)] px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                {t.reserve} →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
