import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectMongoDB from '@/lib/mongodb';
import Campaign from '@/models/Campaign';
import User from '@/models/User';

// GET /api/campaigns - Listar campanhas do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await connectMongoDB();

    // Buscar o usuário
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Buscar campanhas do usuário
    const campaigns = await Campaign.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ campaigns });

  } catch (error) {
    console.error('Erro ao buscar campanhas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST /api/campaigns - Criar nova campanha
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const campaignData = await request.json();

    // Validações básicas
    const requiredFields = ['name', 'objective', 'budget', 'targeting', 'schedule', 'creative', 'business'];
    for (const field of requiredFields) {
      if (!campaignData[field]) {
        return NextResponse.json(
          { error: `Campo obrigatório: ${field}` },
          { status: 400 }
        );
      }
    }

    await connectMongoDB();

    // Buscar o usuário
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar limite de campanhas (plano free)
    if (user.subscription.plan === 'free') {
      const campaignCount = await Campaign.countDocuments({ userId: user._id });
      if (campaignCount >= user.usage.monthlyLimit) {
        return NextResponse.json(
          { error: 'Limite de campanhas atingido. Faça upgrade do seu plano.' },
          { status: 403 }
        );
      }
    }

    // Criar nova campanha
    const newCampaign = await Campaign.create({
      ...campaignData,
      userId: user._id,
    });

    // Atualizar contador de campanhas do usuário
    await User.findByIdAndUpdate(user._id, {
      $inc: { 'usage.campaignsCreated': 1 }
    });

    return NextResponse.json(
      { 
        message: 'Campanha criada com sucesso',
        campaign: newCampaign
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao criar campanha:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 