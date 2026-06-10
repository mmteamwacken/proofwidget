# ProofWidget

Testimonials sammeln, designen, einbetten — ohne Code.

## Lokale Entwicklung

```bash
npm install
npm start
```

Öffnet automatisch http://localhost:3000

## Deployment auf Vercel

1. Diesen Ordner auf GitHub hochladen
2. vercel.com → "New Project" → GitHub-Repo auswählen
3. Klick auf "Deploy" — fertig

## Projektstruktur

```
proofwidget/
├── public/
│   ├── index.html       # HTML-Einstiegspunkt
│   └── manifest.json    # PWA-Konfiguration
├── src/
│   ├── index.js         # React-Einstiegspunkt
│   └── App.jsx          # Komplette App
└── package.json         # Abhängigkeiten
```

## Nächste Schritte (nach erstem Deployment)

- [ ] Supabase-Datenbank verbinden (Tokens, Testimonials)
- [ ] Stripe-Zahlung einbinden
- [ ] Coach-Dashboard mit Login absichern
- [ ] E-Mail-Versand für Token-Links (Resend.com, kostenlos)

## Stack

- React 18
- Vercel (Hosting, kostenlos)
- Supabase (Datenbank + Auth, kostenlos bis 500MB) — folgt
- Stripe (Zahlungen) — folgt
