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

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Home, Package, Download, Mail, Phone, MapPin, CreditCard, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'

// Composant contenu de la page de confirmation de commande
// Wrappé dans Suspense pour gérer useSearchParams côté client
function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') // Récupérer l'ID de commande depuis l'URL
  const [order, setOrder] = useState<any>(null)

  // Charger les détails de la commande depuis localStorage
  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const foundOrder = orders.find((o: any) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  // Formater le prix en FCFA avec séparateur de milliers français
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
  }

  // Retourner l'icône/label correspondant au moyen de paiement
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'orange': return <span className="text-orange-500 font-semibold">Orange Money</span>
      case 'mtn': return <span className="text-yellow-500 font-semibold">MTN Mobile Money</span>
      case 'visa': return <span className="text-blue-500 font-semibold">Carte Visa</span>
      default: return <span>{method}</span>
    }
  }

  // Si la commande n'est pas trouvée, afficher un message d'erreur
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-8">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Commande non trouvée</h1>
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
        <div className="max-w-4xl mx-auto">
          {/* Message de succès avec animation */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Commande confirmée !</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Merci pour votre achat. Votre commande #{order.id} a été enregistrée avec succès.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section Détails de la commande */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Détails de la commande</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Numéro de commande</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{order.id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Date</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(order.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Statut</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-medium">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Méthode de paiement</span>
                  <span className="font-semibold">{getPaymentIcon(order.paymentMethod)}</span>
                </div>
              </div>

              {/* Liste des articles commandés */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Articles commandés</h3>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-primary-400 dark:text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qté: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total payé */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total payé</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Section Informations client */}
            <div className="space-y-6">
              {/* Informations de livraison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Informations de livraison</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{order.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{order.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {order.customer.address}<br />
                        {order.customer.city}, {order.customer.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prochaines étapes pour le client */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prochaines étapes</h2>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Vous recevrez un email de confirmation avec les détails de votre commande.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Nous vous contacterons pour confirmer la livraison.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Le délai de livraison est généralement de 2-5 jours ouvrés.</span>
                  </li>
                </ul>
              </div>

              {/* Boutons d'action (continuer achats, télécharger facture, accueil) */}
              <div className="space-y-3">
                <Link
                  href="/shop"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span>Continuer mes achats</span>
                </Link>
                
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Télécharger la facture</span>
                </button>

                <Link
                  href="/"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Retour à l'accueil</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Lien vers le support client */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Besoin d'aide ?</p>
            <Link
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Contactez notre support client
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Page principale de confirmation de commande
// Wrappée dans Suspense pour gérer le rendu côté client avec useSearchParams
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">Chargement...</p>
          </div>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}
