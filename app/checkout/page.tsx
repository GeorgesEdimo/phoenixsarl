"use client"

/**
 * Phoenix International SARL - Site Web Officiel
 * 
 * Copyright © 2024 Phoenix International SARL. Tous droits réservés.
 * 
 * Développé par Georges Edimo
 * Développeur Full Stack | Expert en React, Next.js, TypeScript
 * Portfolio : https://georgesedimo.com
 * 
 * Ce code est la propriété exclusive de Phoenix International SARL.
 * Toute reproduction, modification, distribution ou utilisation non autorisée
 * est strictement interdite sans le consentement écrit préalable.
 */

import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/components/language-provider'
import { 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  Lock
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Page de checkout - Formulaire de commande avec informations client et paiement
export default function CheckoutPage() {
  // Accès au contexte du panier pour récupérer les articles et les fonctions
  const { cart, getCartTotal, clearCart } = useCart()
  const { t } = useLanguage()
  const router = useRouter()
  
  // État pour le moyen de paiement sélectionné (Orange Money, MTN Mobile Money, Visa)
  const [selectedPayment, setSelectedPayment] = useState<'orange' | 'mtn' | 'visa'>('orange')
  // État pour le traitement du paiement (affiche un spinner pendant le traitement)
  const [isProcessing, setIsProcessing] = useState(false)
  // État pour les données du formulaire de commande
  const [formData, setFormData] = useState({
    firstName: '', // Prénom du client
    lastName: '', // Nom du client
    email: '', // Email du client
    phone: '', // Téléphone du client
    address: '', // Adresse de livraison
    city: '', // Ville
    country: 'Cameroun', // Pays (par défaut: Cameroun)
    paymentPhone: '' // Numéro de téléphone pour le paiement mobile
  })

  // Formater le prix en FCFA avec séparateur de milliers français
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Soumettre le formulaire de commande
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simuler le traitement du paiement (2 secondes)
    // Dans une vraie application, cela serait remplacé par un appel API à l'agrégateur de paiement
    setTimeout(() => {
      // Créer l'objet commande avec toutes les informations
      const order = {
        id: `ORD-${Date.now()}`, // ID unique basé sur le timestamp
        items: cart, // Articles du panier
        total: getCartTotal() * 1.1925, // Total avec TVA (19.25%)
        customer: formData, // Informations du client
        paymentMethod: selectedPayment, // Méthode de paiement choisie
        status: 'En attente', // Statut initial de la commande
        date: new Date().toISOString() // Date de la commande
      }

      // Sauvegarder la commande dans localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      // Vider le panier après la commande
      clearCart()

      // Rediriger vers la page de confirmation avec l'ID de la commande
      router.push(`/order-confirmation?orderId=${order.id}`)
    }, 2000)
  }

  // Si le panier est vide, afficher un message et rediriger vers la boutique
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Panier vide</h1>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all"
            >
              <span>Retour à la boutique</span>
            </Link>
          </div>
        </div>
      '</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête de la page */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Finaliser la commande</h1>
            <p className="text-gray-600 dark:text-gray-400">Complétez vos informations pour procéder au paiement</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de checkout - prend 2/3 de la largeur sur grand écran */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section Informations personnelles */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Informations personnelles</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+237 693 674 211"
                    />
                  </div>
                </div>
              </div>

              {/* Section Adresse de livraison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Adresse de livraison</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Rue 4.771"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Yaoundé"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pays *
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Méthode de paiement */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Méthode de paiement</span>
                </h2>
                
                <div className="space-y-4">
                  {/* Option Orange Money - Paiement mobile */}
                  <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'orange' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="orange"
                      checked={selectedPayment === 'orange'}
                      onChange={() => setSelectedPayment('orange')}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Orange Money</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Paiement mobile sécurisé</p>
                      </div>
                    </div>
                    {selectedPayment === 'orange' && (
                      <CheckCircle className="h-6 w-6 text-orange-500" />
                    )}
                  </label>

                  {/* Option MTN Mobile Money - Paiement mobile */}
                  <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'mtn' 
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-700'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="mtn"
                      checked={selectedPayment === 'mtn'}
                      onChange={() => setSelectedPayment('mtn')}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">MTN Mobile Money</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Paiement mobile sécurisé</p>
                      </div>
                    </div>
                    {selectedPayment === 'mtn' && (
                      <CheckCircle className="h-6 w-6 text-yellow-500" />
                    )}
                  </label>

                  {/* Option Carte Visa - Paiement par carte bancaire */}
                  <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === 'visa' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="visa"
                      checked={selectedPayment === 'visa'}
                      onChange={() => setSelectedPayment('visa')}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Carte Visa</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Paiement par carte bancaire</p>
                      </div>
                    </div>
                    {selectedPayment === 'visa' && (
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    )}
                  </label>
                </div>

                {/* Champ téléphone pour paiement mobile (Orange Money/MTN) */}
                {(selectedPayment === 'orange' || selectedPayment === 'mtn') && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de téléphone pour le paiement *
                    </label>
                    <input
                      type="tel"
                      name="paymentPhone"
                      required
                      value={formData.paymentPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+237 693 674 211"
                    />
                  </div>
                )}

                {/* Champs détails carte bancaire pour Visa */}
                {selectedPayment === 'visa' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Numéro de carte *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date d'expiration *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          required
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cardCvv"
                          required
                          maxLength={4}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom sur la carte *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="JEAN DUPONT"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Récapitulatif de commande - prend 1/3 de la largeur sur grand écran */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Récapitulatif de commande</h2>
                
                {/* Liste des articles du panier */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">{item.name.substring(0, 2)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qté: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Calcul des totaux (sous-total, livraison, TVA, total) */}
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Sous-total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Livraison</span>
                    <span>5,000 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>TVA (19.25%)</span>
                    <span>{formatPrice(getCartTotal() * 0.1925)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>{formatPrice(getCartTotal() * 1.1925 + 5000)}</span>
                    </div>
                  </div>
                </div>

                {/* Bouton de soumission du formulaire */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Payer {formatPrice(getCartTotal() * 1.1925 + 5000)}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Notice de sécurité pour rassurer le client */}
                <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>Paiement sécurisé via agrégateur de paiement certifié</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
