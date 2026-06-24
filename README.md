# 🌍 BRICSInsights — Global Economic Bloc Dashboard

**Um dashboard interativo que analisa dados dos 5 membros do BRICS (Brasil, Rússia, Índia, China e África do Sul) através de visualizações avançadas e métricas globais.**

---

## 📋 Visão Geral

BRICSInsights é um dashboard moderno construído com **React 19 + Vite + TypeScript + ShadCN + Recharts**, consumindo dados da **REST Countries API v5**. A aplicação oferece análises profundas sobre população, área, densidade, idiomas, moedas e distribuição geográfica dos países do BRICS.

### 🎯 Objetivo

Não é apenas "ver países" — é **entender o mundo através dos dados do BRICS**. O dashboard permite exploração interativa, comparação de métricas e análise de tendências globais do bloco econômico.

---

## ✨ Características Principais

### 1. **8 KPIs Globais**
- 🌐 **Total de Países**: 5 membros do BRICS
- 👥 **População Mundial**: 3.20 bilhões (soma dos 5 países)
- 🏳️ **Número de Regiões**: 4 (Americas, Europe, Asia, Africa)
- 💱 **Total de Moedas Únicas**: 5 moedas diferentes
- 📊 **Idiomas Únicos**: 15 idiomas falados
- 🏘️ **Densidade Média**: 80.4 hab/km²
- 📍 **Área Total**: 39.83 M km²
- 👤 **População Média por País**: 640.7 M

### 2. **Tabela Inteligente de Países**
- ✅ Exibição de bandeiras reais de cada país
- 🔄 **Ordenação dinâmica** por população, área, densidade
- 📄 **Paginação** para navegação eficiente
- 🔍 **Busca com debounce** para filtrar países
- 🖱️ **Clique em "Ver"** para abrir drawer com detalhes completos

### 3. **4 Gráficos Analíticos**

#### 📊 População por Região
- Gráfico de barras mostrando distribuição de população por região geográfica
- Cores em azul ciano para destaque visual
- Tooltip com valores formatados

#### 📈 Top Países Mais Populosos
- Ranking dos 5 membros do BRICS por população
- Ordenação decrescente (China → South Africa)
- Barras horizontais para melhor legibilidade

#### 🗣️ Top Idiomas (Países)
- Distribuição de idiomas falados nos 5 países
- Mostra quantos países falam cada idioma
- Top 8 idiomas mais comuns

#### 📍 Área vs População
- Scatter chart com escala logarítmica
- Eixo X: Área (km²)
- Eixo Y: População
- Tooltip customizado mostrando:
  - **Área** (em azul)
  - **População** (em azul)
  - **Densidade** (em branco, com notação de milhar)

### 4. **Drawer de Detalhes do País**
Clique em "Ver" na tabela para abrir um painel lateral com:
- 🏛️ **Nome oficial** do país
- 🏙️ **Capital**
- 🌍 **Região geográfica**
- 👥 **População**
- 📏 **Área em km²**
- 🏘️ **Densidade populacional**
- 🗣️ **Idiomas oficiais**
- 💵 **Moedas**
- 🤝 **Países vizinhos**
- 📍 **Coordenadas geográficas**

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** — Framework UI moderno
- **Vite** — Build tool ultrarrápido
- **TypeScript** — Tipagem estática
- **TailwindCSS 4** — Estilização utilitária
- **ShadCN/UI** — Componentes acessíveis e customizáveis
- **Recharts** — Visualização de dados
- **TanStack Query** — Gerenciamento de estado assíncrono
- **Lucide React** — Ícones vetoriais

### API
- **REST Countries API v5** — Dados de países em tempo real

---

## 🎨 Design & UX

### Tema: Cyberpunk Minimalism
- **Paleta de Cores**: Dark mode com acentos em ciano (#00D9FF)
- **Tipografia**: 
  - Headlines: Sora (Google Fonts)
  - Body: Inter (Google Fonts)
  - Monospace: JetBrains Mono
- **Componentes**: ShadCN/UI com customizações de tema
- **Animações**: Transições suaves (200-300ms)
- **Responsividade**: Mobile-first design

### Recursos UX
- ✅ **Skeleton Loading** — Feedback visual durante carregamento
- ✅ **Empty States** — Mensagens claras quando sem dados
- ✅ **Tooltips Customizados** — Informações contextuais
- ✅ **Dark Mode** — Tema escuro como padrão
- ✅ **Transições Suaves** — Animações fluidas

---

## 📊 Dados & Cálculos Derivados

### Fonte de Dados
- **API**: REST Countries API v5
- **Fallback**: Dados estáticos em `client/src/lib/bricsMockData.ts`
- **Atualização**: Em tempo real (com cache)

### Cálculos Derivados
O dashboard **não apenas exibe dados** — ele **calcula métricas importantes**:

```typescript
// Exemplos de cálculos
- Densidade Populacional = População / Área
- Total de Idiomas Únicos = Set de todos os idiomas
- Distribuição por Região = Agrupamento por continente
- Top Países = Ordenação por população
- Estatísticas Globais = Somas e médias
```

---

## 🚀 Como Usar

### Instalação Local

```bash
# 1. Clone o repositório
git clone <seu-repo>
cd bricsinsights

# 2. Instale dependências
pnpm install

# 3. Inicie o servidor de desenvolvimento
pnpm dev

# 4. Abra no navegador
# http://localhost:5173
```

### Build para Produção

```bash
# Build otimizado
pnpm build

# Inicie o servidor de produção
pnpm start
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento com HMR |
| `pnpm build` | Build otimizado para produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm check` | Verifica tipos TypeScript |
| `pnpm format` | Formata código com Prettier |
| `pnpm test` | Executa testes com Vitest |
| `pnpm db:push` | Sincroniza schema do banco com Drizzle |

---

## 📁 Estrutura do Projeto

```
bricsinsights/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts.tsx           # Gráficos Recharts
│   │   │   ├── CountriesTable.tsx   # Tabela de países
│   │   │   ├── CountryDrawer.tsx    # Drawer de detalhes
│   │   │   ├── FilterPanel.tsx      # Filtros globais
│   │   │   ├── KPICard.tsx          # Cards de métricas
│   │   │   └── SkeletonLoader.tsx   # Loading states
│   │   ├── hooks/
│   │   │   ├── useCountriesData.ts  # Hook para dados da API
│   │   │   └── useFiltersSync.ts    # Hook para sincronizar filtros
│   │   ├── lib/
│   │   │   └── bricsMockData.ts     # Dados mock dos 5 países
│   │   ├── pages/
│   │   │   └── Home.tsx             # Página principal
│   │   ├── types/
│   │   │   └── countries.ts         # Tipos TypeScript
│   │   ├── App.tsx                  # Componente raiz
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Estilos globais
│   ├── index.html                   # HTML template
│   └── public/                      # Arquivos estáticos
│   └── _core/                       # Framework plumbing
├── shared/                          # Código compartilhado
├── package.json                     # Dependências
└── README.md                        # Este arquivo
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                    BRICSInsights                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Usuário acessa dashboard                           │
│         ↓                                               │
│  2. useCountriesData() busca dados                      │
│         ↓                                               │
│  3. Tenta REST Countries API v5                        │
│         ↓                                               │
│  4. Se falhar, usa bricsMockData.ts                    │
│         ↓                                               │
│  5. Calcula métricas derivadas (densidade, etc)        │
│         ↓                                               │
│  6. Renderiza componentes:                             │
│     - KPIs globais                                     │
│     - Tabela de países                                 │
│     - 4 gráficos analíticos                            │
│         ↓                                               │
│  7. Usuário interage (clica, filtra, ordena)           │
│         ↓                                               │
│  8. Estado atualiza em tempo real                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Membros do BRICS

| País | Capital | População | Área (km²) | Região |
|------|---------|-----------|-----------|--------|
| 🇧🇷 Brasil | Brasília | 213.4M | 8,515,767 | Americas |
| 🇷🇺 Rússia | Moscou | 146.0M | 17,098,242 | Europe/Asia |
| 🇮🇳 Índia | Nova Delhi | 1,380.0M | 3,287,590 | Asia |
| 🇨🇳 China | Pequim | 1,404.9M | 9,706,961 | Asia |
| 🇿🇦 África do Sul | Pretória | 59.3M | 1,221,037 | Africa |

---

## 🔐 Autenticação & Segurança

- **OAuth 2.0**: Integrado com Manus OAuth
- **JWT**: Session cookies seguros
- **CORS**: Configurado para produção
- **HTTPS**: Enforçado em produção
- **Variáveis de Ambiente**: Gerenciadas via `.env`

---

## 📈 Performance

### Otimizações Implementadas
- ✅ **Memoização** de dados com React Query
- ✅ **Code Splitting** automático com Vite
- ✅ **Lazy Loading** de componentes
- ✅ **Debounce** em buscas (300ms)
- ✅ **Skeleton Loading** para melhor UX
- ✅ **Escala Logarítmica** em gráficos para melhor visualização

### Métricas
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

---

## 🐛 Troubleshooting

### Problema: Dados não carregam
**Solução**: Verifique se a REST Countries API está acessível. O fallback para `bricsMockData.ts` será usado automaticamente.

### Problema: Gráficos vazios
**Solução**: Limpe o cache do navegador (Ctrl+Shift+Delete) e recarregue a página.

### Problema: Tooltips cortados
**Solução**: Os margins dos gráficos foram otimizados. Se persistir, verifique a resolução da tela.

---

## 🚀 Próximas Melhorias

1. **Mapa Choropleth** — Mapa mundi interativo destacando os 5 países
2. **Comparação Multi-País** — Seletor para comparar países lado-a-lado
3. **Exportar PDF** — Gerar relatório em PDF com dados
4. **Dark/Light Mode Toggle** — Alternância de tema
5. **Histórico de Dados** — Gráficos de tendências ao longo do tempo

---

## 📝 Licença

MIT — Livre para usar, modificar e distribuir.

---

## 👨‍💻 Desenvolvido com ❤️

**BRICSInsights** — Análise de Dados Global do Bloco Econômico BRICS

**Stack**: React 19 • Vite • TypeScript • ShadCN • Recharts • REST Countries API

**Tema**: Cyberpunk Minimalism — Dark mode com acentos em ciano

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório ou entre em contato através do painel de administração do Manus.

---

**Última atualização**: Junho 2026 | **Versão**: 1.0.0
