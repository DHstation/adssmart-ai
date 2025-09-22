# AdsSmart AI 🚀

Plataforma SaaS de automação publicitária com inteligência artificial para Meta Ads (Facebook e Instagram).

## 🌟 Funcionalidades

### ✅ Implementado
- **Landing Page Profissional** - Interface moderna e responsiva
- **Sistema de Autenticação** - NextAuth.js com Google, Facebook e credenciais
- **Dashboard Interativo** - Métricas em tempo real e gestão de campanhas
- **Criação de Campanhas** - Fluxo em 5 etapas com IA integrada
- **Geração de Copy com IA** - OpenAI para criação de textos publicitários
- **API Routes Completas** - Backend para campanhas e usuários
- **Banco de Dados** - MongoDB com modelos estruturados
- **Design System** - Interface consistente e moderna

### 🔄 Em Desenvolvimento
- Integração com Meta Ads API
- Sistema de pagamentos (Stripe)
- Geração de criativos visuais
- Otimização automática avançada
- Relatórios detalhados

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: API Routes, MongoDB, Mongoose
- **Autenticação**: NextAuth.js
- **IA**: OpenAI GPT-4
- **Styling**: Tailwind CSS, Lucide Icons

## 🚀 Como Executar

### 1. Configurar Variáveis de Ambiente

Copie o arquivo `.env.local` e configure as seguintes variáveis:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/adssmart-ai

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth (opcional)
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# OpenAI (para geração de copy)
OPENAI_API_KEY=your-openai-api-key

# Meta Ads API (futuro)
META_ACCESS_TOKEN=your-meta-access-token
META_APP_ID=your-meta-app-id
META_APP_SECRET=your-meta-app-secret
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Banco de Dados

Certifique-se de que o MongoDB está rodando localmente ou configure uma conexão remota.

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
adssmart-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/     # NextAuth configuration
│   │   │   │   └── register/          # User registration
│   │   │   ├── campaigns/             # Campaign CRUD
│   │   │   └── ai/
│   │   │       └── generate-copy/     # AI copy generation
│   │   ├── auth/
│   │   │   └── login/                 # Login page
│   │   ├── campaigns/
│   │   │   └── create/                # Campaign creation flow
│   │   ├── dashboard/                 # Main dashboard
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   └── providers.tsx              # Global providers
│   ├── lib/
│   │   └── mongodb.ts                 # Database connection
│   ├── models/
│   │   ├── User.ts                    # User model
│   │   └── Campaign.ts                # Campaign model
│   └── types/
│       └── next-auth.d.ts             # NextAuth types
├── public/                            # Static assets
├── .env.local                         # Environment variables
└── package.json                       # Dependencies
```

## 📱 Páginas e Funcionalidades

### 🏠 Landing Page (/)
- Hero section com estatísticas
- Demonstração de funcionalidades
- CTAs para registro/login
- Footer com informações

### 🔐 Autenticação (/auth/login)
- Login com email/senha
- Login social (Google, Facebook)
- Registro de novos usuários
- Validações e segurança

### 📊 Dashboard (/dashboard)
- Métricas em tempo real
- Lista de campanhas
- Ações rápidas
- Links para criação

### ➕ Criar Campanha (/campaigns/create)
- **Etapa 1**: Informações do negócio
- **Etapa 2**: Objetivo da campanha
- **Etapa 3**: Orçamento e segmentação
- **Etapa 4**: Conteúdo criativo (com IA)
- **Etapa 5**: Revisão e criação

## 🧠 Integração com IA

### Geração de Copy
- Prompt especializado para Meta Ads
- 3 variações automáticas
- Otimizado para público brasileiro
- Limite por plano de usuário

### Futuras Integrações
- Geração de imagens (DALL-E)
- Otimização automática de campanhas
- Análise de concorrentes
- Sugestões de melhorias

## 🎨 Design System

### Cores
- **Primária**: Azul (#3B82F6) para ações principais
- **Secundária**: Roxo (#8B5CF6) para elementos especiais
- **Status**: Verde (ativo), Amarelo (pausado), Vermelho (erro)

### Tipografia
- **UI**: Inter (sistema, clean)
- **Headings**: Poppins (impact, moderno)

### Componentes
- Cards com hover effects
- Botões com gradientes
- Formulários acessíveis
- Tabelas responsivas

## 🔒 Segurança

- Autenticação JWT segura
- Validação de dados server-side
- Rate limiting nas APIs
- Sanitização de inputs
- HTTPS obrigatório em produção

## 📈 Planos de Usuário

### Free
- 5 campanhas por mês
- 10 criativos com IA
- Suporte básico

### Starter ($29/mês)
- 50 campanhas por mês
- 100 criativos com IA
- Otimização automática

### Pro ($99/mês)
- Campanhas ilimitadas
- Criativos ilimitados
- Relatórios avançados
- Suporte prioritário

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t adssmart-ai .
docker run -p 3000:3000 adssmart-ai
```

## 📞 Suporte

- Email: suporte@adssmart.ai
- Documentação: docs.adssmart.ai
- Status: status.adssmart.ai

---

**AdsSmart AI** - Democratizando a publicidade digital com inteligência artificial 🤖✨
