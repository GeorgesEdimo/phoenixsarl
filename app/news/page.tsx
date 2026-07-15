"use client"

import { useLanguage } from '@/components/language-provider'
import { Calendar, Clock, User, ArrowRight, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Page d'actualités - Affiche la liste des articles avec filtrage par catégorie
export default function NewsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all') // Catégorie sélectionnée pour le filtrage

  // Liste des articles d'actualités (données statiques pour l'exemple)
  const articles = [
    {
      id: 1,
      title: "Phoenix International SARL lance son nouveau service de logistique",
      excerpt: "Nous sommes ravis d'annoncer le lancement de notre nouveau service de logistique internationale, offrant des solutions de transport plus rapides et plus efficaces.",
      content: "Phoenix International SARL est fier d'annoncer l'expansion de ses services avec le lancement d'une nouvelle division logistique. Ce service permettra aux entreprises de bénéficier de solutions de transport optimisées, avec un suivi en temps réel et des délais de livraison réduits.",
      author: "Équipe Phoenix",
      date: "2024-01-15",
      category: "Entreprise",
      image: "/news-1.jpg",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Partenariat stratégique avec Le Pillier Ltd",
      excerpt: "Phoenix International SARL signe un accord de partenariat majeur avec Le Pillier Ltd pour renforcer son offre de services.",
      content: "Ce partenariat stratégique marque une étape importante dans notre développement. Ensemble, nous pourrons offrir des solutions plus complètes à nos clients dans le domaine social et des services.",
      author: "Direction",
      date: "2024-01-10",
      category: "Partenariat",
      image: "/news-2.jpg",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Ouverture de notre nouvelle boutique en ligne",
      excerpt: "Découvrez notre nouvelle plateforme e-commerce avec une large gamme de produits informatiques et bureautiques.",
      content: "Notre boutique en ligne est désormais opérationnelle ! Vous pouvez désormais commander nos produits directement depuis notre site web, avec des options de paiement sécurisées via Orange Money, MTN Mobile Money et carte Visa.",
      author: "Équipe Commerce",
      date: "2024-01-05",
      category: "Commerce",
      image: "/news-3.jpg",
      readTime: "3 min"
    },
    {
      id: 4,
      title: "Phoenix International SARL obtient la certification ISO 9001",
      excerpt: "Nous sommes fiers d'annoncer l'obtention de la certification ISO 9001 pour notre système de management de la qualité.",
      content: "Cette certification témoigne de notre engagement envers l'excellence et la satisfaction client. Elle valide nos processus de qualité et notre volonté d'amélioration continue.",
      author: "Qualité",
      date: "2023-12-20",
      category: "Qualité",
      image: "/news-4.jpg",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Recrutement : Rejoignez notre équipe",
      excerpt: "Phoenix International SARL recrute plusieurs profils pour accompagner sa croissance.",
      content: "Nous recherchons des talents motivés pour rejoindre nos équipes dans différents domaines : logistique, commerce, administration et informatique. Postulez dès maintenant !",
      author: "RH",
      date: "2023-12-15",
      category: "RH",
      image: "/news-5.jpg",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Nouveau partenariat dans le secteur du transport",
      excerpt: "Signature d'un accord avec un leader du transport pour optimiser nos chaînes d'approvisionnement.",
      content: "Ce nouveau partenariat nous permettra d'offrir des services de transport plus efficaces et à des coûts compétitifs à nos clients.",
      author: "Logistique",
      date: "2023-12-10",
      category: "Partenariat",
      image: "/news-6.jpg",
      readTime: "5 min"
    }
  ]

  // Liste des catégories disponibles pour le filtrage
  const categories = ['all', 'Entreprise', 'Partenariat', 'Commerce', 'Qualité', 'RH']

  // Filtrer les articles selon la catégorie sélectionnée
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  // Formater la date en français
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Section Hero - Bannière d'en-tête avec dégradé */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary-500 via-accent-500 to-sky-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Actualités</h1>
            <p className="text-xl text-white/90">Suivez les dernières nouvelles de Phoenix International SARL</p>
          </div>
        </div>
      </section>

      {/* Section Filtre par catégorie - Boutons pour filtrer les articles */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'Toutes' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des articles - Affichage des cartes d'articles */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Composant Carte d'article - Affiche un article dans la grille
function ArticleCard({ article }: { article: any }) {
  // Formater la date en français
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-primary-300 dark:text-primary-700">
            {article.title.charAt(0)}
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-medium text-primary-600 dark:text-primary-400 rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
        </div>
        <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{article.author}</span>
          </div>
          <Link
            href={`/news/${article.id}`}
            className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm group-hover:space-x-2 transition-all"
          >
            <span>Lire la suite</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
