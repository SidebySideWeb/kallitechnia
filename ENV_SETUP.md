# Περιβάλλον Εκτέλεσης (Kalitechnia)

Η frontend εφαρμογή της Καλλιτεχνίας χρειάζεται πρόσβαση στο CMS API. Δημιουργήστε ένα `.env.local` (ή χρησιμοποιήστε τα περιβάλλοντα του Vercel) με τις παρακάτω μεταβλητές:

```
NEXT_PUBLIC_PAYLOAD_URL=<public URL του CMS API>
PAYLOAD_URL=<ίδιο URL για server-side usage>
NEXT_PUBLIC_TENANT_SLUG=kallitechnia
```

Στο τοπικό περιβάλλον, αν τρέχει το CMS στην προεπιλεγμένη θύρα:

```
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
PAYLOAD_URL=http://localhost:3000
NEXT_PUBLIC_TENANT_SLUG=kallitechnia
```

> Το `NEXT_PUBLIC_TENANT_SLUG` χρησιμοποιείται για τον προσδιορισμό του tenant. Η εφαρμογή χρησιμοποιεί καθαρό API client χωρίς εξωτερικές βιβλιοθήκες.

