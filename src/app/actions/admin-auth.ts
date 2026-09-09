"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAdminSession, createVerificationCode, verifyCode, deleteAdminSession, getAdminSession } from "@/lib/admin-auth";
import { canModerate } from "@/lib/permissions";
import { redirect } from "next/navigation";

export type AdminAuthResult = { ok: boolean; error?: string; email?: string };

export async function adminLoginAction(email: string, password: string): Promise<AdminAuthResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, email: true, passwordHash: true, role: true },
    });
    if (!user) return { ok: false, error: "E-mail ou senha incorretos." };
    if (!canModerate([user.role])) return { ok: false, error: "Sem permissão de administração." };
    if (!user.passwordHash) return { ok: false, error: "Conta criada via OAuth. Use recuperação de senha." };

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return { ok: false, error: "E-mail ou senha incorretos." };

    const code = await createVerificationCode(user.id, user.email);

    console.log(`\n╔══════════════════════════════════════╗`);
    console.log(`║   CÓDIGO DE VERIFICAÇÃO ADMIN        ║`);
    console.log(`║   ${user.email}                       `);
    console.log(`║   Código: ${code}                     `);
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
      select: { id: true, role: true },
    });
    if (!user) return { ok: false, error: "Usuário não encontrado." };
    if (!canModerate([user.role])) return { ok: false, error: "Sem permissão." };

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

export async function getAdminUser() {
  return getAdminSession();
}
