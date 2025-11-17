"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Αρχική" },
    { href: "/about", label: "Ο Σύλλογος" },
    { href: "/news", label: "Νέα" },
    { href: "/programs", label: "Πρόγραμμα" },
    { href: "/registration", label: "Εγγραφές" },
    { href: "/contact", label: "Επικοινωνία" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F5F5]/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20KGK%20%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82%20%CE%B1%CE%BD%CE%AC%CE%BB%CF%85%CF%83%CE%B7%CF%82-YP2dWdAD9HKxgCBQOBLccXnxTydRcQ.png"
              alt="Kallitechnia Gymnastics Kefalonia"
              width={180}
              height={60}
              priority
              sizes="180px"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary font-medium transition-colors text-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium transition-colors text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

