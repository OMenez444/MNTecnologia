# MN Tech Launchpad - Landing Page Profissional

## 🚀 Sobre o Projeto

Landing page moderna e profissional para empresa de marketing digital e desenvolvimento web. Focada em conversão e experiência do usuário, com otimizações de SEO, performance e acessibilidade.

## ✨ Funcionalidades Implementadas

### 🎯 **SEO Otimizado**
- Meta tags completas (Open Graph, Twitter Cards)
- Structured Data (Schema.org)
- Sitemap.xml e robots.txt
- Meta tags dinâmicas por página
- Canonical URLs

### ⚡ **Performance**
- Lazy loading de componentes
- Code splitting automático
- Otimização de bundle com Vite
- Métricas de performance (FCP, LCP, FID, CLS)
- Compressão e minificação

### ♿ **Acessibilidade**
- Navegação por teclado
- Skip links para leitores de tela
- Suporte a modo de alto contraste
- Redução de movimento
- ARIA labels e roles

### 📊 **Analytics**
- Google Analytics 4 integrado
- Métricas de performance
- Eventos customizados
- Rastreamento de conversões

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Componentes**: Radix UI
- **Roteamento**: React Router DOM
- **Estado**: React Query (TanStack Query)
- **Formulários**: React Hook Form + Zod
- **SEO**: React Helmet Async
- **Ícones**: Lucide React

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd mn-tech-launchpad

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run preview          # Preview da build

# Build
npm run build            # Build de produção
npm run build:dev        # Build de desenvolvimento
npm run build:analyze    # Build + análise de bundle

# Qualidade de Código
npm run lint             # Verificar linting
npm run lint:fix         # Corrigir problemas de linting
npm run type-check       # Verificar tipos TypeScript
npm run format           # Formatar código
npm run format:check     # Verificar formatação

# Testes
npm run test             # Executar testes
npm run test:ui          # Interface de testes
npm run test:coverage    # Cobertura de testes

# Manutenção
npm run audit            # Auditoria de segurança
npm run update-deps      # Atualizar dependências
npm run clean            # Limpar arquivos temporários
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Header.tsx      # Navegação principal
│   ├── HeroSection.tsx # Seção principal/banner
│   ├── ServicesSection.tsx # Lista de serviços
│   ├── AboutSection.tsx    # Sobre a empresa
│   ├── ContactSection.tsx  # Formulário de contato
│   ├── FooterSection.tsx   # Rodapé
│   └── SEO.tsx         # Componente de SEO
├── hooks/              # Hooks customizados
│   ├── usePerformance.ts    # Métricas de performance
│   └── useAccessibility.ts  # Melhorias de acessibilidade
├── pages/              # Páginas da aplicação
├── lib/                # Utilitários
└── assets/             # Imagens e recursos
```

## 🔧 Configurações

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://mn-tech-launchpad.com
```

### Google Analytics
Para ativar o Google Analytics:
1. Crie uma propriedade no GA4
2. Adicione o ID de medição nas variáveis de ambiente
3. O componente será carregado automaticamente

## 📈 Métricas de Performance

O projeto inclui monitoramento automático de:
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)  
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)

## ♿ Acessibilidade

### Recursos Implementados
- Navegação por teclado completa
- Skip links para navegação rápida
- Suporte a leitores de tela
- Modo de alto contraste
- Redução de movimento

### Testes de Acessibilidade
```bash
# Instalar axe-core para testes
npm install --save-dev axe-core

# Executar testes de acessibilidade
npm run test:accessibility
```

## 🚀 Deploy

### Lovable (Recomendado)
1. Acesse [Lovable](https://lovable.dev)
2. Conecte seu repositório
3. Clique em "Share → Publish"

### Deploy Manual
```bash
# Build de produção
npm run build:prod

# Os arquivos estarão em /dist
# Faça upload para seu servidor
```

## 📊 Análise de Bundle

Para analisar o tamanho do bundle:
```bash
npm run build:analyze
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:
- Email: contato@mn-tech-launchpad.com
- LinkedIn: [MN Tech Launchpad](https://linkedin.com/company/mn-tech-launchpad)

---

**Desenvolvido com ❤️ pela equipe MN Tech Launchpad**
