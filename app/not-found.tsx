import Link from "next/link"

import Footer from "@/components/Footer"
import { fetchFooterData } from "@/lib/server/content"

export default async function NotFound() {
  const footerData = await fetchFooterData()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-accent/10 via-background to-primary/10 px-4 py-24">
        <div className="max-w-2xl rounded-3xl border border-border bg-white/80 p-10 text-center shadow-2xl backdrop-blur transition hover:shadow-primary/20">
          <div className="mb-8 flex flex-col items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              404
            </span>
            <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl">Η σελίδα δεν βρέθηκε</h1>
            <p className="text-lg text-muted-foreground">
              Η διεύθυνση που αναζητάς ίσως μετακινήθηκε ή δεν υπάρχει πλέον. Επιστρέψτε στην αρχική για να συνεχίσετε την
              πλοήγησή σας.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-1 hover:bg-primary/90"
            >
              Επιστροφή στην Αρχική
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-base font-semibold text-primary transition hover:-translate-y-1 hover:bg-primary/10"
            >
              Επικοινωνία
            </Link>
          </div>
        </div>
      </main>

      <Footer data={footerData} />
    </div>
  )
}


