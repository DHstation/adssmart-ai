import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import OpenAI from 'openai';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/User';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { business, objective, targetAudience, tone = 'persuasivo' } = await request.json();

    if (!business || !objective) {
      return NextResponse.json(
        { error: 'Informações do negócio e objetivo são obrigatórios' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Buscar usuário e verificar limites
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar limite de criativos (plano free)
    if (user.subscription.plan === 'free' && user.usage.creativesGenerated >= 10) {
      return NextResponse.json(
        { error: 'Limite de criativos atingido. Faça upgrade do seu plano.' },
        { status: 403 }
      );
    }

    // Prompt para geração de copy
    const prompt = `
Você é um especialista em copy para anúncios do Facebook e Instagram.

Informações do negócio:
- Nome: ${business.name}
- Categoria: ${business.category}
- Descrição: ${business.description}
- Website: ${business.website || 'Não informado'}

Objetivo da campanha: ${objective}
Público-alvo: ${targetAudience || 'Pessoas interessadas no produto/serviço'}
Tom desejado: ${tone}

Gere 3 variações de copy para anúncios no Meta Ads (Facebook/Instagram), cada uma com:
1. Headline (até 40 caracteres)
2. Texto principal (até 125 caracteres)
3. Descrição adicional (até 30 caracteres)
4. Call-to-action sugerido

Foque em:
- Gerar interesse e curiosidade
- Usar gatilhos mentais apropriados
- Ser específico e relevante para o público brasileiro
- Incluir benefícios claros
- Criar senso de urgência quando apropriado

Responda em formato JSON:
{
  "variations": [
    {
      "headline": "...",
      "primaryText": "...",
      "description": "...",
      "callToAction": "..."
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('Resposta vazia da OpenAI');
    }

    let generatedContent;
    try {
      generatedContent = JSON.parse(response);
    } catch (parseError) {
      console.error('Erro ao parsear resposta da OpenAI:', parseError);
      throw new Error('Formato de resposta inválido');
    }

    // Atualizar contador de criativos do usuário
    await User.findByIdAndUpdate(user._id, {
      $inc: { 'usage.creativesGenerated': 1 }
    });

    return NextResponse.json({
      success: true,
      data: generatedContent,
      usage: {
        creativesGenerated: user.usage.creativesGenerated + 1,
        monthlyLimit: user.usage.monthlyLimit,
      }
    });

  } catch (error) {
    console.error('Erro ao gerar copy:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar conteúdo. Tente novamente.' },
      { status: 500 }
    );
  }
} 