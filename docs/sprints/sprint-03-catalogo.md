# Sprint 3 — Catálogo e Estudo (App Web)

## Cursos (`/courses`, `/courses/[slug]`, `/instructor/courses`)

- Lista interna com `PageShell`: busca, categoria, nível, ordenação (`CourseFilters`), cards com módulos/matrículas.
- Detalhe com módulos/aulas, matrícula, progresso; player suporta YouTube, Vimeo, mp4 e TeraBox (`VideoPlayer`); CSP permite os embeds.
- Instrutor cria/edita (`CourseFormShell` + `CourseCoverUpload`); excluir libera só sem matrículas (`deleteCourseAction`). Curso novo entra em `PENDING_REVIEW`.

## Tutoriais (`/tutorials`, `/tutorials/[slug]`, `/instructor/tutorials`)

- Mesmo padrão visual dos cursos: `TutorialFilters` (busca, categoria, recentes/mais vistos), `TutorialCard`, detalhe com player, autor, views e tags.
- Miniatura via `/api/upload/tutorial-cover` (`TutorialThumbnailUpload`); criar/editar/excluir pelo instrutor.

## Simulados (`/simulados`, `/simulados/[slug]/fazer`, `/resultado`, `/historico`)

- Filtros por tipo/busca/ordenação (`ExamFilters`), `ExamCard` com questões/tempo/tentativas; correção automática + dissertativas com fila de correção (`/admin/simulados/correcoes`).

## Uploads (`src/app/api/upload/*`)

- `course-cover`, `exam-cover`, `tutorial-cover`, `exam-question-image`: auth por papel, rate-limit por IP, validação de tipo/tamanho, `sharp` → webp, salvamento em `public/uploads/*` (volume `hexavante_uploads`).
- **Regra dura**: toda rota retorna JSON mesmo em erro 500 (try/catch + import lazy do sharp); cliente usa `src/lib/upload-client.ts` (parse seguro).
