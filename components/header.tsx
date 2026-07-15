"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from './language-provider'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from 'next-themes'
import { Menu, X, Globe, Sun, Moon, ChevronDown, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const { getCartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-200 dark:border-primary-800 bg-gradient-to-r from-white via-primary-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 duration-300">
              <Image
                src="/logophoenixsarl.jpg"
                alt={t('header.logo_alt')}
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{t('header.company_name')}</h1>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{t('header.company_type')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              {t('nav.about')}
            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              {t('nav.services')}
            </Link>
            <Link href="/partners" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              {t('nav.partners')}
            </Link>
            <Link href="/news" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              Actualités
            </Link>
            <Link href="/shop" className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-110 transform duration-300">
              {t('nav.shop')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors hover:scale-105 transform"
              >
                <Globe className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{language.toUpperCase()}</span>
                <ChevronDown className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-800 animate-fade-in-up">
                  <button
                    onClick={() => { setLanguage('fr'); setLangOpen(false) }}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      language === 'fr' && "bg-gray-100 dark:bg-gray-700"
                    )}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setLangOpen(false) }}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      language === 'en' && "bg-gray-100 dark:bg-gray-700"
                    )}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t('header.toggle_theme')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl text-sm font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('cta.contact_us')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            <Link
              href="/"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/services"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link
              href="/partners"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.partners')}
            </Link>
            <Link
              href="/news"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Actualités
            </Link>
            <Link
              href="/shop"
              className="block text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.shop')}
            </Link>
            
            {/* Cart in Mobile Menu */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Panier</span>
              {getCartCount() > 0 && (
                <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <button
                  onClick={() => setLanguage('fr')}
                  className={cn(
                    "text-sm font-medium px-2 py-1 rounded transition-colors",
                    language === 'fr' ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "text-sm font-medium px-2 py-1 rounded transition-colors",
                    language === 'en' ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
