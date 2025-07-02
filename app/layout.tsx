import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gym Manager - Gestión de Gimnasio",
  description: "Sistema completo para gestionar miembros, pagos y recordatorios de tu gimnasio",
  keywords: ["gimnasio", "gestión", "pagos", "miembros", "recordatorios", "whatsapp"],
  authors: [{ name: "Gym Manager" }],
  creator: "Gym Manager",
  publisher: "Gym Manager",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gym-manager.vercel.app",
    title: "Gym Manager - Gestión de Gimnasio",
    description: "Sistema completo para gestionar miembros, pagos y recordatorios de tu gimnasio",
    siteName: "Gym Manager",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gym Manager - Gestión de Gimnasio",
    description: "Sistema completo para gestionar miembros, pagos y recordatorios de tu gimnasio",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background font-sans antialiased">{children}</div>
      </body>
    </html>
  )
}
