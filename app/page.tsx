"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrestyNavbar from "@/components/PrestyNavbar";
import { prestyCategories, prestyPhotos } from "@/lib/presty-data";
import { usePresty } from "@/components/PrestyThemeProvider";

const heroPhotos = prestyPhotos;
const galleryPhotos = prestyPhotos;

const socialLinks = [
  { name: "WhatsApp", href: "https://wa.me/237652790284", icon: "whatsapp" },
  { name: "Instagram", href: "https://www.instagram.com/kuiateserena?igsi=MTE1YWYwZzllMjNvNQ==", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61580629383641", icon: "facebook" },
  { name: "Snapchat", href: "https://www.instagram.com/kuiateserena?igsi=MTE1YWYwZzllMjNvNQ==", icon: "snapchat" },
];

function SocialIcon({ type }: { type: string }) {
  if (type === "whatsapp") return (
    <span className="social-brand whatsapp-brand" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .24 5.3.24 11.84c0 2.09.55 4.14 1.59 5.95L.14 24l6.35-1.66a11.84 11.84 0 0 0 5.59 1.41h.01c6.53 0 11.84-5.31 11.84-11.84a11.8 11.8 0 0 0-3.41-8.43ZM12.09 21.72h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.86 9.86 0 1 1 8.38 4.64Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
    </span>
  );
  if (type === "instagram") return (
    <span className="social-brand instagram-brand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span>
  );
  if (type === "facebook") return (
    <span className="social-brand facebook-brand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M13.7 22v-8h2.7l.4-3h-3.1V9.1c0-.9.25-1.5 1.55-1.5H17V4.9c-.3 0-1.35-.12-2.55-.12-2.53 0-4.27 1.55-4.27 4.4V11H7.3v3h2.88v8h3.52Z"/></svg></span>
  );
  return (
    <span className="social-brand snapchat-brand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2.1c-3.23 0-5.5 2.3-5.5 5.55v2.01c0 .43-.17.74-.52 1.03-.22.18-.55.35-.92.5-.4.16-.57.5-.42.83.16.35.65.58 1.35.7.31.05.52.18.65.39.12.19.11.45.03.75-.12.47.16.72.6.76.47.04 1.03.1 1.42.3.49.25.82.63 1.21 1.09.56.67 1.25 1.5 2.1 1.5.34 0 .72-.12 1.14-.37.43-.25.76-.37 1.01-.37s.58.12 1.01.37c.42.25.8.37 1.14.37.85 0 1.54-.83 2.1-1.5.39-.46.72-.84 1.21-1.09.39-.2.95-.26 1.42-.3.44-.04.72-.29.6-.76-.08-.3-.09-.56.03-.75.13-.21.34-.34.65-.39.7-.12 1.19-.35 1.35-.7.15-.33-.02-.67-.42-.83-.37-.15-.7-.32-.92-.5-.35-.29-.52-.6-.52-1.03V7.65C17.5 4.4 15.23 2.1 12 2.1Z"/></svg></span>
  );
}

export default function Home() {
  const { language } = usePresty();
  const fr = language === "fr";
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentPhoto((value) => (value + 1) % heroPhotos.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const t = fr
    ? {
        ey: "Beauté · Élégance · Bien-être",
        hero: "Sublimez votre beauté,",
        hero2: "réservez votre moment.",
        heroText: "Des prestations de qualité, un accueil chaleureux et une expérience pensée pour vous.",
        book: "Prendre rendez-vous",
        view: "Voir les prestations",
        reminder: "rappel",
        salon: "ou domicile",
        simple: "réservation",
        pillSimple: "Simple",
        pillElegant: "Élégante",
        pillFluid: "Fluide",
        experience: "Une nouvelle expérience",
        easy: "La beauté ne devrait jamais être compliquée.",
        experienceText: "PRESTY réunit les prestations, les disponibilités et la réservation dans une expérience simple, élégante et fluide.",
        services: "Nos prestations",
        style: "Votre style.",
        choice: "Votre choix.",
        servicesText: "Découvrez nos prestations et choisissez la coiffure qui vous correspond.",
        details: "Voir les détails",
        approach: "Notre approche",
        approachTitle: "Tout commence par vous.",
        approachText: "Une expérience conçue pour vous laisser choisir, réserver et profiter de votre moment en toute simplicité.",
        choose: "Choisissez",
        chooseText: "Votre prestation.",
        reserve: "Réservez",
        reserveText: "Votre créneau.",
        enjoy: "Profitez",
        enjoyText: "De votre moment.",
        home: "Service à domicile",
        homeTitle: "PRESTY vient à vous.",
        homeText: "Lorsque vous choisissez le domicile lors de votre réservation, un supplément de 5 000 FCFA est ajouté à la prestation.",
        homeBook: "Réserver à domicile",
        days: "Lundi – Samedi",
        hours: "09h – 19h",
        gallery: "Galerie",
        inspiration: "Inspiration.",
        galleryText: "Quelques images pour découvrir l'univers de PRESTY.",
        contact: "Contact",
        contactTitle: "Parlons de",
        contactTitle2: "votre moment.",
        contactText: "Une question, une envie ou besoin d'une précision ? L'équipe PRESTY vous répond avec plaisir.",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        message: "Message",
        firstNamePh: "Votre prénom",
        lastNamePh: "Votre nom",
        emailPh: "prestybeauty6@gmail.com",
        messagePh: "Écrivez votre message...",
        send: "Envoyer le message",
        follow: "Retrouvez PRESTY",
        emailLabel: "Email professionnel",
        signature: "Votre beauté, votre moment.",
        promise: "Une beauté pensée pour vous, une réservation pensée pour vous simplifier la vie.",
      }
    : {
        ey: "Beauty · Elegance · Well-being",
        hero: "Enhance your beauty,",
        hero2: "book your moment.",
        heroText: "Quality services, a warm welcome and an experience designed around you.",
        book: "Book an appointment",
        view: "View services",
        reminder: "reminder",
        salon: "or home",
        simple: "booking",
        pillSimple: "Simple",
        pillElegant: "Elegant",
        pillFluid: "Seamless",
        experience: "A new experience",
        easy: "Beauty should never be complicated.",
        experienceText: "PRESTY brings services, availability and booking together in a simple, elegant and seamless experience.",
        services: "Our services",
        style: "Your style.",
        choice: "Your choice.",
        servicesText: "Discover our services and choose the hairstyle that suits you.",
        details: "View details",
        approach: "Our approach",
        approachTitle: "It all starts with you.",
        approachText: "An experience designed to let you choose, book and enjoy your moment with ease.",
        choose: "Choose",
        chooseText: "Your service.",
        reserve: "Book",
        reserveText: "Your time slot.",
        enjoy: "Enjoy",
        enjoyText: "Your moment.",
        home: "Home service",
        homeTitle: "PRESTY comes to you.",
        homeText: "When you choose home service during booking, an additional 5,000 FCFA is added to the service price.",
        homeBook: "Book at home",
        days: "Monday – Saturday",
        hours: "09:00 AM – 07:00 PM",
        gallery: "Gallery",
        inspiration: "Inspiration.",
        galleryText: "A glimpse into PRESTY's visual universe.",
        contact: "Contact",
        contactTitle: "Let's talk about",
        contactTitle2: "your moment.",
        contactText: "A question, a request or need a detail? PRESTY will be happy to answer you.",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        message: "Message",
        firstNamePh: "Your first name",
        lastNamePh: "Your last name",
        emailPh: "prestybeauty6@gmail.com",
        messagePh: "Write your message...",
        send: "Send message",
        follow: "Find PRESTY",
        emailLabel: "Professional email",
        signature: "Your beauty, your moment.",
        promise: "Beauty designed around you, booking designed to make life easier.",
      };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    setMouse({
      x: (event.clientX / window.innerWidth - 0.5) * 2,
      y: (event.clientY / window.innerHeight - 0.5) * 2,
    });
  };

  return (
    <main onMouseMove={handleMouseMove} className="min-h-screen overflow-x-hidden bg-[var(--presty-bg)] text-[var(--presty-text)]">
      <PrestyNavbar />

      <section id="accueil" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-12">
        <div className="presty-orb absolute -left-32 top-40 h-80 w-80 rounded-full bg-[var(--presty-glow)] blur-[100px]" />
        <div className="presty-orb absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[var(--presty-glow-2)] blur-[100px]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div className="max-w-[650px]">
            <p className="presty-appear text-xs uppercase tracking-[.35em] text-[var(--presty-accent)]">{t.ey}</p>
            <h1 className="presty-appear delay-1 mt-6 text-6xl font-light leading-[.95] tracking-[-.06em] md:text-8xl">
              {t.hero}<br /><span className="font-serif italic text-[var(--presty-purple)]">{t.hero2}</span>
            </h1>
            <p className="presty-appear delay-2 mt-8 max-w-[530px] text-base leading-8 text-[var(--presty-muted)]">{t.heroText}</p>
            <div className="presty-appear delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/prestations" className="rounded-full bg-[var(--presty-purple)] px-8 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:-translate-y-1">{t.book}</Link>
              <Link href="#prestations" className="rounded-full border border-[var(--presty-border)] bg-[var(--presty-surface)] px-8 py-4 text-center text-sm transition hover:-translate-y-1">{t.view}</Link>
            </div>
            <div className="presty-appear delay-4 mt-12 flex gap-8 border-t border-[var(--presty-border)] pt-7">
              <div><p className="text-lg font-medium">24h</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--presty-muted)]">{t.reminder}</p></div>
              <div><p className="text-lg font-medium">Salon</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--presty-muted)]">{t.salon}</p></div>
              <div><p className="text-lg font-medium">Simple</p><p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--presty-muted)]">{t.simple}</p></div>
            </div>
          </div>

          <div className="relative mx-auto flex h-[620px] w-full max-w-[560px] items-center justify-center">
            <div className="presty-float relative h-[560px] w-[390px] overflow-hidden rounded-[190px_190px_35px_35px] shadow-2xl transition-transform duration-700 md:h-[600px] md:w-[420px]" style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)` }}>
              {heroPhotos.map((photo, index) => (
                <Image key={photo} src={photo} alt="PRESTY" fill priority={index === 0} sizes="420px" className={`absolute inset-0 object-cover transition-all duration-[1400ms] ${index === currentPhoto ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-white backdrop-blur-md">
              {String(currentPhoto + 1).padStart(2, "0")} / {String(heroPhotos.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--presty-surface)] px-6 py-28 md:px-12 md:py-36">
        <div className="group mx-auto max-w-[950px] text-center">
          <p className="text-xs font-medium uppercase tracking-[.35em] text-[var(--presty-accent)]">{t.experience}</p>
          <h2 className="mt-6 text-4xl font-light tracking-[-.05em] md:text-6xl">{t.easy}</h2>
          <p className="reveal-on-hover mx-auto mt-7 max-w-[680px] text-sm leading-8 text-[var(--presty-muted)] md:text-base">{t.experienceText}</p>
          <div className="reveal-on-hover mx-auto mt-9 flex max-w-[650px] justify-center gap-3">
            <span className="soft-pill">{t.pillSimple}</span><span className="soft-pill">{t.pillElegant}</span><span className="soft-pill">{t.pillFluid}</span>
          </div>
        </div>
      </section>

      <section id="prestations" className="bg-[var(--presty-soft)] px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div><p className="text-sm font-semibold uppercase tracking-[.3em] text-[var(--presty-purple)]">{t.services}</p><h2 className="mt-5 text-5xl font-light tracking-[-.05em] md:text-7xl">{t.style}<br />{t.choice}</h2></div>
            <div className="max-w-[400px]"><p className="text-sm leading-7 text-[var(--presty-muted)]">{t.servicesText}</p><Link href="/prestations" className="group mt-6 inline-flex items-center gap-3 text-sm font-medium text-[var(--presty-purple)]">{t.view}<span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--presty-purple)]/30 transition group-hover:translate-x-1">→</span></Link></div>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {prestyCategories.slice(0, 3).map((service, index) => (
              <article key={service.id} className={`group overflow-hidden rounded-[2rem] bg-[var(--presty-surface)] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${index === 1 ? "md:mt-14" : ""}`}>
                <div className="relative h-[380px] overflow-hidden"><Image src={service.images[0]} alt={fr ? service.titleFr : service.titleEn} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-6 top-6 rounded-full bg-black/50 px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-white">0{index + 1}</span></div>
                <div className="p-7"><h3 className="text-2xl font-medium">{fr ? service.titleFr : service.titleEn}</h3><p className="mt-3 text-sm leading-7 text-[var(--presty-muted)]">{fr ? service.descriptionFr : service.descriptionEn}</p><Link href={`/reservation/${service.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--presty-purple)]">{t.details} →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approche" className="bg-[var(--presty-dark-section)] px-6 py-28 text-white md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
          <div className="group">
            <p className="reveal-on-hover text-xs uppercase tracking-[.35em] text-[#c9a9d1]">{t.approach}</p>
            <h2 className="reveal-on-hover mt-6 text-5xl font-light tracking-[-.05em] md:text-7xl">{t.approachTitle}</h2>
            <p className="reveal-on-hover mt-7 max-w-[520px] text-sm leading-8 text-white/60 md:text-base">{t.approachText}</p>
          </div>
          <div className="grid gap-4">
            {[["01", t.choose, t.chooseText], ["02", t.reserve, t.reserveText], ["03", t.enjoy, t.enjoyText]].map(([number, title, text]) => (
              <div key={number} className="group flex gap-6 border-t border-white/10 py-6 transition hover:translate-x-2">
                <span className="reveal-on-hover text-xs text-[#c9a9d1]">{number}</span>
                <div><h3 className="reveal-on-hover text-xl font-medium">{title}</h3><p className="reveal-on-hover mt-1 text-sm text-white/45">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="domicile" className="bg-[var(--presty-surface)] px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2.5rem] md:min-h-[560px]">
            <Image
              src="/images/coiffures/lace-frontale/1.jpeg"
              alt={fr ? "Inspiration beauté PRESTY à domicile" : "PRESTY beauty inspiration at home"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-[.25em] text-white">PRESTY · {t.home}</div>
          </div>

          <div className="lg:pl-6">
            <p className="text-xs uppercase tracking-[.35em] text-[var(--presty-purple)]">{t.home}</p>
            <h2 className="mt-5 text-4xl font-light tracking-[-.04em] md:text-6xl">{t.homeTitle}</h2>
            <p className="mt-6 max-w-[650px] text-sm leading-8 text-[var(--presty-muted)] md:text-base">{t.homeText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="soft-pill">+ 5 000 FCFA</span>
              <span className="soft-pill">{t.days}</span>
              <span className="soft-pill">{t.hours}</span>
            </div>
            <Link href="/prestations" className="mt-9 inline-flex rounded-full bg-[var(--presty-purple)] px-7 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:-translate-y-1">{t.homeBook} →</Link>
          </div>
        </div>
      </section>

      <section id="galerie" className="overflow-hidden bg-[var(--presty-surface)] py-28 md:py-36">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-12"><p className="text-sm font-semibold uppercase tracking-[.3em] text-[var(--presty-purple)]">{t.gallery}</p><h2 className="mt-5 text-6xl font-light tracking-[-.05em] md:text-8xl">{t.inspiration}</h2><p className="mx-auto mt-6 max-w-[550px] text-sm leading-7 text-[var(--presty-muted)]">{t.galleryText}</p></div>
        <div className="presty-gallery mt-16">{[...galleryPhotos, ...galleryPhotos].map((photo, index) => <div key={`${photo}-${index}`} className="relative h-[350px] w-[260px] flex-none overflow-hidden rounded-2xl md:h-[450px] md:w-[330px]"><Image src={photo} alt={`PRESTY ${index + 1}`} fill sizes="330px" className="object-cover" /></div>)}</div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[var(--presty-contact)] px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1250px]">
          <div className="mx-auto max-w-[850px] text-center"><p className="text-xs uppercase tracking-[.4em] text-[var(--presty-accent)]">{t.contact}</p><h2 className="mt-7 text-5xl font-light leading-[1] tracking-[-.05em] md:text-8xl">{t.contactTitle}<br /><span className="font-serif italic text-[var(--presty-purple)]">{t.contactTitle2}</span></h2><p className="mx-auto mt-7 max-w-[650px] text-sm leading-7 text-[var(--presty-muted)] md:text-base">{t.contactText}</p></div>

          <div className="mt-16 rounded-[2.5rem] border border-[var(--presty-border)] bg-[var(--presty-surface)] p-7 shadow-xl md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
              <form className="space-y-7" onSubmit={(event) => { event.preventDefault(); window.alert(fr ? "Votre message est prêt à être envoyé à PRESTY." : "Your message is ready to be sent to PRESTY."); }}>
                <div className="grid gap-7 md:grid-cols-2">
                  <div><label className="label" htmlFor="firstName">{t.firstName}</label><input id="firstName" className="field" placeholder={t.firstNamePh} /></div>
                  <div><label className="label" htmlFor="lastName">{t.lastName}</label><input id="lastName" className="field" placeholder={t.lastNamePh} /></div>
                </div>
                <div><label className="label" htmlFor="email">{t.email}</label><input id="email" type="email" className="field" placeholder={t.emailPh} /></div>
                <div><label className="label" htmlFor="message">{t.message}</label><textarea id="message" rows={5} className="field resize-none" placeholder={t.messagePh} /></div>
                <button type="submit" className="rounded-full bg-[var(--presty-purple)] px-8 py-4 text-sm font-medium text-white shadow-lg transition hover:-translate-y-1">{t.send} →</button>
              </form>

              <div className="rounded-[2rem] bg-[var(--presty-soft)] p-7 md:p-9">
                <p className="label">{t.follow}</p><h3 className="mt-4 text-3xl font-light">PRESTY Beauty</h3><p className="mt-4 text-sm leading-7 text-[var(--presty-muted)]">{t.promise}</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="social-logo justify-start gap-3 px-4"><SocialIcon type={social.icon} /><span>{social.name}</span></a>)}
                </div>
                <div className="mt-9 border-t border-[var(--presty-border)] pt-6"><p className="label">{t.emailLabel}</p><a href="mailto:prestybeauty6@gmail.com" className="mt-3 block text-sm font-medium text-[var(--presty-purple)]">prestybeauty6@gmail.com</a></div>
                <p className="mt-10 font-serif text-2xl italic text-[var(--presty-purple)]">{t.signature}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
