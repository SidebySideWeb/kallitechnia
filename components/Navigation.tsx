"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { defaultHeaderData } from "@/lib/content-mappers"

type HeaderData = typeof defaultHeaderData & {
  logo_image?: string
}

interface NavigationProps {
  data?: HeaderData
}

export default function Navigation({ data = defaultHeaderData }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = Array.isArray(data.menu) && data.menu.length > 0 ? data.menu : defaultHeaderData.menu
  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-[#F5F5F5]/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href={data.logo_text ? '/' : '#'} className="flex items-center gap-3">
            {data.logo_image ? (
              <Image
                src={data.logo_image}
                alt={data.logo_text ?? 'Kallitechnia'}
                width={180}
                height={60}
                priority
                sizes="180px"
                className="h-16 w-auto"
              />
            ) : (
              <span className="text-2xl font-semibold text-primary">{data.logo_text ?? defaultHeaderData.logo_text}</span>
            )}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <Link
                key={`${item.link ?? item.label}`}
                href={item.link ?? '#'}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            {data.cta?.label && (
              <Button asChild className="rounded-full bg-primary px-6 text-base shadow-md hover:bg-primary/90">
                <Link href={data.cta.link ?? '#'}>{data.cta.label}</Link>
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle navigation">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="border-t border-border py-4">
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={`${item.link ?? item.label}`}
                    href={item.link ?? '#'}
                    className="py-2 text-lg font-medium text-foreground transition-colors hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                {data.cta?.label && (
                  <Button onClick={closeMenu} asChild className="rounded-full bg-primary text-base">
                    <Link href={data.cta.link ?? '#'}>{data.cta.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
