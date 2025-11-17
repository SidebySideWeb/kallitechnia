import type React from "react"
import type { Metadata } from "next"
import { Poppins, Nunito_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-nunito",
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Γυμναστική Καλλιτεχνία Κεφαλονιάς",
    template: "%s | Γυμναστική Καλλιτεχνία Κεφαλονιάς"
  },
  description: "Σύλλογος Γυμναστικής Καλλιτεχνίας στην Κεφαλονιά. Προάγουμε την αθλητική αριστεία και την υγιή ανάπτυξη των παιδιών.",
  keywords: ["γυμναστική", "καλλιτεχνική γυμναστική", "κεφαλονιά", "σύλλογος", "αθλητισμός"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={`${nunitoSans.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
