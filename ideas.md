# GeoInsight — Global Data Dashboard

## Brainstorming de Design

### Três Abordagens Estilísticas

#### 1. **Data Minimalism**
Uma abordagem limpa e científica, inspirada em dashboards de análise de dados modernos. Foco em clareza, hierarquia visual e eficiência informacional.
- **Probabilidade:** 0.08

#### 2. **Geo-Explorer Playful**
Design exploratório e envolvente, com elementos lúdicos que remetem a mapas antigos e descoberta. Cores quentes, tipografia característica, ícones customizados.
- **Probabilidade:** 0.06

#### 3. **Dark Tech Sophisticated**
Interface escura e premium, com gradientes sutis, acentos em cores vibrantes (azul/ciano), e uma sensação de tecnologia avançada. Inspirado em plataformas de dados enterprise.
- **Probabilidade:** 0.07

---

## Abordagem Escolhida: **Dark Tech Sophisticated**

### Design Movement
**Cyberpunk Minimalism** — Uma fusão entre a estética dark mode premium (enterprise SaaS) e elementos de design futurista, mantendo clareza e usabilidade como prioridades.

### Core Principles
1. **Contraste Inteligente** — Fundo escuro com acentos brilhantes (azul/ciano) criam hierarquia visual imediata
2. **Densidade Informacional Otimizada** — Componentes compactos mas respirados, sem desperdício de espaço
3. **Interatividade Fluida** — Transições suaves, hover states claros, feedback visual instantâneo
4. **Elegância Técnica** — Tipografia precisa, ícones geométricos, alinhamento rigoroso

### Color Philosophy
- **Primário:** Azul profundo (`#0066FF` / `oklch(0.5 0.25 260)`) — confiança, tecnologia, dados
- **Secundário:** Ciano brilhante (`#00D9FF` / `oklch(0.65 0.2 200)`) — destaque, interatividade, energia
- **Fundo:** Quase-preto (`#0A0E27` / `oklch(0.08 0.01 280)`) — profundidade, reduz fadiga ocular
- **Superfícies:** Cinza muito escuro (`#1A1F3A` / `oklch(0.15 0.02 280)`) — cards, containers
- **Texto Principal:** Branco suave (`#F0F2FF` / `oklch(0.95 0.01 280)`) — legibilidade mantida
- **Texto Secundário:** Cinza médio (`#8B92B0` / `oklch(0.6 0.05 280)`) — hierarquia

### Layout Paradigm
**Asymmetric Grid with Focal Points**
- Mapa interativo como herói (esquerda/topo, dominante)
- KPIs em cards compactos fluindo ao redor
- Gráficos em grid 2-3 colunas com tamanhos variados
- Painel lateral (drawer) para drill-down
- Não usar grid centralizado — favorecer layouts fluidos e assimétricos

### Signature Elements
1. **Gradient Accents** — Gradientes sutis azul→ciano em borders, backgrounds de cards destacados
2. **Geometric Dividers** — Linhas diagonais/onduladas em SVG separando seções
3. **Glow Effects** — Sombras coloridas (ciano) em elementos interativos
4. **Data Visualization Palette** — Cores de gráficos em tons de azul/ciano/roxo para coerência

### Interaction Philosophy
- **Hover States:** Elevação visual (shadow glow), mudança de cor para ciano
- **Click Feedback:** Scale 0.97 com transição 160ms ease-out
- **Loading States:** Skeleton screens com gradiente animado
- **Transições:** 200-300ms para modais/drawers, 150ms para dropdowns

### Animation
- **Entrance:** Fade + slide-up (150ms ease-out) para cards
- **Hover:** Glow + subtle scale (100ms ease-out)
- **Modals/Drawers:** Fade background + slide-in lateral (250ms ease-out)
- **Data Updates:** Fade-replace para valores que mudam
- **Respeitar:** `prefers-reduced-motion` para usuários que solicitam

### Typography System
- **Display:** `Sora` (bold, 700) — títulos principais, KPI labels
- **Heading:** `Sora` (semibold, 600) — seções, card titles
- **Body:** `Inter` (regular, 400) — texto principal, tabelas
- **Mono:** `JetBrains Mono` (400) — valores numéricos, código
- **Hierarchy:** 32px (h1) → 24px (h2) → 18px (h3) → 14px (body) → 12px (caption)

### Brand Essence
**"Compreender o mundo através de dados, em tempo real, com elegância técnica."**
- **Positioning:** Para analistas, pesquisadores e curiosos que querem explorar dados globais com uma interface premium
- **Personality:** Preciso, Inovador, Acessível

### Brand Voice
- **Headlines:** Diretas, curiosas, instigantes
  - ❌ "Bem-vindo ao GeoInsight"
  - ✅ "Qual é a verdadeira face do mundo?"
- **CTAs:** Ação clara, sem jargão
  - ❌ "Clique para explorar"
  - ✅ "Explorar padrões" ou "Descobrir insights"
- **Microcopy:** Técnica mas acessível
  - ❌ "Carregando dados..."
  - ✅ "Sincronizando dados globais..."

### Wordmark & Logo
**Conceito:** Um símbolo geométrico — um globo estilizado com linhas de latitude/longitude formando um padrão de dados (pontos/linhas em ciano).
- Forma: Círculo com grid interno
- Cores: Azul primário + ciano accent
- Sem texto no logo — apenas o símbolo
- Uso: Header, favicon, branding

### Signature Brand Color
**Azul Ciano Brilhante** (`#00D9FF`) — Imediatamente reconhecível, energético, tech-forward. Usado em:
- Borders de elementos destacados
- Glow effects em hover
- Accent text
- Gradientes de fundo

---

## Implementação

Todos os arquivos CSS/componentes devem documentar esta filosofia no topo:
```
/**
 * GeoInsight Design System
 * Dark Tech Sophisticated — Cyberpunk Minimalism
 * 
 * Cores: Azul profundo (#0066FF) + Ciano (#00D9FF)
 * Tipografia: Sora (display) + Inter (body) + JetBrains Mono (data)
 * Motion: 150-300ms ease-out, respeitar prefers-reduced-motion
 * Padrão: Assimétrico, focal points, glow effects
 */
```

Manter esta visão durante toda a implementação.
