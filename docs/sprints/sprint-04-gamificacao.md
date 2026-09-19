# Sprint 4 — Gamificação e Social (App Web)

## Painel (`/app`)

Saudação animada, `StudyContinueHero` (retomar aula/simulado), metas/eventos (`DashboardHighlightsPanel`), central de estudos (`DashboardCommandCenter`), recomendações, conquistas, `StudentDashboard` (sticky), atalhos em marquee e `CertificateVortex`.

## Gamificação

- XP/níveis (`xp-progress-bar` com dot neon), moedas (`CoinExplosion` em canvas, cooldown 2.5s), boosters, loja com cosméticos (13 categorias) e inventário (`equipItemAction` + overlay de celebração `ThemeEquipOverlay`).
- Ranking por temporada com fallback all-time; certificados com código verificável e download em PDF.

## Perfil, presença e temas

- Perfil público (`/perfil/[username]`): vitrine, conquistas, certificados, cosméticos, selo de presença.
- 16 temas (`src/lib/cosmetics.ts` + `theme-flavors.css`): sidebar/highlights/glows por tema; modo claro legível via `theme-light.css` (superfícies escuras intencionais usam `hx-dark-surface`).
- Molduras animadas (chuva, floresta, neon...), fundos e bordas de avatar por raridade.

## Social e tempo real

Salas ao vivo (`/live-rooms`) com chat, ranking global, estatísticas com gráficos (tooltips adaptados ao tema claro).
