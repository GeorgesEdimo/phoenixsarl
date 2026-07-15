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

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Interface définissant la structure d'un article dans le panier
export interface CartItem {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  quantity: number
}

// Interface définissant les méthodes et données disponibles dans le contexte du panier
interface CartContextType {
  cart: CartItem[] // Liste des articles dans le panier
  addToCart: (product: Omit<CartItem, 'quantity'>) => void // Ajouter un produit au panier
  removeFromCart: (id: number) => void // Supprimer un article du panier
  updateQuantity: (id: number, quantity: number) => void // Modifier la quantité d'un article
  clearCart: () => void // Vider le panier
  getCartTotal: () => number // Calculer le total du panier
  getCartCount: () => number // Compter le nombre d'articles dans le panier
}

// Création du contexte React pour le panier
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider du contexte du panier - enveloppe l'application pour fournir l'état du panier
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Charger le panier depuis localStorage au montage du composant
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Ajouter un produit au panier
  // Si le produit existe déjà, on incrémente sa quantité
  // Sinon, on l'ajoute avec une quantité de 1
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Supprimer un article du panier par son ID
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Mettre à jour la quantité d'un article
  // Si la quantité est <= 0, on supprime l'article du panier
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Vider complètement le panier
  const clearCart = () => {
    setCart([])
  }

  // Calculer le total du panier (prix * quantité pour chaque article)
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Compter le nombre total d'articles dans le panier
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  // Fournir le contexte du panier aux composants enfants
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook personnalisé pour utiliser le contexte du panier
// Lance une erreur si utilisé hors du CartProvider
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
