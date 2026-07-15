"use client"

import { useLanguage } from '@/components/language-provider'
import { Sparkles, Globe, Target, Users, Award, TrendingUp, Heart } from 'lucide-react'

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/about-image.jpg"
            alt={t('about.hero_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/80 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
              {t('about.title')}
            </h1>
            <p className="text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('about.description')}
                </p>
              </div>
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="/about-image.jpg"
                  alt={t('about.hero_alt')}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 border border-primary-200 dark:border-primary-800 rounded-2xl p-8 space-y-4 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('about.mission')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('about.mission_text')}</p>
              </div>
              <div className="bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-900 border border-accent-200 dark:border-accent-800 rounded-2xl p-8 space-y-4 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('about.vision')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('about.vision_text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/d.png"
            alt={t('about.values_bg_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-primary-50/95 dark:from-gray-900/95 dark:to-gray-800/95 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border border-white/20 dark:border-gray-700/20 max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-sky-500 rounded-2xl px-6 py-3 shadow-lg">
              <Heart className="h-6 w-6 text-white mx-auto" />
            </div>
            <div className="text-center pt-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-sky-600 bg-clip-text text-transparent mb-4">
                {t('about.values_title')}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {t('about.values_subtitle')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard
              icon={Sparkles}
              title={t('about.value1')}
              description={t('about.value1_desc')}
              color="primary"
            />
            <ValueCard
              icon={Users}
              title={t('about.value2')}
              description={t('about.value2_desc')}
              color="sky"
            />
            <ValueCard
              icon={TrendingUp}
              title={t('about.value3')}
              description={t('about.value3_desc')}
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/b.png"
            alt={t('about.stats_bg_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/80 via-accent-500/80 to-sky-500/80 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard number={t('about.stat1_number')} label={t('about.stat1')} />
            <StatCard number={t('about.stat2_number')} label={t('about.stat2')} />
            <StatCard number={t('about.stat3_number')} label={t('about.stat3')} />
            <StatCard number={t('about.stat4_number')} label={t('about.stat4')} />
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 border border-primary-200 dark:border-primary-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-6 text-center">
                {t('about.legal_title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-primary-100 dark:border-primary-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('about.rccm_label')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{t('about.rccm_value')}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-primary-100 dark:border-primary-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('about.niu_label')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{t('about.niu_value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    sky: 'from-sky-500 to-sky-600',
    accent: 'from-accent-500 to-accent-600',
  }

  return (
    <div className="text-center space-y-4 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
        <Icon className="h-10 w-10 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="text-center space-y-2 bg-white/20 backdrop-blur rounded-2xl p-6 hover:bg-white/30 transition-all">
      <div className="text-4xl md:text-5xl font-bold text-white">{number}</div>
      <div className="text-sm text-white/90 font-medium">{label}</div>
    </div>
  )
}
