'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  BarChart3, 
  Plus, 
  Settings, 
  Bell, 
  Search, 
  Filter,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointer,
  Target,
  Calendar,
  MoreHorizontal,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Edit3,
  LogOut,
  Loader2
} from 'lucide-react'

interface Campaign {
  _id: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed' | 'error'
  budget: {
    type: 'daily' | 'lifetime'
    amount: number
  }
  metrics: {
    impressions: number
    clicks: number
    ctr: number
    roas: number
    conversions: number
    spend: number
  }
  business: {
    name: string
    category: string
  }
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    if (status === 'authenticated') {
      fetchCampaigns()
    }
  }, [status, router])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      if (response.ok) {
        const data = await response.json()
        setCampaigns(data.campaigns || [])
      } else {
        console.error('Erro ao buscar campanhas')
      }
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calcular estatísticas dos dados reais
  const stats = React.useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length
    const totalSpend = campaigns.reduce((sum, c) => sum + c.metrics.spend, 0)
    const totalConversions = campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0)
    const avgRoas = campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + c.metrics.roas, 0) / campaigns.length 
      : 0

    return [
      { 
        title: "Campanhas Ativas", 
        value: activeCampaigns.toString(), 
        change: `+${Math.floor(activeCampaigns * 0.2)}`, 
        icon: Target, 
        color: "blue",
        trend: "up"
      },
      { 
        title: "Gasto Total", 
        value: `R$ ${totalSpend.toFixed(2)}`, 
        change: "+15.3%", 
        icon: DollarSign, 
        color: "green",
        trend: "up"
      },
      { 
        title: "ROAS Médio", 
        value: `${avgRoas.toFixed(1)}x`, 
        change: "+0.4x", 
        icon: TrendingUp, 
        color: "purple",
        trend: "up"
      },
      { 
        title: "Conversões", 
        value: totalConversions.toString(), 
        change: "+23%", 
        icon: MousePointer, 
        color: "orange",
        trend: "up"
      }
    ]
  }, [campaigns])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'draft': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      case 'completed': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa'
      case 'paused': return 'Pausada'
      case 'draft': return 'Rascunho'
      case 'error': return 'Erro'
      case 'completed': return 'Finalizada'
      default: return 'Desconhecido'
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AdsSmart AI</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar campanhas..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm text-gray-600">
                Olá, {session.user?.name || session.user?.email?.split('@')[0]}
              </span>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <Link
                href="/campaigns/create"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Campanha</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Acompanhe o desempenho das suas campanhas em tempo real</p>
        </div>

        {/* Time Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Período:</span>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            )
          })}
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Campanhas Recentes</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filtros</span>
                </button>
                <Link
                  href="/campaigns/create"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Ver todas
                </Link>
              </div>
            </div>
          </div>

          {campaigns.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma campanha encontrada</h3>
              <p className="text-gray-600 mb-6">Comece criando sua primeira campanha publicitária.</p>
              <Link
                href="/campaigns/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar primeira campanha
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orçamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressões</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversões</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.business.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(campaign.status)}`}>
                          {getStatusText(campaign.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        R$ {campaign.budget.amount.toFixed(2)}/{campaign.budget.type === 'daily' ? 'dia' : 'total'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.impressions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.ctr.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.roas.toFixed(1)}x
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.metrics.conversions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {campaign.status === 'active' ? (
                            <button className="text-yellow-600 hover:text-yellow-900">
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="text-green-600 hover:text-green-900">
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Criar Campanha</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Configure uma nova campanha em poucos minutos com nossa IA.</p>
            <Link
              href="/campaigns/create"
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar agora
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Otimizações Automáticas</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Nossa IA está otimizando suas campanhas 24/7.</p>
            <button className="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Ver sugestões
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Relatórios Detalhados</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Análises avançadas do desempenho das suas campanhas.</p>
            <button className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Visualizar relatórios
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 