import DOMPurify from "isomorphic-dompurify";
import { buildAllThemesStyleBlock } from "@/lib/cosmetics";

/** Injeta variáveis CSS de todos os temas (escopadas por classe). */
export function ThemeStyles() {
  const css = buildAllThemesStyleBlock();
  if (!css) return null;

  const sanitized = DOMPurify.sanitize(css, {
    USE_PROFILES: { html: false },
  });

  return <style id="hexavante-theme-vars" dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
