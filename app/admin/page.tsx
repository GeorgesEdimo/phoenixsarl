"use client"

import { useLanguage } from '@/components/language-provider'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react'

export default function AdminDashboard() {
  const { t } = useLanguage()

  const stats = [
    {
      title: 'Total Ventes',
      value: '2,450,000 FCFA',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Commandes',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      title: 'Produits',
      value: '48',
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Clients',
      value: '89',
      change: '+5.1%',
      trend: 'up',
      icon: Users,
      color: 'orange'
    },
  ]

  const recentOrders = [
    { id: '#ORD-001', customer: 'Jean Dupont', amount: '125,000 FCFA', status: 'En attente', date: 'Il y a 2h' },
    { id: '#ORD-002', customer: 'Marie Kouame', amount: '75,000 FCFA', status: 'Livré', date: 'Il y a 5h' },
    { id: '#ORD-003', customer: 'Paul Nkodo', amount: '250,000 FCFA', status: 'En cours', date: 'Il y a 1j' },
    { id: '#ORD-004', customer: 'Sophie Mba', amount: '45,000 FCFA', status: 'Livré', date: 'Il y a 2j' },
    { id: '#ORD-005', customer: 'Emmanuel Tchoumi', amount: '180,000 FCFA', status: 'Annulé', date: 'Il y a 3j' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'En cours': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'En attente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Annulé': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                  'text-orange-600 dark:text-orange-400'
                }`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Commandes récentes</h2>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
              Voir tout
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8" />
            <div className="text-left">
              <h3 className="font-semibold">Ajouter un produit</h3>
              <p className="text-sm text-white/80">Créer un nouveau produit</p>
            </div>
          </div>
        </button>

        <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <ShoppingCart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <div className="text-left">
              <h3 className="font-semibold">Voir les commandes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gérer les commandes</p>
            </div>
          </div>
        </button>

        <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <div className="text-left">
              <h3 className="font-semibold">Gérer les clients</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Base de clients</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
