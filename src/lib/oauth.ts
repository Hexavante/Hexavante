export const oauthProviders = {
  google: true,
  github: true,
} as const;

export function hasOAuthProviders() {
  return true;
}

export const oauthErrorMessages: Record<string, string> = {
  OAuthAccountNotLinked:
    "Não foi possível vincular esta conta social ao seu e-mail. Tente entrar com e-mail e senha.",
  OAuthSignin: "Não foi possível iniciar o login social. Tente novamente.",
  OAuthCallback: "Falha ao concluir o login social. Verifique as credenciais OAuth.",
  AccessDenied:
    "Não foi possível concluir o login social. Verifique se o provedor retornou seu e-mail ou use e-mail e senha.",
  Configuration: "Login social não configurado corretamente no servidor.",
};
