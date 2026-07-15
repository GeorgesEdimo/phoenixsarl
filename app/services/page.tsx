"use client"

import { useLanguage } from '@/components/language-provider'
import { FileText, Globe, Truck, Shield, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: FileText,
      title: t('services.service1'),
      description: t('services.service1_desc'),
      features: [
        'Consulting personnalisé',
        'Gestion de projet',
        'Formation professionnelle',
        'Support technique'
      ]
    },
    {
      icon: Globe,
      title: t('services.service2'),
      description: t('services.service2_desc'),
      features: [
        'Import-Export',
        'Distribution',
        'Sourcing',
        'Négoce international'
      ]
    },
    {
      icon: Truck,
      title: t('services.service3'),
      description: t('services.service3_desc'),
      features: [
        'Transport routier',
        'Logistique entrepôt',
        'Supply chain',
        'Livraison express'
      ]
    },
    {
      icon: Shield,
      title: t('services.service4'),
      description: t('services.service4_desc'),
      features: [
        'Dédouanement',
        'Transit maritime',
        'Transit aérien',
        'Conseil douanier'
      ]
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
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Image Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/services-image.jpg"
                alt={t('services.image_alt')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/b.png"
            alt={t('services.why_choose_bg_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-primary-50/95 dark:from-gray-900/95 dark:to-gray-800/95 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-sky-500 to-primary-500 rounded-2xl px-6 py-3 shadow-lg">
                <Sparkles className="h-6 w-6 text-white mx-auto" />
              </div>
              <div className="text-center pt-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-primary-600 bg-clip-text text-transparent mb-4">
                  {t('services.why_title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {t('services.why_subtitle')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitItem
                title={t('services.benefit1')}
                description={t('services.benefit1_desc')}
                color="primary"
              />
              <BenefitItem
                title={t('services.benefit2')}
                description={t('services.benefit2_desc')}
                color="sky"
              />
              <BenefitItem
                title={t('services.benefit3')}
                description={t('services.benefit3_desc')}
                color="accent"
              />
              <BenefitItem
                title={t('services.benefit4')}
                description={t('services.benefit4_desc')}
                color="flame"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-sky-100 dark:border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/10 to-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-primary-500/10 to-sky-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-primary-500 rounded-2xl shadow-lg mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-primary-600 bg-clip-text text-transparent">
                  {t('services.cta_title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {t('services.cta_desc')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-primary-500 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-primary-600 transition-all transform hover:scale-105 shadow-lg"
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

function ServiceCard({ icon: Icon, title, description, features, index }: any) {
  const colors = ['primary', 'sky', 'accent', 'flame']
  const color = colors[index % colors.length]
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
    flame: 'from-flame-500 to-flame-600',
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
        <Icon className="h-8 w-8 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
      <ul className="space-y-3">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BenefitItem({ title, description, color }: { title: string, description: string, color: string }) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
    flame: 'from-flame-500 to-flame-600',
  }

  return (
    <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 group">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
        <CheckCircle className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
}
