"use client"

import { useState, useEffect } from 'react'
import { Search, Filter, Edit, Trash2, CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react'

// Page admin pour gérer les commentaires des articles
// Permet d'approuver, rejeter, supprimer et filtrer les commentaires
export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState('') // Terme de recherche pour filtrer les commentaires
  const [statusFilter, setStatusFilter] = useState('all') // Filtre par statut (all, approved, pending, rejected)
  const [comments, setComments] = useState<any[]>([]) // Liste des commentaires chargés depuis localStorage

  // Charger tous les commentaires depuis localStorage au montage du composant
  useEffect(() => {
    const allComments: any[] = []
    // Parcourir toutes les clés localStorage pour trouver les commentaires
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('comments-')) {
        const articleComments = JSON.parse(localStorage.getItem(key) || '[]')
        articleComments.forEach((comment: any) => {
          allComments.push({
            ...comment,
            articleId: key.replace('comments-', '') // Ajouter l'ID de l'article au commentaire
          })
        })
      }
    }
    setComments(allComments)
  }, [])

  // Filtrer les commentaires selon le terme de recherche et le statut
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Retourner les classes CSS appropriées selon le statut du commentaire
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  // Retourner l'icône appropriée selon le statut du commentaire
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return null
    }
  }

  // Formater la date en français avec l'heure
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Changer le statut d'un commentaire (approuver/rejeter)
  const handleStatusChange = (commentId: number, articleId: string, newStatus: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId && comment.articleId === articleId) {
        return { ...comment, status: newStatus }
      }
      return comment
    })
    setComments(updatedComments)

    // Mettre à jour localStorage avec les commentaires modifiés
    const articleComments = updatedComments.filter(c => c.articleId === articleId)
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(articleComments))
  }

  // Supprimer un commentaire
  const handleDelete = (commentId: number, articleId: string) => {
    const updatedComments = comments.filter(
      comment => !(comment.id === commentId && comment.articleId === articleId)
    )
    setComments(updatedComments)

    // Mettre à jour localStorage après suppression
    const articleComments = updatedComments.filter(c => c.articleId === articleId)
    localStorage.setItem(`comments-${articleId}`, JSON.stringify(articleComments))
  }

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Commentaires</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Gérer les commentaires des articles</p>
      </div>

      {/* Statistiques : total, approuvés, en attente, rejetés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Approuvés</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{comments.filter(c => c.status === 'approved').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">En attente</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{comments.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Rejetés</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{comments.filter(c => c.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Barre de recherche et filtre par statut */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un commentaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Tous les statuts</option>
          <option value="approved">Approuvés</option>
          <option value="pending">En attente</option>
          <option value="rejected">Rejetés</option>
        </select>
        <button className="inline-flex items-center space-x-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="h-5 w-5" />
          <span>Filtrer</span>
        </button>
      </div>

      {/* Tableau des commentaires avec actions d'approbation/rejet/suppression */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Auteur
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commentaire
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <tr key={`${comment.articleId}-${comment.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{comment.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 max-w-xs">{comment.content}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    Article #{comment.articleId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                      {getStatusIcon(comment.status)}
                      <span>{comment.status === 'approved' ? 'Approuvé' : comment.status === 'pending' ? 'En attente' : 'Rejeté'}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {comment.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusChange(comment.id, comment.articleId, 'approved')}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                          title="Approuver"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      {comment.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(comment.id, comment.articleId, 'rejected')}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Rejeter"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment.id, comment.articleId)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Aucun commentaire trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
