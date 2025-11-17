import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#311B92] text-[#E0F7FA] mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png"
              alt="Kallitechnia Gymnastics Kefalonia"
              width={180}
              height={60}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">
              Σύλλογος Γυμναστικής Καλλιτεχνίας στην Κεφαλονιά. Προάγουμε την αθλητική αριστεία και την υγιή ανάπτυξη
              των παιδιών.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Γρήγοροι Σύνδεσμοι</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  Αρχική
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  Ο Σύλλογος
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-secondary transition-colors">
                  Νέα
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-secondary transition-colors">
                  Αθλήματα – Τμήματα
                </Link>
              </li>
              <li>
                <Link href="/registration" className="hover:text-secondary transition-colors">
                  Εγγραφές
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Επικοινωνία
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Επικοινωνία</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Αργοστόλι, Κεφαλονιά</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">+30 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">info@kallitechnia-kefalonia.gr</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/share/1CrWN7pqCy/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/kallitechniagymnastics?igsh=MTRodDdpdW02c3MyYg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@kallitechniagymnastics?si=sZvo_JM4gkKPu0Lp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4527A0] pt-6 mb-6">
          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="https://www.gymnastics.sport/site/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors text-sm"
            >
              FIG - International Gymnastics Federation
            </a>
            <a
              href="https://www.ego-gymnastics.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors text-sm"
            >
              ΕΓΟ - Ελληνική Γυμναστική Ομοσπονδία
            </a>
          </div>
        </div>

        <div className="border-t border-[#4527A0] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 Γυμναστική Καλλιτεχνία Κεφαλονιάς. Όλα τα δικαιώματα διατηρούνται.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-secondary transition-colors">
              Όροι Χρήσης
            </Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">
              Πολιτική Απορρήτου
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
