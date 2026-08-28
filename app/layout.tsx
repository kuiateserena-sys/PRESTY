import type { Metadata } from "next";
import PrestyAppProviders from "@/components/PrestyAppProviders";
import "./globals.css";

export const metadata: Metadata = { title:"PRESTY — Votre beauté, votre moment", description:"Plateforme de réservation de prestations de beauté PRESTY." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" suppressHydrationWarning><body><PrestyAppProviders>{children}</PrestyAppProviders></body></html>}
