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

import { prisma } from './prisma'

async function main() {
  // Créer des produits de démonstration
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Ordinateur Portable HP 15',
        category: 'Informatique',
        price: 450000,
        image: '/images/laptop.jpg',
        description: 'Ordinateur portable HP 15.6" Intel Core i5, 8GB RAM, 256GB SSD',
        stock: 10,
        featured: true
      },
      {
        name: 'Imprimante Epson L3250',
        category: 'Bureautique',
        price: 120000,
        image: '/images/printer.jpg',
        description: 'Imprimante multifonction Epson EcoTank L3250, impression, scan, copie',
        stock: 15,
        featured: true
      },
      {
        name: 'Clavier Sans Fil Logitech',
        category: 'Accessoires',
        price: 35000,
        image: '/images/keyboard.jpg',
        description: 'Clavier sans fil Logitech MK270, compact et ergonomique',
        stock: 25,
        featured: false
      },
      {
        name: 'Souris Sans Fil Microsoft',
        category: 'Accessoires',
        price: 25000,
        image: '/images/mouse.jpg',
        description: 'Souris sans fil Microsoft Sculpt, confortable et précise',
        stock: 30,
        featured: false
      },
      {
        name: 'Écran Samsung 24"',
        category: 'Informatique',
        price: 180000,
        image: '/images/monitor.jpg',
        description: 'Écran Samsung 24" Full HD, IPS, 75Hz',
        stock: 8,
        featured: true
      }
    ]
  })

  // Créer des articles de démonstration
  const articles = await prisma.article.createMany({
    data: [
      {
        title: 'Phoenix International SARL lance son nouveau service de logistique',
        excerpt: 'Nous sommes ravis d\'annoncer le lancement de notre nouveau service de logistique internationale.',
        content: 'Phoenix International SARL est fier d\'annoncer l\'expansion de ses services avec le lancement d\'une nouvelle division logistique. Ce service permettra aux entreprises de bénéficier de solutions de transport optimisées.',
        author: 'Équipe Phoenix',
        category: 'Entreprise',
        status: 'Publié'
      },
      {
        title: 'Partenariat stratégique avec Le Pillier Ltd',
        excerpt: 'Phoenix International SARL signe un accord de partenariat majeur avec Le Pillier Ltd.',
        content: 'Ce partenariat stratégique marque une étape importante dans notre développement. Ensemble, nous pourrons offrir des solutions plus complètes à nos clients.',
        author: 'Direction',
        category: 'Partenariat',
        status: 'Publié'
      },
      {
        title: 'Ouverture de notre nouvelle boutique en ligne',
        excerpt: 'Découvrez notre nouvelle plateforme e-commerce avec une large gamme de produits.',
        content: 'Notre boutique en ligne est désormais opérationnelle ! Vous pouvez désormais commander nos produits directement depuis notre site web.',
        author: 'Équipe Commerce',
        category: 'Commerce',
        status: 'Publié'
      },
      {
        title: 'Certification ISO 9001 obtenue',
        excerpt: 'Phoenix International SARL obtient la certification ISO 9001 pour la qualité de ses services.',
        content: 'Cette certification témoigne de notre engagement envers l\'excellence et la satisfaction de nos clients.',
        author: 'Qualité',
        category: 'Qualité',
        status: 'Publié'
      },
      {
        title: 'Recrutement : Rejoignez notre équipe',
        excerpt: 'Phoenix International SARL recrute plusieurs profils pour accompagner sa croissance.',
        content: 'Nous recherchons des talents motivés pour rejoindre nos équipes dans différents domaines : logistique, commerce, administration et informatique.',
        author: 'RH',
        category: 'RH',
        status: 'Publié'
      }
    ]
  })

  console.log('Données de démonstration créées avec succès !')
  console.log(`${products.count} produits créés`)
  console.log(`${articles.count} articles créés`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
