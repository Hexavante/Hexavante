<p align="center">
  <img src="https://img.shields.io/badge/HEXAVANTE-Educação-0ea5e9?style=for-the-badge&labelColor=0f172a" alt="Hexavante" />
</p>

<p align="center">
  <strong>Transformando a educação através da tecnologia.</strong><br/>
  <em>Transforming education through technology.</em>
</p>

<p align="center">
  <a href="#português">🇧🇷 Português</a> · <a href="#english">🇺🇸 English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Fastify-5-000?logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/Electron-33-47848F?logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MariaDB-11-003545?logo=mariadb&logoColor=white" alt="MariaDB" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

<a id="português"></a>

## Português

### Quem Somos

A **Hexavante** é uma empresa de tecnologia educacional focada em democratizar o acesso à educação de qualidade no Brasil. Desenvolvemos uma plataforma completa que combina cursos, simulados gamificados, comunidade e ferramentas de ensino — tudo em um ecossistema multiplataforma.

Nossa missão é conectar estudantes, instrutores e instituições através de uma experiência educacional imersiva, motivadora e acessível.

---

### Nossos Produtos

| Produto | Descrição | Stack Principal |
|---------|-----------|-----------------|
| [**Hexavante Web**](https://github.com/Hexavante/Hexavante) | Plataforma educacional principal — cursos, simulados, comunidade, loja e mais | Next.js 16, React 19, Prisma 6, MariaDB |
| [**Hexavante API**](https://github.com/Hexavante/Hexavante-Api) | Backend robusto e escalável que serve todos os clientes | Fastify 5, Prisma, Better Auth, Redis |
| [**Hexavante Desktop**](https://github.com/Hexavante/Hexavante-Desktop) | Aplicação desktop nativa para Windows, macOS e Linux | Electron 33, React 18, Vite |
| **Hexavante Mobile** | Aplicativo mobile (em desenvolvimento) | Capacitor, React |

---

### Funcionalidades

| Módulo | O que oferece |
|--------|----------------|
| **Cursos** | Catálogo moderado, módulos, aulas em vídeo (YouTube/Vimeo), progresso e materiais |
| **Simulados** | Múltipla escolha e dissertativas, cronômetro, imagens, recompensas diárias de XP |
| **Gamificação** | XP, níveis, moedas, boosters temporários e multiplicadores |
| **Aulas ao Vivo** | Salas com chat público para transmissões ao vivo |
| **Ranking** | Classificação de estudantes por XP em leaderboard global |
| **Certificados** | Emissão automática e verificação por código único |
| **Loja Virtual** | Títulos, cosméticos, boosters, passes premium e pacotes de revisão |
| **Comunidade** | Feed social, seguidores, curtidas e mensagens privadas |
| **Moderação** | Aprovação de instrutores/cursos, correção de dissertativas, painel admin |
| **Multiplataforma** | Web, Desktop e Mobile — tudo sincronizado |

---

### Arquitetura

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Hexavante   │     │  Hexavante   │     │  Hexavante   │
│    Web       │     │   Desktop    │     │    Mobile    │
│  (Next.js)   │     │ (Electron)   │     │ (Capacitor)  │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────┬───────┴────────────────────┘
                    │
            ┌───────▼───────┐
            │  Hexavante    │
            │     API       │
            │  (Fastify)    │
            └───────┬───────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
   │ MariaDB │ │  Redis  │ │  Auth   │
   │  (ORM)  │ │ (Cache) │ │ (OAuth) │
   └─────────┘ └─────────┘ └─────────┘
```

---

### Stack Tecnológica

| Camada | Tecnologias |
|--------|-------------|
| **Frontend Web** | Next.js 16, React 19, TypeScript 6, Tailwind CSS 4 |
| **Frontend Desktop** | Electron 33, Vite, React 18, Radix UI |
| **Backend** | Fastify 5, TypeScript 6, Prisma 6, Zod |
| **Banco de Dados** | MariaDB 11+ / MySQL 8+ |
| **Cache** | Redis 7+ |
| **Autenticação** | Better Auth (email/senha + OAuth Google/GitHub) |
| **Deploy** | Docker, Nginx, Cloudflare |
| **Documentação** | Swagger (API) |

---

### Contas Demo

| Papel | E-mail | Senha |
|-------|--------|-------|
| Aluno | `aluno@hexavante.com` | `Aluno123!` |
| Instrutor | `instrutor@hexavante.com` | `Instrutor123!` |
| Moderador | `moderador@hexavante.com` | `Moderador123!` |
| Admin | `admin@hexavante.com` | `Admin123!` |

---

### Roadmap

| Fase | Status | Itens |
|------|--------|-------|
| **MVP (TCC)** | ✅ Entregue | Auth, cursos, simulados, moderação, XP, certificados |
| **Pós-MVP** | 🚧 Em evolução | Loja expandida, social, DMs, recompensas diárias |
| **Desktop** | 🚧 Em evolução | App Electron multiplataforma |
| **Fase 2** | 📋 Planejado | Pagamentos reais, WebSocket, planner, avaliações |
| **Fase 3** | 📋 Planejado | Apps mobile, IA para redação, analytics avançado |

---

### Como Contribuir

1. Faça fork e crie uma branch (`feat/minha-feature`).
2. Siga as convenções de código do projeto.
3. Atualize a documentação se alterar modelo, API ou fluxo.
4. Rode `npm run build` e `npm run test` antes do PR.
5. Descreva migrations SQL necessárias na descrição do PR.

---

### Contato

- **GitHub**: [github.com/Hexavante](https://github.com/Hexavante)
- **Repositórios**: [Hexavante](https://github.com/Hexavante/Hexavante) · [API](https://github.com/Hexavante/Hexavante-Api) · [Desktop](https://github.com/Hexavante/Hexavante-Desktop)

---

### Licença

Todos os direitos reservados. Uso, redistribuição ou deploy comercial requer autorização explícita.

---

<a id="english"></a>

## English

### Who We Are

**Hexavante** is an educational technology company focused on democratizing access to quality education in Brazil. We develop a comprehensive platform combining courses, gamified practice exams, community, and teaching tools — all in a cross-platform ecosystem.

Our mission is to connect students, instructors, and institutions through an immersive, motivating, and accessible educational experience.

---

### Our Products

| Product | Description | Main Stack |
|---------|-------------|------------|
| [**Hexavante Web**](https://github.com/Hexavante/Hexavante) | Main educational platform — courses, exams, community, shop and more | Next.js 16, React 19, Prisma 6, MariaDB |
| [**Hexavante API**](https://github.com/Hexavante/Hexavante-Api) | Robust, scalable backend serving all clients | Fastify 5, Prisma, Better Auth, Redis |
| [**Hexavante Desktop**](https://github.com/Hexavante/Hexavante-Desktop) | Native desktop app for Windows, macOS and Linux | Electron 33, React 18, Vite |
| **Hexavante Mobile** | Mobile app (in development) | Capacitor, React |

---

### Features

| Module | What it offers |
|--------|----------------|
| **Courses** | Moderated catalog, modules, external video lessons, progress tracking |
| **Practice Exams** | Multiple choice & essays, timer, question images, daily XP rewards |
| **Gamification** | XP, levels, coins, temporary boosters and multipliers |
| **Live Classes** | Rooms with public chat during streams |
| **Leaderboard** | Student ranking by XP |
| **Certificates** | Issuance and code-based verification |
| **Shop** | Titles, cosmetics, boosters, passes, review packs |
| **Community** | Activity feed, follows, likes, and private DMs |
| **Moderation** | Instructor/course approval, essay grading, admin panel |
| **Cross-platform** | Web, Desktop and Mobile — all synced |

---

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Web Frontend** | Next.js 16, React 19, TypeScript 6, Tailwind CSS 4 |
| **Desktop Frontend** | Electron 33, Vite, React 18, Radix UI |
| **Backend** | Fastify 5, TypeScript 6, Prisma 6, Zod |
| **Database** | MariaDB 11+ / MySQL 8+ |
| **Cache** | Redis 7+ |
| **Authentication** | Better Auth (email/password + OAuth Google/GitHub) |
| **Deployment** | Docker, Nginx, Cloudflare |

---

### Roadmap

| Phase | Status | Items |
|-------|--------|-------|
| **MVP (Thesis)** | ✅ Shipped | Auth, courses, exams, moderation, XP, certificates |
| **Post-MVP** | 🚧 Active | Expanded shop, social, DMs, daily rewards |
| **Desktop** | 🚧 Active | Electron cross-platform app |
| **Phase 2** | 📋 Planned | Real payments, WebSocket, planner, course reviews |
| **Phase 3** | 📋 Planned | Mobile apps, AI essay feedback, advanced analytics |

---

### Contributing

1. Fork and branch from `main`.
2. Follow the project's code conventions.
3. Update docs when changing models, APIs or flows.
4. Run `npm run build` and `npm run test` before opening a PR.
5. Describe required SQL migrations in the PR description.

---

### Contact

- **GitHub**: [github.com/Hexavante](https://github.com/Hexavante)
- **Repositories**: [Hexavante](https://github.com/Hexavante/Hexavante) · [API](https://github.com/Hexavante/Hexavante-Api) · [Desktop](https://github.com/Hexavante/Hexavante-Desktop)

---

### License

All rights reserved. Commercial use or redistribution requires explicit authorization.

---

<p align="center">
  <sub>Hexavante · Transformando a educação através da tecnologia</sub>
</p>
