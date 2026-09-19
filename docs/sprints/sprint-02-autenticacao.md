# Sprint 2 — Autenticação e Segurança (App Web)

## Sessão

Cookie `__Secure-hexavante.session_token` (7 dias, `httpOnly`, `secure`, `lax`, domínio `.hexavante.com.br`), validado na API (`GET /api/v1/auth/session`). Leitura no web: `auth()` (`src/lib/auth-session.ts`).

## Login / Cadastro (`src/app/(auth)/`, `src/app/actions/auth.ts`)

- Login por senha pode responder `202 { requiresVerification, verificationId, reason }` — **atenção**: `Response.ok` é `true` para 202; checar `status === 202` antes de `!res.ok` e ler o body uma vez só.
- Cadastro completo: usuário, nome, e-mail, senha + confirmação (olhinho), nascimento (13+), telefone/cidade/estado opcionais, termos.
- OAuth (Google/GitHub) confia no dispositivo e marca `emailVerified`.

## Verificação por e-mail (`/verificar-dispositivo`)

- Dispositivo novo, e-mail não confirmado ou 2FA: código de 6 dígitos (10 min, 5 tentativas, reenvio com cooldown 60s). Códigos coexistem até expirar.
- Ao confirmar: cria sessão, confia no dispositivo, marca `emailVerified`.

## Multiconta e presença

- Cookie `hx_accounts` (até 5): trocar sem logout em `/configuracoes/contas`; sair ativa a próxima.
- Presença (`ONLINE/AWAY/STUDYING/DND/INVISIBLE`): `PresencePicker` + `PresenceHeartbeat` (60s) + proxy `/api/presence/heartbeat`; offline após 5 min; selo no perfil.

## Admin (`/admin-login` → `/admin-verificar` → `/admin`)

Sessão própria `hx_admin_session` (8h) + código por e-mail. Middleware libera `/admin*` com o cookie; o layout valida sessão e papéis de verdade.
