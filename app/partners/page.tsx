"use client"

import { useLanguage } from '@/components/language-provider'
import { Building2, Globe, Handshake, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Partners() {
  const { t } = useLanguage()

  const partners = [
    {
      icon: Building2,
      name: t('partners.aritma'),
      description: t('partners.aritma_desc'),
      sector: 'Social',
      image: '/logo-aritma.jpg'
    },
    {
      icon: Globe,
      name: t('partners.ambassade'),
      description: t('partners.ambassade_desc'),
      sector: 'Institutionnel',
      image: '/camerounembleme.jpg'
    },
    {
      icon: Handshake,
      name: t('partners.pilier'),
      description: t('partners.pilier_desc'),
      sector: 'Développement Durable',
      image: '/Logo-pilier-ltd.jpg'
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20 animate-gradient-x" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent animate-fade-in-up">
              {t('partners.title')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('partners.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Image Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/partners-image.jpg"
                alt={t('partners.image_alt')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/c.png"
            alt={t('partners.benefits_bg_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-accent-50/95 dark:from-gray-900/95 dark:to-gray-800/95 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-500 to-flame-500 rounded-2xl px-6 py-3 shadow-lg">
                <Handshake className="h-6 w-6 text-white mx-auto" />
              </div>
              <div className="text-center pt-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-600 to-flame-600 bg-clip-text text-transparent mb-4">
                  {t('partners.benefits_title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {t('partners.benefits_subtitle')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                title={t('partners.benefit1')}
                description={t('partners.benefit1_desc')}
                color="primary"
              />
              <BenefitCard
                title={t('partners.benefit2')}
                description={t('partners.benefit2_desc')}
                color="sky"
              />
              <BenefitCard
                title={t('partners.benefit3')}
                description={t('partners.benefit3_desc')}
                color="accent"
              />
              <BenefitCard
                title={t('partners.benefit4')}
                description={t('partners.benefit4_desc')}
                color="flame"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50 via-white to-flame-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-accent-100 dark:border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent-500/10 to-flame-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-flame-500/10 to-accent-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-flame-500 rounded-2xl shadow-lg mb-4">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-600 to-flame-600 bg-clip-text text-transparent">
                  {t('partners.cta_title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {t('partners.cta_desc')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-flame-500 text-white rounded-xl font-semibold hover:from-accent-600 hover:to-flame-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span>{t('cta.contact_us')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PartnerCard({ icon: Icon, name, description, sector, index, image }: any) {
  const colors = ['primary', 'sky', 'accent']
  const color = colors[index % colors.length]
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group">
      {image ? (
        <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
          <Icon className="h-10 w-10 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
        </div>
      )}
      <div className="space-y-3">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-semibold rounded-full">
          {sector}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{name}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}

function BenefitCard({ title, description, color }: { title: string, description: string, color: string }) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
    flame: 'from-flame-500 to-flame-600',
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 group">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
          <div className="w-2 h-2 bg-primary-500 rounded-full" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  )
}
