import type { ComponentType } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react"

import { defaultFooterData } from "@/lib/content-mappers"

type FooterData = typeof defaultFooterData

interface FooterProps {
  data?: FooterData
}

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
  phone: Phone,
}

export default function Footer({ data = defaultFooterData }: FooterProps) {
  const brand = data.brand ?? defaultFooterData.brand
  const contact = data.contact ?? defaultFooterData.contact
  const links = Array.isArray(data.links?.items) && data.links?.items.length > 0 ? data.links.items : defaultFooterData.links.items
  const socials = Array.isArray(data.socials) && data.socials.length > 0 ? data.socials : defaultFooterData.socials
  const externalLinks = Array.isArray(data.externalLinks) && data.externalLinks.length > 0 ? data.externalLinks : defaultFooterData.externalLinks
  const legalLinks = Array.isArray(data.legalLinks) && data.legalLinks.length > 0 ? data.legalLinks : defaultFooterData.legalLinks

  return (
    <footer className="mt-20 bg-[#311B92] py-[30px] text-[#E0F7FA]">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            {brand.logo_image ? (
              <Image
                src={brand.logo_image}
                alt={brand.name}
                width={234}
                height={78}
                className="mb-4 h-16 w-auto brightness-0 invert"
              />
            ) : (
              <p className="mb-4 text-2xl font-semibold">{brand.name}</p>
            )}
            {brand.tagline && <p className="text-base font-medium">{brand.tagline}</p>}
            {brand.description && <p className="mt-3 text-sm leading-relaxed">{brand.description}</p>}
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">{data.links?.title ?? defaultFooterData.links.title}</h3>
            <ul className="space-y-2">
              {links.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link href={item.href ?? '#'} className="transition-colors hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">{contact.title ?? 'Επικοινωνία'}</h3>
            <ul className="space-y-3 text-sm">
              {contact.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <a href={`mailto:${contact.email}`} className="transition-colors hover:text-secondary">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-4">
                {socials.map((social, index) => {
                  const Icon = socialIcons[social.icon?.toLowerCase?.() ?? ''] ?? SparkIconFallback
                  return (
                    <a
                      key={`${social.href}-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-secondary"
                      aria-label={social.label}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {externalLinks.length > 0 && (
          <div className="mb-6 border-t border-[#4527A0] pt-[30px]">
            <div className="flex flex-wrap justify-center gap-6">
              {externalLinks.map((link, index) => (
                <a
                  key={`${link.href}-${index}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-secondary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#4527A0] pt-[30px] text-sm md:flex-row">
          <p>{data.copyright ?? defaultFooterData.copyright}</p>
          <div className="flex gap-4">
            {legalLinks.map((item, index) => (
              <Link key={`${item.href}-${index}`} href={item.href ?? '#'} className="transition-colors hover:text-secondary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function SparkIconFallback({ className }: { className?: string }) {
  return <span className={`block h-6 w-6 rounded-full border border-current ${className ?? ''}`} />
}
