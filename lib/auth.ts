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

// Fonction utilitaire pour vérifier l'authentification admin
export function checkAdminAuth(): boolean {
  if (typeof window === 'undefined') return false
  
  const isAuthenticated = localStorage.getItem('adminAuthenticated')
  return isAuthenticated === 'true'
}

// Fonction pour connecter l'admin
export function loginAdmin(password: string): boolean {
  // Mot de passe par défaut (à changer en production)
  const ADMIN_PASSWORD = 'phoenix2024'
  
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('adminAuthenticated', 'true')
    localStorage.setItem('adminLoginTime', new Date().toISOString())
    return true
  }
  return false
}

// Fonction pour déconnecter l'admin
export function logoutAdmin(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminLoginTime')
}

// Fonction pour vérifier si la session est expirée (24h)
export function isSessionExpired(): boolean {
  if (typeof window === 'undefined') return true
  
  const loginTime = localStorage.getItem('adminLoginTime')
  if (!loginTime) return true
  
  const loginDate = new Date(loginTime)
  const now = new Date()
  const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
  
  return hoursSinceLogin > 24
}
