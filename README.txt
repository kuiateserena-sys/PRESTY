PRESTY — FRONT-END FINAL

Cette version est une continuation du projet PRESTY existant.

CONTENU PRINCIPAL
- Accueil PRESTY avec navigation ordonnée.
- FR / EN global et mode clair / sombre global.
- Icône lune pour le mode sombre.
- 61 photos issues des dossiers de coiffures.
- Défilement automatique de toutes les photos dans le Hero.
- Galerie/Inspiration avec toutes les photos.
- Section Service à domicile intégrée à l'accueil.
- Page Prestations avec les vrais noms issus des dossiers.
- Page Détail d'une prestation.
- Réservation : informations client, date, créneau, salon/domicile, localisation à domicile.
- Créneaux de 30 minutes de 09h00 à 19h00, lundi à samedi, avec AM/PM.
- Contrôle local des conflits de rendez-vous via localStorage (prototype front-end).
- Paiement : sans paiement, 50 %, ou 100 %, avec moyens de paiement visuels.
- Confirmation de réservation.
- Contact PRESTY avec WhatsApp, Instagram, Facebook, Snapchat et email.

INSTALLATION
1. Ouvrir le dossier PRESTY dans VS Code.
2. Ouvrir le terminal dans ce dossier.
3. Exécuter : npm install
4. Puis : npm run dev
5. Ouvrir : http://localhost:3000

IMPORTANT
Le contrôle des rendez-vous simultanés, les notifications/rappels réels et les paiements réels devront être reliés au backend.
La réservation actuelle est une démonstration front-end avec localStorage.

NOUVELLE FONCTIONNALITE — RETROUVER / ANNULER UNE RESERVATION
- Les clientes n'ont pas besoin de créer un compte.
- Après confirmation, PRESTY génère un numéro de réservation du type PRESTY-8F42K.
- La page /reservation/retrouver permet de retrouver une réservation avec le numéro + téléphone.
- La cliente peut consulter les informations et annuler une réservation depuis cette page.
- Cette version frontend utilise localStorage pour simuler le stockage et le blocage des créneaux. La vraie sécurité, persistance, notifications et annulation côté serveur seront branchées au backend Spring Boot/PostgreSQL.
