# Περιβάλλον Εκτέλεσης (Kalitechnia)

Η frontend εφαρμογή της Καλλιτεχνίας χρειάζεται πρόσβαση στο Payload CMS. Δημιουργήστε ένα `.env.local` (ή χρησιμοποιήστε τα περιβάλλοντα του Vercel) με τις παρακάτω μεταβλητές:

```
NEXT_PUBLIC_PAYLOAD_URL=<public URL του Payload>
PAYLOAD_URL=<ίδιο URL για server-side usage>
NEXT_PUBLIC_TENANT_SLUG=kallitechnia
```

Στο τοπικό περιβάλλον, αν τρέχει το Payload στην προεπιλεγμένη θύρα:

```
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
PAYLOAD_URL=http://localhost:3000
NEXT_PUBLIC_TENANT_SLUG=kallitechnia
```

> Το `NEXT_PUBLIC_TENANT_SLUG` επιτρέπει στην εφαρμογή να κάνει fallback στο σωστό tenant όταν τρέχει σε localhost. Σε παραγωγή, το tenant ανιχνεύεται αυτόματα από το domain (`kallitechnia.gr`, `www.kallitechnia.gr`, `kallitechnia.vercel.app`).

