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

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Récupérer un produit par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id }
    })
    if (!product) {
      return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du produit' }, { status: 500 })
  }
}

// PUT - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        image: body.image,
        description: body.description,
        stock: body.stock,
        featured: body.featured
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du produit' }, { status: 500 })
  }
}

// DELETE - Supprimer un produit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Produit supprimé' })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du produit' }, { status: 500 })
  }
}
