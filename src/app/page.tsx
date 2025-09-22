'use client'

import React from 'react'
import { ArrowRight, Play, CheckCircle, Target, Zap, TrendingUp, Users, Shield, Star, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AdsSmart AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#funcionalidades" className="text-white/80 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#beneficios" className="text-white/80 hover:text-white transition-colors">Benefícios</a>
              <a href="#casos-uso" className="text-white/80 hover:text-white transition-colors">Casos de Uso</a>
              <a href="#precos" className="text-white/80 hover:text-white transition-colors">Preços</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white/80 hover:text-white transition-colors">Entrar</button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                <span>Começar Grátis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-white/90 text-sm">Plataforma #1 em Automação Publicitária</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Automatize suas
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Campanhas</span>
              <br />
              com Inteligência Artificial
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              O AdsSmart AI automatiza completamente o processo de criação, lançamento e otimização de campanhas publicitárias no Meta Ads. 
              Transforme qualquer pessoa em um especialista em marketing digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
                <span>Começar Agora - Grátis</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
                <Play className="w-5 h-5" />
                <span>Ver Demo</span>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Setup em 3 minutos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "94%", label: "Taxa de Aprovação Superior" },
              { number: "3-5min", label: "Campanha Pronta" },
              { number: "+300%", label: "ROI Médio" },
              { number: "24/7", label: "Otimização Automática" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Principais</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubra como nossa IA revoluciona a criação e gestão de campanhas publicitárias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Criação Automática de Campanhas",
                description: "Analisa seu nicho e gera automaticamente a estrutura completa da campanha com segmentação precisa.",
                features: ["Campanhas prontas em 3-5 minutos", "Taxa de aprovação 94% superior", "Segmentação automática"]
              },
              {
                icon: Zap,
                title: "Estúdio de Criativos com IA",
                description: "Produz imagens e vídeos profissionais automaticamente baseados na descrição do seu produto/serviço.",
                features: ["Imagens profissionais", "Vídeos de até 30 segundos", "Múltiplas variações"]
              },
              {
                icon: TrendingUp,
                title: "Copywriting Inteligente",
                description: "Cria headlines persuasivos e textos adaptados ao tom da marca com gatilhos mentais comprovados.",
                features: ["Headlines persuasivos", "Múltiplas variações", "Gatilhos mentais"]
              },
              {
                icon: Users,
                title: "Dashboard em Tempo Real",
                description: "Métricas principais, alertas inteligentes e sugestões automáticas de otimização.",
                features: ["Métricas em tempo real", "Alertas inteligentes", "Sugestões automáticas"]
              },
              {
                icon: Shield,
                title: "Otimização Automática",
                description: "Redistribui orçamento automaticamente e ajusta lances para maximizar resultados.",
                features: ["Redistribuição automática", "Ajuste de lances", "Testes A/B automáticos"]
              },
              {
                icon: Star,
                title: "Biblioteca de Criativos",
                description: "Organiza e categoriza todos os materiais criados com sistema de busca inteligente.",
                features: ["Organização inteligente", "Sistema de busca", "Reutilização fácil"]
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Transforme seu negócio com
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Automação Inteligente</span>
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Elimine a complexidade do marketing digital e obtenha resultados profissionais desde o primeiro dia.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Economia de Tempo",
                    description: "De 15-20 horas/semana para apenas minutos de configuração",
                    benefit: "95% menos tempo"
                  },
                  {
                    title: "Redução de Custos", 
                    description: "Elimina necessidade de agência, designer e redator",
                    benefit: "Até 80% economia"
                  },
                  {
                    title: "Resultados Superiores",
                    description: "Campanhas otimizadas por IA superam criações manuais",
                    benefit: "+300% ROI médio"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-white/80 mb-1">{benefit.description}</p>
                      <span className="text-sm text-green-400 font-medium">{benefit.benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="text-white">Status da Campanha</span>
                    <span className="text-green-400 font-medium">Ativa</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="text-white">Impressões</span>
                    <span className="text-white font-medium">125.432</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="text-white">Taxa de Conversão</span>
                    <span className="text-green-400 font-medium">+15.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="text-white">ROAS</span>
                    <span className="text-green-400 font-medium">4.2x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para revolucionar suas campanhas publicitárias?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de empreendedores que já transformaram seus resultados com o AdsSmart AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
              <span>Começar Teste Grátis</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto">
              <Play className="w-5 h-5" />
              <span>Agendar Demo</span>
            </button>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            Sem compromisso • Cancele quando quiser • Suporte 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AdsSmart AI</span>
              </div>
              <p className="text-white/60">
                Automatização publicitária com inteligência artificial para Meta Ads.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 AdsSmart AI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacidade</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Termos</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
