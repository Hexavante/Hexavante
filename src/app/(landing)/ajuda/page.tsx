"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Target,
  Settings,
  CreditCard,
  Search,
  MessageCircle,
  Mail,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

const categories = [
  {
    icon: BookOpen,
    title: "Cursos",
    articles: [
      {
        q: "Como acessar meus cursos?",
        a: 'Vá até "Cursos" no menu lateral. Lá você encontra todos os cursos em que está matriculado, além do catálogo completo para se inscrever em novos cursos.',
      },
      {
        q: "Como concluir uma aula?",
        a: "Ao finalizar uma aula, marque ela como concluída clicando no botão de check. O progresso do curso será atualizado automaticamente.",
      },
      {
        q: "Posso baixar material para offline?",
        a: "Sim! No aplicativo móvel (Capacitor), você pode baixar aulas e materiais para estudar sem conexão.",
      },
    ],
  },
  {
    icon: Target,
    title: "Simulados",
    articles: [
      {
        q: "Como funciona o simulado ao vivo?",
        a: "Os simulados ao vivo têm horário marcado. Ao iniciar, você terá um tempo limitado para responder todas as questões. O gabarito é liberado ao final.",
      },
      {
        q: "Posso refazer um simulado?",
        a: "Sim. Você pode refazer simulados quantas vezes quiser. Apenas a última tentativa contará para o ranking.",
      },
      {
        q: "Como é feita a correção?",
        a: "Questões objetivas são corrigidas automaticamente. Questões discursivas são corrigidas por instrutores com prazo de até 48h.",
      },
    ],
  },
  {
    icon: Settings,
    title: "Conta e configurações",
    articles: [
      {
        q: "Como altero minha foto de perfil?",
        a: 'Vá até Configurações → Perfil e faça upload de uma nova imagem. Você também pode personalizar com itens da loja.',
      },
      {
        q: "Esqueci minha senha",
        a: 'Na página de login, clique em "Esqueci minha senha" e siga as instruções enviadas por e-mail.',
      },
      {
        q: "Como excluo minha conta?",
        a: "Entre em contato com nosso suporte pelo e-mail suporte@hexavante.com.br. A exclusão é processada em até 7 dias.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Hexa (assinatura)",
    articles: [
      {
        q: "O que é o Hexa?",
        a: "O Hexa é nosso plano premium que desbloqueia todo o conteúdo, cosméticos exclusivos e recursos avançados.",
      },
      {
        q: "Como assino o Hexa?",
        a: 'Acesse a página "/hexa" e escolha o plano. O pagamento é processado de forma segura via gateway.',
      },
      {
        q: "Posso cancelar a qualquer momento?",
        a: "Sim. Acesse Configurações → Assinatura e clique em Cancelar. O acesso continua até o fim do período pago.",
      },
    ],
  },
];

export default function AjudaPage() {
  const [search, setSearch] = useState("");
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const filtered = categories
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          a.q.toLowerCase().includes(search.toLowerCase()) ||
          a.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.articles.length > 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <LandingHeader user={null} />

      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[10rem]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <div className="hx-icon-box mx-auto mb-4 h-14 w-14 rounded-2xl">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
            Central de ajuda
          </h1>
          <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.48)]">
            Encontre respostas para suas dúvidas.
          </p>

          <div className="mx-auto mt-6 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--sidebar-foreground)/0.36)]" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-[hsl(var(--sidebar-foreground))] placeholder-[hsl(var(--sidebar-foreground)/0.36)] outline-none transition focus:border-[hsl(var(--sidebar-highlight)]/40 focus:ring-1 focus:ring-[hsl(var(--sidebar-highlight)]/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.36)]">
                Nenhum artigo encontrado para &quot;{search}&quot;
              </p>
            </div>
          )}

          <div className="space-y-10">
            {filtered.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title}>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-5 w-5 hx-accent-text" />
                    <h2 className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">{cat.title}</h2>
                  </div>
                  <div className="space-y-2">
                    {cat.articles.map((article) => {
                      const key = `${cat.title}-${article.q}`;
                      const isOpen = openArticle === key;
                      return (
                        <div key={key} className="hx-card overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenArticle(isOpen ? null : key)}
                            className="flex w-full items-center justify-between px-5 py-4 text-left"
                          >
                            <span className="text-sm font-medium text-[hsl(var(--sidebar-foreground))]">
                              {article.q}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 flex-shrink-0 text-[hsl(var(--sidebar-foreground)/0.36)] transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="border-t border-white/[0.06] px-5 py-4">
                              <p className="text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)]">
                                {article.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hx-card-accent mt-16 p-8 text-center">
            <MessageCircle className="mx-auto mb-3 h-8 w-8 hx-accent-text" />
            <h3 className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">
              Ainda precisa de ajuda?
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.48)]">
              Nossa equipe está pronta para ajudar.
            </p>
            <a
              href="mailto:suporte@hexavante.com.br"
              className="hx-hero-btn mt-4 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--sidebar-highlight))] px-6 py-3 text-sm font-bold text-[hsl(var(--sidebar-background))] transition hover:brightness-110"
              style={{ boxShadow: "0 8px 24px hsl(var(--sidebar-highlight) / 0.3)" }}
            >
              <Mail className="h-4 w-4" />
              Enviar e-mail
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
