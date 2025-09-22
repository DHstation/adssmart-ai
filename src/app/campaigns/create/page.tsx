'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Building2, 
  Target, 
  Calendar, 
  PenTool, 
  Zap, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lightbulb
} from 'lucide-react';

interface CampaignData {
  business: {
    name: string;
    category: string;
    description: string;
    website?: string;
  };
  objective: string;
  budget: {
    type: 'daily' | 'lifetime';
    amount: number;
  };
  targeting: {
    locations: string[];
    ageMin: number;
    ageMax: number;
    gender: 'all' | 'male' | 'female';
    interests: string[];
  };
  schedule: {
    startDate: string;
    endDate?: string;
  };
  creative: {
    headline: string;
    primaryText: string;
    description: string;
    callToAction: string;
    destinationUrl: string;
  };
}

const STEPS = [
  { id: 1, title: 'Negócio', icon: Building2 },
  { id: 2, title: 'Objetivo', icon: Target },
  { id: 3, title: 'Orçamento', icon: Calendar },
  { id: 4, title: 'Criativo', icon: PenTool },
  { id: 5, title: 'Revisão', icon: CheckCircle },
];

const BUSINESS_CATEGORIES = [
  'Restaurante', 'Pet Shop', 'Salão de Beleza', 'Academia', 'Loja de Roupas',
  'Serviços Profissionais', 'E-commerce', 'Cursos Online', 'Consultoria',
  'Saúde e Bem-estar', 'Beleza e Estética', 'Tecnologia', 'Educação', 'Outros'
];

const OBJECTIVES = [
  { value: 'traffic', label: 'Gerar Tráfego', description: 'Levar pessoas ao seu site' },
  { value: 'conversions', label: 'Conversões', description: 'Vendas e leads qualificados' },
  { value: 'brand_awareness', label: 'Reconhecimento', description: 'Aumentar conhecimento da marca' },
  { value: 'engagement', label: 'Engajamento', description: 'Curtidas, comentários e compartilhamentos' },
];

export default function CreateCampaignPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [generatedCopies, setGeneratedCopies] = useState<any[]>([]);

  const [campaignData, setCampaignData] = useState<CampaignData>({
    business: {
      name: '',
      category: '',
      description: '',
      website: '',
    },
    objective: '',
    budget: {
      type: 'daily',
      amount: 50,
    },
    targeting: {
      locations: ['Brasil'],
      ageMin: 18,
      ageMax: 65,
      gender: 'all',
      interests: [],
    },
    schedule: {
      startDate: new Date().toISOString().split('T')[0],
    },
    creative: {
      headline: '',
      primaryText: '',
      description: '',
      callToAction: 'Saiba mais',
      destinationUrl: '',
    },
  });

  const generateCopy = async () => {
    setIsGeneratingCopy(true);
    try {
      const response = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: campaignData.business,
          objective: campaignData.objective,
          targetAudience: `Pessoas de ${campaignData.targeting.ageMin} a ${campaignData.targeting.ageMax} anos interessadas em ${campaignData.business.category.toLowerCase()}`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setGeneratedCopies(result.data.variations);
      } else {
        alert(result.error || 'Erro ao gerar conteúdo');
      }
    } catch (error) {
      console.error('Erro ao gerar copy:', error);
      alert('Erro ao gerar conteúdo. Tente novamente.');
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${campaignData.business.name} - ${campaignData.objective}`,
          ...campaignData,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        router.push('/dashboard?created=true');
      } else {
        alert(result.error || 'Erro ao criar campanha');
      }
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
      alert('Erro ao criar campanha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Criar Nova Campanha</h1>
          <p className="text-gray-600 mt-2">Configure sua campanha em poucos passos</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isActive
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isCompleted
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Informações do Negócio</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Negócio *
                </label>
                <input
                  type="text"
                  value={campaignData.business.name}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      business: { ...campaignData.business, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Pizzaria do João"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={campaignData.business.category}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      business: { ...campaignData.business, category: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {BUSINESS_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Produto/Serviço *
                </label>
                <textarea
                  value={campaignData.business.description}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      business: { ...campaignData.business, description: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descreva o que você oferece, principais benefícios e diferenciais..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (opcional)
                </label>
                <input
                  type="url"
                  value={campaignData.business.website}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      business: { ...campaignData.business, website: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://seusite.com.br"
                />
              </div>
            </div>
          )}

          {/* Step 2: Objective */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Objetivo da Campanha</h2>
              
              <div className="grid gap-4">
                {OBJECTIVES.map((obj) => (
                  <div
                    key={obj.value}
                    onClick={() =>
                      setCampaignData({ ...campaignData, objective: obj.value })
                    }
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      campaignData.objective === obj.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{obj.label}</h3>
                    <p className="text-gray-600 text-sm mt-1">{obj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Orçamento e Segmentação</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orçamento Diário
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">R$</span>
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    value={campaignData.budget.amount}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        budget: { ...campaignData.budget, amount: Number(e.target.value) },
                      })
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">por dia</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Orçamento mensal estimado: R$ {(campaignData.budget.amount * 30).toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade Mínima
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="65"
                    value={campaignData.targeting.ageMin}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        targeting: { ...campaignData.targeting, ageMin: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade Máxima
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="65"
                    value={campaignData.targeting.ageMax}
                    onChange={(e) =>
                      setCampaignData({
                        ...campaignData,
                        targeting: { ...campaignData.targeting, ageMax: Number(e.target.value) },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={campaignData.schedule.startDate}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      schedule: { ...campaignData.schedule, startDate: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 4: Creative */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Conteúdo Criativo</h2>
                <button
                  onClick={generateCopy}
                  disabled={isGeneratingCopy || !campaignData.business.name || !campaignData.business.description}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingCopy ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Lightbulb className="w-4 h-4 mr-2" />
                  )}
                  Gerar com IA
                </button>
              </div>

              {generatedCopies.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-3">Sugestões da IA:</h3>
                  <div className="space-y-3">
                    {generatedCopies.map((copy, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setCampaignData({
                            ...campaignData,
                            creative: {
                              ...campaignData.creative,
                              headline: copy.headline,
                              primaryText: copy.primaryText,
                              description: copy.description,
                              callToAction: copy.callToAction,
                            },
                          })
                        }
                        className="p-3 bg-white rounded border cursor-pointer hover:border-purple-300"
                      >
                        <div className="font-medium text-sm text-purple-900">Variação {index + 1}</div>
                        <div className="text-sm text-gray-700 mt-1">
                          <strong>Título:</strong> {copy.headline}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Texto:</strong> {copy.primaryText}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título Principal *
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={campaignData.creative.headline}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      creative: { ...campaignData.creative, headline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Título chamativo para seu anúncio"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {campaignData.creative.headline.length}/40 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto Principal *
                </label>
                <textarea
                  maxLength={125}
                  rows={3}
                  value={campaignData.creative.primaryText}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      creative: { ...campaignData.creative, primaryText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Texto persuasivo que desperta interesse..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {campaignData.creative.primaryText.length}/125 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Destino *
                </label>
                <input
                  type="url"
                  value={campaignData.creative.destinationUrl}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      creative: { ...campaignData.creative, destinationUrl: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://seusite.com.br/pagina-destino"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Revisar Campanha</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Negócio</h3>
                  <p className="text-gray-600">{campaignData.business.name} - {campaignData.business.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Objetivo</h3>
                  <p className="text-gray-600">
                    {OBJECTIVES.find(obj => obj.value === campaignData.objective)?.label}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Orçamento</h3>
                  <p className="text-gray-600">R$ {campaignData.budget.amount}/dia</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Conteúdo</h3>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-medium">{campaignData.creative.headline}</p>
                    <p className="text-sm text-gray-600 mt-1">{campaignData.creative.primaryText}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </button>

            {currentStep === STEPS.length ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                Criar Campanha
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!campaignData.business.name || !campaignData.business.category || !campaignData.business.description)) ||
                  (currentStep === 2 && !campaignData.objective) ||
                  (currentStep === 4 && (!campaignData.creative.headline || !campaignData.creative.primaryText || !campaignData.creative.destinationUrl))
                }
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 