# Sprint 5 — Moderação e Deploy (App Web)

## Moderação (`/admin`, sessão `hx_admin_session`)

- Login + código de 6 dígitos por e-mail; `ModerationNav`: visão geral (stats + gráfico 7 dias), usuários (busca, cargos, warn/mute/ban, XP, impersonate), conteúdo (publicar/despublicar/excluir cursos e simulados), tutoriais, logs, terminal CLI (`/tutorials`, `/stats`, `/broadcast`...), configurações (broadcast, booster global, manutenção).
- Filas: instrutores, cursos, categorias, correções dissertativas.
- Busca rápida `Ctrl+K` (`SpotlightSearch`: usuários, tutoriais, cursos, simulados).

## Banco (lado web)

- `prisma/migrations/` versionadas; `prisma db push --accept-data-loss` **proibido**.
- `schema.prisma` idêntico em cobertura ao da API — qualquer mudança passa pelo fluxo de paridade (ver sprint de banco).

## Deploy

1. `git fetch origin && git reset --hard origin/main` em `/opt/hexavante`
2. `docker build --no-cache -t hexavante-web .`
3. `stop/rm/run` com envs inline (`DATABASE_URL` com `%2F`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_*`, `RESEND_*`) + `-v hexavante_uploads:/app/public/uploads`
4. Verificar: `curl` (`/`, `/login`, `/tutorials`, `/api/platform/status`) + `docker logs` sem erro.

## Antes do "pronto"

`npx next build` verde + teste em runtime (login `teste@hexavante.com`, fluxos tocados, temas claro/escuro).
