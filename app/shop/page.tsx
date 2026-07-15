"use client"

import { useLanguage } from '@/components/language-provider'
import { useCart } from '@/contexts/CartContext'
import { ShoppingBag, Clock, Bell, ArrowRight, Package, Truck, Shield, CreditCard, Sparkles, Search, Filter, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Shop() {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products = [
    { id: 1, name: 'Ordinateur Portable HP', category: 'Électronique', price: 450000, image: '/product-1.jpg', description: 'Ordinateur portable haute performance' },
    { id: 2, name: 'Imprimante Canon', category: 'Bureautique', price: 125000, image: '/product-2.jpg', description: 'Imprimante multifonction professionnelle' },
    { id: 3, name: 'Clavier Sans Fil', category: 'Accessoires', price: 25000, image: '/product-3.jpg', description: 'Clavier ergonomique sans fil' },
    { id: 4, name: 'Souris Logitech', category: 'Accessoires', price: 18000, image: '/product-4.jpg', description: 'Souris sans fil précise' },
    { id: 5, name: 'Écran Dell 24"', category: 'Électronique', price: 180000, image: '/product-5.jpg', description: 'Moniteur Full HD IPS' },
    { id: 6, name: 'Disque Dur Externe 1TB', category: 'Stockage', price: 65000, image: '/product-6.jpg', description: 'Disque dur portable USB 3.0' },
    { id: 7, name: 'Webcam HD', category: 'Accessoires', price: 35000, image: '/product-7.jpg', description: 'Webcam 1080p avec micro' },
    { id: 8, name: 'Casque Audio', category: 'Accessoires', price: 42000, image: '/product-8.jpg', description: 'Casque à réduction de bruit' },
    { id: 9, name: 'Routeur WiFi', category: 'Réseau', price: 55000, image: '/product-9.jpg', description: 'Routeur dual-band AC1200' },
  ]

  const categories = ['all', 'Électronique', 'Bureautique', 'Accessoires', 'Stockage', 'Réseau']

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/shop-hero.jpg"
            alt={t('store.hero_alt')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-2 rounded-full shadow-lg animate-bounce">
              <Clock className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">{t('store.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
              {t('store.title')}
            </h1>
            <p className="text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('store.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? 'Tous' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={Package}
              title={t('shop.feature1')}
              description={t('shop.feature1_desc')}
              image="/feature-1.jpg"
            />
            <FeatureCard
              icon={Truck}
              title={t('shop.feature2')}
              description={t('shop.feature2_desc')}
              image="/feature-2.jpg"
            />
            <FeatureCard
              icon={Shield}
              title={t('shop.feature3')}
              description={t('shop.feature3_desc')}
              image="/feature-3.jpg"
            />
            <FeatureCard
              icon={CreditCard}
              title={t('shop.feature4')}
              description={t('shop.feature4_desc')}
              image="/feature-4.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-primary-100 dark:border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-lg mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  {t('shop.cta_title')}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {t('shop.cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center space-x-2"
                  >
                    <span>{t('cta.contact_us')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all transform hover:scale-105"
                  >
                    {t('shop.cta_discover')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, onAddToCart }: { product: any, onAddToCart: () => void }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-16 w-16 text-primary-400 dark:text-primary-600" />
        </div>
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <ShoppingCart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{formatPrice(product.price)}</p>
          <button 
            onClick={onAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, image }: { icon: any, title: string, description: string, image: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group h-48">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <div className="relative z-20 p-6 h-full flex flex-col justify-end space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-2">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </div>
  )
}

function CategoryCard({ title, items, image }: { title: string, items: string[], image: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 group h-64">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <div className="relative z-20 p-6 h-full flex flex-col justify-end space-y-3">
        <h3 className="font-semibold text-white text-lg">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-white/90 flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
