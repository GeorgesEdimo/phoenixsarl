"use client"

import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert(t('contact.success_message'))
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20 animate-gradient-x" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent animate-fade-in-up">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 border border-primary-200 dark:border-primary-800 rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-2xl transition-all">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">{t('contact.form_title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-400 dark:hover:border-primary-500"
                    placeholder={t('contact.name_placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-400 dark:hover:border-primary-500"
                    placeholder={t('contact.email_placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-400 dark:hover:border-primary-500"
                    placeholder={t('contact.phone_placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('contact.service')} *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-400 dark:hover:border-primary-500"
                  >
                    <option value="">{t('contact.service_placeholder')}</option>
                    <option value="services">{t('contact.service_option_services')}</option>
                    <option value="commerce">{t('contact.service_option_commerce')}</option>
                    <option value="logistics">{t('contact.service_option_logistics')}</option>
                    <option value="customs">{t('contact.service_option_customs')}</option>
                    <option value="quote">{t('contact.service_option_quote')}</option>
                    <option value="other">{t('contact.service_option_other')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder={t('contact.message_placeholder')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center space-x-2"
                >
                  <span>{t('contact.send')}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-6">{t('contact.info_title')}</h2>
                <div className="space-y-6">
                  <ContactItem
                    icon={MapPin}
                    label={t('contact.address')}
                    value={t('contact.address_value')}
                  />
                  <ContactItem
                    icon={Phone}
                    label={t('contact.phone_label')}
                    value={t('contact.phone_value')}
                  />
                  <ContactItem
                    icon={Mail}
                    label={t('contact.email_label')}
                    value={t('contact.email_value')}
                  />
                  <ContactItem
                    icon={Clock}
                    label={t('contact.hours_label')}
                    value={t('contact.hours_value')}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-900 border border-accent-200 dark:border-accent-800 rounded-2xl p-6 space-y-4 shadow-md hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('contact.quick_response_title')}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('contact.quick_response_text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.7346789123456!2d11.5024!3d3.8488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTAnNTUuNyJOIDExcDMwJzA4LjYiRQ!5e0!3m2!1sen!2scm!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.map_title')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Image Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/contact-image.jpg"
                alt={t('contact.image_alt')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-900 dark:group-hover:to-primary-800 transition-all">
        <Icon className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        <p className="text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{value}</p>
      </div>
    </div>
  )
}
