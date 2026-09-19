# Sprint 1 — Fundação (App Web)

## Stack

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind v4 + Prisma 6 + MariaDB. Fonte Space Grotesk (`next/font`). Servido em `app.hexavante.com.br:3000` (Docker standalone).

## Estrutura (`src/`)

| Pasta | Papel |
|---|---|
| `app/(main)/` | App com sidebar: `app`, `courses`, `tutorials`, `simulados`, `perfil`, `ranking`, `shop`, `estatisticas`, `instructor/*`, `admin/*`, `configuracoes/*` |
| `app/(landing)/` | Páginas públicas sem sidebar: home, `cursos`, `ajuda`, `hexa` |
| `app/(auth)/` | `login`, `register`, `verificar-dispositivo`, recuperação de senha |
| `app/api/upload/` | Upload de capas (course/exam/tutorial/question) — sempre JSON |
| `components/` | `ui` (base), `courses`, `exams`, `tutorials`, `shop`, `gamification`, `moderation`, `profile`, `home`, `landing`, `presence`, `settings` |
| `services/` | Acesso a dados (Prisma): course, exam, tutorial, student, ranking... |
| `app/actions/` | Server Actions: auth, course, exam-admin, tutorial, moderation, shop, security... |
| `lib/` | `auth-session`, `permissions`, `cosmetics` (16 temas), `rate-limit`, `email` (Resend), `upload-client`, `account-switcher` |
| `middleware.ts` | Sessão, modo manutenção, rotas públicas, `/admin*` com cookie admin |
| `styles/` | `themes`, `components` (+`hx-*`), `animations`, `theme-flavors`, `theme-light` |

## Setup

```bash
npm install
cp .env.example .env   # DATABASE_URL, NEXTAUTH_SECRET, NEXT_PUBLIC_API_URL, RESEND_API_KEY, RESEND_FROM
npx prisma generate
npm run dev            # :3000
```

## Convenções

- pt-BR, Server Components por padrão, `PageShell` + `PageHeader` no interno.
- Formulários: Server Action `{ success, error }` + `useActionState`; nunca `res.json()` sem checar content-type.
- Nunca commitar `.env` ou segredos.
