"use client"

import { useLanguage } from '@/components/language-provider'
import { Calendar, Clock, User, MessageCircle, Share2, Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ArticleContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const articleId = searchParams.get('id')
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const article = {
    id: articleId,
    title: "Phoenix International SARL lance son nouveau service de logistique",
    excerpt: "Nous sommes ravis d'annoncer le lancement de notre nouveau service de logistique internationale, offrant des solutions de transport plus rapides et plus efficaces.",
    content: `Phoenix International SARL est fier d'annoncer l'expansion de ses services avec le lancement d'une nouvelle division logistique. Ce service permettra aux entreprises de bénéficier de solutions de transport optimisées, avec un suivi en temps réel et des délais de livraison réduits.

Notre nouvelle offre logistique comprend :
- Transport national et international
- Gestion des chaînes d'approvisionnement
- Stockage et entreposage
- Suivi en temps réel des marchandises
- Solutions sur mesure pour chaque client

Avec cette expansion, Phoenix International SARL confirme sa position de leader dans le secteur des services et du commerce au Cameroun et dans la sous-région.`,
    author: "Équipe Phoenix",
    date: "2024-01-15",
    category: "Entreprise",
    image: "/news-1.jpg",
    readTime: "5 min"
  }

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments-${articleId}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [articleId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) return

    const comment = {
      id: Date.now(),
      author: authorName,
      email: authorEmail,
      content: newComment,
      date: new Date().toISOString(),
      status: 'approved'
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(updatedComments))

    setNewComment('')
    setAuthorName('')
    setAuthorEmail('')
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary-500 via-accent-500 to-sky-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux actualités</span>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-8">
              <div className="flex items-center space-x-2">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Partager</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Facebook
                </button>
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
                  LinkedIn
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-8">
                <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Commentaires ({comments.length})
                </h2>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Commentaire *
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Votre commentaire..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                  <span>Publier le commentaire</span>
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{comment.author}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ArticlePage() {
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
      <ArticleContent />
    </Suspense>
  )
}
