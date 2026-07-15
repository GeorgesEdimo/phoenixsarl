"use client"

import Link from 'next/link'
import { useLanguage } from './language-provider'
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-primary-200 dark:border-primary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Phoenix International SARL</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('about.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1CiboyH8Js/?mibextid=wwXIfr" className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-110 hover:shadow-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/phoenix-international-sarl-49b86b41a?trk=contact-info" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center text-white hover:from-sky-600 hover:to-sky-700 transition-all transform hover:scale-110 hover:shadow-lg">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center text-white hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-110 hover:shadow-lg">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('nav.partners')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('services.service1')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('services.service2')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('services.service3')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:translate-x-1 transform inline-block">
                  {t('services.service4')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Yaoundé, Rue 4.771, Cameroun
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  +237 693 674 211 / +237 675 385 034
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  phoenixinternationalsarl2@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-200 dark:border-primary-800 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Développé par <a href="https://georgesedimo.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">Georges Edimo</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
