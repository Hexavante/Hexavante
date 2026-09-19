<p align="center">
  <img src="https://img.shields.io/badge/HEXAVANTE-App_Web-0ea5e9?style=for-the-badge&labelColor=0f172a" alt="Hexavante Web" />
</p>

<p align="center">
  <strong>Plataforma educacional principal da Hexavante.</strong><br/>
  <em>Main educational platform: courses, exams, gamification and moderation.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MariaDB-11-003545?logo=mariadb&logoColor=white" alt="MariaDB" />
</p>

---

## Português

### Sobre

App web servido em `app.hexavante.com.br` (porta 3000, Docker standalone). Autenticação por sessão validada na API (`__Secure-hexavante.session_token`, domínio `.hexavante.com.br`).

### Estrutura

```
src/
├── app/
│   ├── (main)/        # App com sidebar (courses, tutorials, simulados, app, perfil, ranking, shop, admin, instructor...)
│   ├── (landing)/     # Páginas públicas sem sidebar (home, cursos, ajuda)
│   └── (auth)/        # login, register, recuperar-senha, verificar-dispositivo
├── components/        # ui, courses, exams, tutorials, shop, gamification, moderation, profile...
├── services/          # Acesso a dados via Prisma (course, exam, tutorial, student...)
├── app/actions/       # Server Actions (CRUD, moderação, uploads)
├── app/api/upload/    # Upload de capas (sempre JSON, sharp → webp)
├── lib/               # auth, permissões, temas (cosmetics), rate-limit, email (Resend)
├── middleware.ts      # Sessão, manutenção, rotas públicas, área /admin
└── styles/            # themes, components, animations, flavors, light-mode
prisma/
├── schema.prisma      # Fonte web do schema (espelha a API — ver docs/sprints)
└── migrations/        # Migrações versionadas do web
```

### Setup

```bash
npm install
cp .env.example .env   # DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_API_URL, RESEND_API_KEY...
npx prisma generate
npm run dev            # http://localhost:3000
```

### Scripts

| Comando | Para que |
|---|---|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção (obrigatório antes de commitar UI) |
| `npm start` | Roda o standalone |
| `npx prisma migrate dev` | Nova migration (depois espelhar na API) |

### Funcionalidades

Cursos (catálogo moderado, módulos, aulas YouTube/Vimeo/TeraBox, progresso), tutoriais, simulados (objetivas + dissertativas com correção), gamificação (XP, níveis, moedas, boosters, loja, ranking por temporada), certificados com código, salas ao vivo, estatísticas, perfis com cosméticos, 16 temas (4 claros), 2FA e verificação de dispositivo por e-mail, multiconta, presença (online/ausente/estudando/não perturbe/invisível), moderação completa (`/admin`) com login + código por e-mail.

### Deploy

Container `hexavante-app` na VPS (`/opt/hexavante`): `git fetch + reset --hard origin/main` → `docker build --no-cache -t hexavante-web .` → `stop/rm/run` com envs inline + volume `hexavante_uploads:/app/public/uploads`. Verificação: `curl` + `docker logs`.

### Documentação técnica

Guias por sprint em [`docs/sprints/`](docs/sprints/) (fundação → auth → domínio → gamificação → deploy).

---

## English (summary)

Main Hexavante web app (Next.js 16 App Router, Tailwind v4, Prisma + MariaDB). Session auth via the API cookie, standalone Docker on port 3000 (`app.hexavante.com.br`). Build with `npm run build`; deploys to the VPS (`hexavante-app` container). See `docs/sprints/` for the technical guides (in Portuguese).
