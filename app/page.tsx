"use client"

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import { ArrowRight, Sparkles, Globe, Truck, FileText, Shield, ShoppingBag, Zap } from 'lucide-react'
import ImageCarousel from '@/components/image-carousel'
import { useState, useEffect } from 'react'

export default function Home() {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState('')
  const slogan = t('hero.slogan')
  const typingDuration = 8000 // 8 secondes
  const pauseDuration = 15000 // 15 secondes
  const charDelay = typingDuration / slogan.length // ~296ms par caractère

  useEffect(() => {
    let index = 0
    let isTyping = true

    const typeChar = () => {
      if (isTyping && index < slogan.length) {
        setTypedText(slogan.slice(0, index + 1))
        index++
        setTimeout(typeChar, charDelay)
      } else if (index >= slogan.length) {
        isTyping = false
        setTimeout(() => {
          index = 0
          setTypedText('')
          isTyping = true
          typeChar()
        }, pauseDuration)
      }
    }

    typeChar()
    return () => {
      isTyping = false
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageCarousel
            images={['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg']}
            altText={t('hero.carousel_alt')}
            interval={6000}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer animate-bounce">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">{t('hero.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight animate-fade-in-up">
              {t('hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-accent-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s', fontFamily: 'monospace' }}>
              {typedText}<span className="animate-pulse">|</span>
            </p>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-bold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-110 hover:shadow-xl inline-flex items-center justify-center space-x-2"
              >
                <span>{t('hero.cta1')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-bold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all transform hover:scale-110 hover:shadow-lg"
              >
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-12 shadow-xl border border-primary-100 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl px-6 py-3 shadow-lg">
              <Globe className="h-6 w-6 text-white mx-auto" />
            </div>
            <div className="text-center pt-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={FileText}
              title={t('services.service1')}
              description={t('services.service1_desc')}
              color="primary"
            />
            <ServiceCard
              icon={Globe}
              title={t('services.service2')}
              description={t('services.service2_desc')}
              color="sky"
            />
            <ServiceCard
              icon={Truck}
              title={t('services.service3')}
              description={t('services.service3_desc')}
              color="accent"
            />
            <ServiceCard
              icon={Shield}
              title={t('services.service4')}
              description={t('services.service4_desc')}
              color="flame"
            />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
            >
              <span>{t('cta.learn_more')}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl opacity-20 animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent relative z-10">
                  {t('about.title')}
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t('about.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('about.mission')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('about.mission_text')}</p>
                  </div>
                </div>
              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t('about.vision')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('about.vision_text')}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
              >
                <span>{t('cta.learn_more')}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-500/30 via-accent-500/30 to-sky-500/30 rounded-3xl flex items-center justify-center animate-float">
                <div className="text-center space-y-4 p-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 via-accent-500 to-sky-500 rounded-full flex items-center justify-center shadow-2xl animate-spin-slow">
                    <ShoppingBag className="h-16 w-16 text-white" />
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{t('footer.company_name')}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{t('footer.company_type')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Store Teaser */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/shop-hero.jpg"
            alt={t('hero.store_teaser_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/80 via-accent-500/80 to-sky-500/80 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t('store.title')}
            </h2>
            <p className="text-xl text-white/90">
              {t('store.subtitle')}
            </p>
            <p className="text-white/80">
              {t('store.description')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>{t('store.cta')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-12 shadow-xl">
            <Zap className="h-16 w-16 mx-auto text-primary-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {t('hero.cta_title')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t('hero.cta_text')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>{t('cta.contact_us')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
    flame: 'from-flame-500 to-flame-600',
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 space-y-4 group">
      <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
        <Icon className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
