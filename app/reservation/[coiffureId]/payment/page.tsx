"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

function PaymentIcon({ type }: { type: string }) {
  if (type === "orange") return <span className="payment-brand payment-orange" aria-hidden="true"><span className="payment-mark">OM</span></span>;
  if (type === "mtn") return <span className="payment-brand payment-mtn" aria-hidden="true"><span className="payment-mark">MTN</span></span>;
  if (type === "card") return <span className="payment-brand payment-card" aria-hidden="true"><svg viewBox="0 0 32 22" className="h-5 w-7"><rect x="1" y="2" width="30" height="18" rx="3" fill="currentColor" opacity=".16"/><rect x="1" y="6" width="30" height="3" fill="currentColor"/><rect x="5" y="13" width="7" height="2" rx="1" fill="currentColor"/><rect x="15" y="13" width="10" height="2" rx="1" fill="currentColor"/></svg></span>;
  return <span className="payment-brand payment-paypal" aria-hidden="true"><span className="payment-mark">P</span></span>;
}

export default function PaymentPage() {
  const { language } = usePresty();
  const params = useParams<{ coiffureId: string }>();
  const search = useSearchParams();
  const fr = language === "fr";
  const c = prestyCategories.find((item) => item.id === params.coiffureId);
  const [choice, setChoice] = useState<"none" | "half" | "full">("none");
  const [method, setMethod] = useState("orange");
  const [confirmed, setConfirmed] = useState(false);

  if (!c) return notFound();

  const date = search.get("date") || "—";
  const time = search.get("time") || "—";
  const locationValue = search.get("location") === "home" ? "home" : "salon";
  const location = locationValue === "home" ? (fr ? "À domicile" : "At home") : (fr ? "Au salon" : "At the salon");
  const address = search.get("address") || "";
  const firstName = search.get("firstName") || "";
  const lastName = search.get("lastName") || "";
  const phone = search.get("phone") || "";
  const supplement = locationValue === "home" ? 5000 : 0;
  const total = c.price + supplement;
  const halfAmount = Math.ceil(total / 2 / 100) * 100;
  const amount = choice === "half" ? halfAmount : choice === "full" ? total : 0;

  const t = fr
    ? {
        ey: "Paiement & confirmation",
        title: "Votre réservation est presque prête.",
        text: "Vous pouvez réserver sans payer, verser 50 % maintenant ou régler la totalité.",
        recap: "Votre rendez-vous",
        client: "Cliente",
        service: "Prestation",
        date: "Date",
        time: "Créneau",
        place: "Lieu",
        address: "Adresse",
        base: "Prix prestation",
        homeFee: "Supplément domicile",
        total: "Total réservation",
        paymentChoice: "Choisissez votre niveau de paiement",
        none: "Réserver sans payer",
        noneText: "Vous réglez plus tard selon les modalités convenues.",
        half: "Payer 50 %",
        full: "Payer 100 %",
        methods: "Moyen de paiement",
        orange: "Orange Money",
        mtn: "MTN Mobile Money",
        card: "Carte bancaire",
        paypal: "PayPal",
        confirm: "Confirmer la réservation",
        pay: "Payer et confirmer",
        change: "Modifier le rendez-vous",
        success: "Réservation confirmée !",
        successText: "Votre numéro de réservation est conservé avec votre confirmation. Vous pourrez retrouver cette réservation sans créer de compte.",
        paid: "Montant payé",
        pending: "Montant à payer plus tard",
        home: "Retour à l'accueil",
        reminder: "Rappel 24 h : la cliente et la coiffeuse doivent être notifiées avant le rendez-vous.",
      }
    : {
        ey: "Payment & confirmation",
        title: "Your booking is almost ready.",
        text: "You can book without paying, pay 50% now or pay the full amount.",
        recap: "Your appointment",
        client: "Client",
        service: "Service",
        date: "Date",
        time: "Time slot",
        place: "Location",
        address: "Address",
        base: "Service price",
        homeFee: "Home-service fee",
        total: "Booking total",
        paymentChoice: "Choose your payment level",
        none: "Book without paying",
        noneText: "Pay later according to the agreed terms.",
        half: "Pay 50%",
        full: "Pay 100%",
        methods: "Payment method",
        orange: "Orange Money",
        mtn: "MTN Mobile Money",
        card: "Bank card",
        paypal: "PayPal",
        confirm: "Confirm booking",
        pay: "Pay and confirm",
        change: "Change appointment",
        success: "Booking confirmed!",
        successText: "Keep your reservation number. You can retrieve this booking later without creating an account.",
        paid: "Paid amount",
        pending: "Amount to pay later",
        home: "Back home",
        reminder: "24-hour reminder: both client and professional should be notified before the appointment.",
      };

  const confirmBooking = () => {
    try {
      const bookings = JSON.parse(localStorage.getItem("presty-bookings") || "[]") as { date: string; start: string; duration: number }[];
      const start = time.split(" – ")[0];
      const duration = Number(search.get("duration") || 0);
      const toMinutes = (value: string) => {
        const [clock, suffix] = value.split(" ");
        let [hours, minutes] = clock.split(":").map(Number);
        if (suffix === "PM" && hours !== 12) hours += 12;
        if (suffix === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      const startMinutes = toMinutes(start);
      const conflict = bookings.some((booking) => {
        if (booking.date !== date) return false;
        const existing = toMinutes(booking.start);
        return startMinutes < existing + booking.duration && existing < startMinutes + duration;
      });
      if (conflict) {
        window.alert(fr ? "Ce créneau vient d'être réservé. Veuillez choisir un autre créneau." : "This time slot has just been booked. Please choose another slot.");
        return;
      }
      const reservationCode = `PRESTY-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      const nextBooking = {
        reservationCode,
        date,
        start,
        time,
        duration,
        serviceId: c.id,
        firstName,
        lastName,
        phone,
        location: locationValue,
        address,
        total,
        choice,
        amount,
        status: "CONFIRMED",
      };
      localStorage.setItem("presty-bookings", JSON.stringify([...bookings, nextBooking]));
      localStorage.setItem("presty-last-booking", JSON.stringify(nextBooking));
      setConfirmed(true);
    } catch {
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
        <PrestyNavbar />
        <section className="flex min-h-screen items-center justify-center px-6 py-32">
          <div className="presty-float w-full max-w-[760px] rounded-[2.5rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-8 shadow-2xl md:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--presty-purple)] text-4xl text-white">✓</div>
            <p className="mt-8 text-center text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">PRESTY</p>
            <h1 className="mt-4 text-center text-4xl font-light md:text-5xl">{t.success}</h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-[var(--presty-muted)]">{t.successText}</p>
            <div className="mt-8 rounded-3xl bg-[var(--presty-soft)] p-6 text-sm leading-8">
              <div className="mb-5 rounded-2xl border border-[var(--presty-purple)]/20 bg-[var(--presty-surface)] p-5 text-center">
                <p className="label">{fr ? "Numéro de réservation" : "Reservation number"}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[.16em] text-[var(--presty-purple)]">{(() => { try { return JSON.parse(localStorage.getItem("presty-last-booking") || "{}").reservationCode || "PRESTY"; } catch { return "PRESTY"; } })()}</p>
              </div>
              <p><strong>{t.client} :</strong> {firstName} {lastName}</p><p><strong>{t.service} :</strong> {fr ? c.titleFr : c.titleEn}</p><p><strong>{t.date} :</strong> {date}</p><p><strong>{t.time} :</strong> {time}</p><p><strong>{t.place} :</strong> {location}</p>{address && <p><strong>{t.address} :</strong> {address}</p>}
              <div className="mt-4 border-t border-[var(--presty-border)] pt-4"><p><strong>{t.total} :</strong> {total.toLocaleString("fr-FR")} FCFA</p><p><strong>{t.paid} :</strong> {amount.toLocaleString("fr-FR")} FCFA</p>{total - amount > 0 && <p><strong>{t.pending} :</strong> {(total - amount).toLocaleString("fr-FR")} FCFA</p>}</div>
            </div>
            <div className="mt-6 rounded-2xl border border-[var(--presty-purple)]/20 bg-[var(--presty-purple)]/5 p-5 text-sm leading-7 text-[var(--presty-muted)]">🔔 {t.reminder}</div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/reservation/retrouver" className="flex justify-center rounded-full border border-[var(--presty-purple)]/20 bg-[var(--presty-soft)] px-7 py-4 text-sm font-medium text-[var(--presty-purple)]">{fr ? "Retrouver ma réservation" : "Retrieve my booking"}</Link>
              <Link href="/" className="flex justify-center rounded-full bg-[var(--presty-purple)] px-7 py-4 text-sm font-medium text-white">{t.home}</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const methods = [["orange", t.orange], ["mtn", t.mtn], ["card", t.card], ["paypal", t.paypal]];

  return (
    <main className="min-h-screen bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />
      <section className="px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1250px]">
          <p className="text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">{t.ey}</p>
          <h1 className="mt-4 text-5xl font-light tracking-[-.05em] md:text-7xl">{t.title}</h1>
          <p className="mt-5 max-w-[800px] text-sm leading-8 text-[var(--presty-muted)]">{t.text}</p>
          <div className="mt-12 grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] shadow-xl">
              <div className="relative h-[310px]"><Image src={c.images[0]} alt={fr ? c.titleFr : c.titleEn} fill sizes="500px" className="object-cover" /></div>
              <div className="p-7"><p className="label">{t.recap}</p><h2 className="mt-3 text-2xl font-medium">{fr ? c.titleFr : c.titleEn}</h2><div className="mt-5 space-y-2 text-sm text-[var(--presty-muted)]"><p><strong className="text-[var(--presty-text)]">{t.client} :</strong> {firstName} {lastName}</p><p><strong className="text-[var(--presty-text)]">{t.date} :</strong> {date}</p><p><strong className="text-[var(--presty-text)]">{t.time} :</strong> {time}</p><p><strong className="text-[var(--presty-text)]">{t.place} :</strong> {location}</p>{address && <p><strong className="text-[var(--presty-text)]">{t.address} :</strong> {address}</p>}</div><div className="mt-7 border-t border-[var(--presty-border)] pt-6"><div className="flex justify-between text-sm"><span>{t.base}</span><strong>{c.price.toLocaleString("fr-FR")} FCFA</strong></div><div className="mt-2 flex justify-between text-sm"><span>{t.homeFee}</span><strong>{supplement.toLocaleString("fr-FR")} FCFA</strong></div><div className="mt-4 flex justify-between border-t border-[var(--presty-border)] pt-4"><span className="font-medium">{t.total}</span><strong className="text-xl text-[var(--presty-purple)]">{total.toLocaleString("fr-FR")} FCFA</strong></div></div></div>
            </div>

            <div className="rounded-[2rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7 shadow-xl md:p-9">
              <p className="label">{t.paymentChoice}</p>
              <div className="mt-6 grid gap-3">
                {[["none", t.none, t.noneText], ["half", t.half, `${halfAmount.toLocaleString("fr-FR")} FCFA`], ["full", t.full, `${total.toLocaleString("fr-FR")} FCFA`]].map(([id, label, text]) => <button key={id} type="button" onClick={() => setChoice(id as "none" | "half" | "full")} className={`rounded-2xl border p-5 text-left transition ${choice === id ? "border-[var(--presty-purple)] bg-[var(--presty-soft)] shadow-sm" : "border-[var(--presty-border)]"}`}><div className="flex items-center justify-between"><span className="font-medium">{label}</span><span className={`h-5 w-5 rounded-full border-2 ${choice === id ? "border-[var(--presty-purple)] bg-[var(--presty-purple)] shadow-[inset_0_0_0_4px_var(--presty-surface)]" : "border-[var(--presty-border)]"}`} /></div><p className="mt-2 text-xs leading-6 text-[var(--presty-muted)]">{text}</p></button>)}
              </div>

              {choice !== "none" && <>
                <p className="label mt-9">{t.methods}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {methods.map(([id, label]) => <button key={id} type="button" onClick={() => setMethod(id)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${method === id ? "border-[var(--presty-purple)] bg-[var(--presty-soft)]" : "border-[var(--presty-border)]"}`}><PaymentIcon type={id} /><span className="text-sm font-medium">{label}</span></button>)}
                </div>
              </>}

              <div className="mt-8 rounded-2xl bg-[var(--presty-soft)] p-5 text-sm leading-7"><p>{choice === "none" ? t.none : `${t.pay} : ${amount.toLocaleString("fr-FR")} FCFA`}</p>{choice !== "none" && <p className="mt-1 text-[var(--presty-muted)]">{method === "orange" ? t.orange : method === "mtn" ? t.mtn : method === "card" ? t.card : t.paypal}</p>}</div>

              <button type="button" onClick={confirmBooking} className="mt-8 flex w-full justify-center rounded-full bg-[var(--presty-purple)] px-7 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-1">{choice === "none" ? t.confirm : `${t.pay} ${amount.toLocaleString("fr-FR")} FCFA`} →</button>
              <Link href={`/reservation/${c.id}/booking`} className="mt-4 flex justify-center text-xs text-[var(--presty-purple)] hover:underline">{t.change}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
