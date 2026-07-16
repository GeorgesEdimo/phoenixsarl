import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import CookieBanner from "@/components/cookie-banner";

/**
 * Phoenix International SARL - Site Web Officiel
 * 
 * Copyright © 2024 Phoenix International SARL. Tous droits réservés.
 * 
 * Développé par Georges Edimo
 * Développeur Full Stack | Expert en React, Next.js, TypeScript
 * Spécialisé dans la création d'applications web modernes et performantes
 * Portfolio : https://georgesedimo.com
 * 
 * Compétences :
 * - Frontend : React, Next.js, Vue.js, TailwindCSS
 * - Backend : Node.js, Express, PostgreSQL, MongoDB
 * - DevOps : Docker, CI/CD, AWS, Vercel
 * - Design : UI/UX, Figma, Responsive Design
 * 
 * Passionné par l'innovation technologique et la création de solutions digitales
 * qui transforment les idées en réalité.
 * 
 * Ce code est la propriété exclusive de Phoenix International SARL.
 * Toute reproduction, modification, distribution ou utilisation non autorisée
 * est strictement interdite sans le consentement écrit préalable.
 * 
 * Contact : phoenixinternationalsarl2@gmail.com
 * Site : https://phoenix-international-sarl.com
 */

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phoenix International SARL - Services, Commerce, Logistique & Transport",
  description: "Phoenix International SARL est une entreprise multisectorielle spécialisée dans la prestation de services, le commerce général, le négoce, la logistique et le transport, ainsi que la douane et le transit.",
  keywords: ["Phoenix International SARL", "services", "commerce", "logistique", "transport", "douane", "transit", "Cameroun", "France"],
  metadataBase: new URL('https://phoenixinternational.com'),
  openGraph: {
    title: "Phoenix International SARL - Services, Commerce, Logistique & Transport",
    description: "Phoenix International SARL est une entreprise multisectorielle spécialisée dans la prestation de services, le commerce général, le négoce, la logistique et le transport.",
    url: 'https://phoenixinternational.com',
    siteName: 'Phoenix International SARL',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ChatWidget />
                <CookieBanner />
              </div>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
