"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAdminSession, createVerificationCode, verifyCode, deleteAdminSession } from "@/lib/admin-auth";
import { canModerate } from "@/lib/permissions";
import { redirect } from "next/navigation";

export type AdminAuthResult = { ok: boolean; error?: string; email?: string };

async function getUserRoles(userId: string): Promise<string[]> {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    include: { role: { select: { name: true } } },
  });
  return roles.map((r) => r.role.name);
}

export async function adminLoginAction(email: string, password: string): Promise<AdminAuthResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, email: true, passwordHash: true },
    });
    if (!user) return { ok: false, error: "E-mail ou senha incorretos." };
    if (!user.passwordHash) return { ok: false, error: "Conta criada via OAuth. Use recuperação de senha." };

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return { ok: false, error: "E-mail ou senha incorretos." };

    const roles = await getUserRoles(user.id);
    if (!canModerate(roles)) return { ok: false, error: "Sem permissão de administração." };

    const code = await createVerificationCode(user.id, user.email);

    console.log(`\n╔══════════════════════════════════════╗`);
    console.log(`║   CÓDIGO DE VERIFICAÇÃO ADMIN        ║`);
    console.log(`║   ${user.email}`);
    console.log(`║   Código: ${code}`);
    console.log(`╚══════════════════════════════════════╝\n`);

    return { ok: true, email: user.email };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erro ao fazer login" };
  }
}

export async function adminVerifyAction(email: string, code: string): Promise<AdminAuthResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true },
    });
    if (!user) return { ok: false, error: "Usuário não encontrado." };

    const roles = await getUserRoles(user.id);
    if (!canModerate(roles)) return { ok: false, error: "Sem permissão." };

    const valid = await verifyCode(user.id, code);
    if (!valid) return { ok: false, error: "Código inválido ou expirado." };

    await createAdminSession(user.id);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erro ao verificar" };
  }
  redirect("/admin");
}

export async function adminLogoutAction() {
  await deleteAdminSession();
  redirect("/admin-login");
}
