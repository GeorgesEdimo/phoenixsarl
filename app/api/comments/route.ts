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

// GET - Récupérer tous les commentaires
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('articleId')
    
    const comments = await prisma.comment.findMany({
      where: articleId ? { articleId } : undefined,
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des commentaires' }, { status: 500 })
  }
}

// POST - Créer un nouveau commentaire
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const comment = await prisma.comment.create({
      data: {
        articleId: body.articleId,
        author: body.author,
        email: body.email,
        content: body.content,
        status: body.status || 'pending'
      }
    })
    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du commentaire' }, { status: 500 })
  }
}
