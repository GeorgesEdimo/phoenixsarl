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
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Envoyer l'email à Phoenix International SARL
    const { data, error } = await resend.emails.send({
      from: 'Phoenix International SARL <contact@phoenixinternational.com>',
      to: ['contact@phoenixinternationalsarl.com'],
      subject: `Nouveau message de contact - ${subject || 'Sans sujet'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Phoenix International SARL</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Nouveau message de contact</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-top: 0;">Détails du message</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Nom :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Email :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${email}</span>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Téléphone :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${phone}</span>
            </div>
            ` : ''}
            
            ${subject ? `
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Sujet :</strong>
              <span style="color: #6b7280; margin-left: 10px;">${subject}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #374151;">Message :</strong>
              <div style="color: #6b7280; margin-top: 10px; padding: 15px; background: white; border-radius: 5px; border: 1px solid #e5e7eb;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
              <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
              <p>Phoenix International SARL - Services, Commerce, Logistique & Transport</p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    // Envoyer un email de confirmation à l'expéditeur
    await resend.emails.send({
      from: 'Phoenix International SARL <contact@phoenixinternational.com>',
      to: [email],
      subject: 'Confirmation de votre message - Phoenix International SARL',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Phoenix International SARL</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Confirmation de réception</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${name},</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Nous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à 
              Phoenix International SARL.
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              Notre équipe va traiter votre demande dans les plus brefs délais et vous répondra 
              à l'adresse email que vous avez fournie : <strong>${email}</strong>
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background: white; border-radius: 5px; border-left: 4px solid #f59e0b;">
              <p style="color: #374151; margin: 0;">
                <strong>Résumé de votre message :</strong>
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0;">
                ${subject ? `Sujet : ${subject}<br>` : ''}
                ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
              </p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              Pour toute question urgente, n'hésitez pas à nous contacter directement par téléphone.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #374151; margin: 0;">
                Cordialement,<br>
                <strong>L'équipe Phoenix International SARL</strong>
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 14px;">
                Services, Commerce, Logistique & Transport
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
