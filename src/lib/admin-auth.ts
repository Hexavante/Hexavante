import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { canModerate } from "./permissions";

const COOKIE = "hx_admin_session";
const SESSION_HOURS = 8;

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;
    console.log(`[admin-auth-debug] hasToken=${Boolean(token)}`);
    if (!token) return null;

    console.log(`[admin-auth-debug] delegate=${typeof (prisma as unknown as Record<string, unknown>).adminSession}`);
    const session = await prisma.adminSession.findUnique({
      where: { token },
      include: {
        user: {
          select: { id: true, name: true, email: true, username: true, avatarUrl: true },
        },
      },
    });
    console.log(`[admin-auth-debug] sessionFound=${Boolean(session)}`);
    if (!session) return null;
    if (session.expiresAt < new Date()) {
      await prisma.adminSession.delete({ where: { id: session.id } });
      return null;
    }

    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.userId },
      include: { role: { select: { name: true } } },
    });
    const roles = userRoles.map((r) => r.role.name);

    return { ...session.user, roles };
  } catch (e) {
    const name = e instanceof Error ? e.constructor.name : typeof e;
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? (e.stack ?? "").split("\n").slice(0, 3).join(" | ") : "";
    console.log(`[admin-auth-debug] error name=${name} msg=${msg} stack=${stack}`);
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdminSession();
  if (!user) throw new Error("UNAUTHORIZED");
  if (!canModerate(user.roles)) throw new Error("FORBIDDEN");
  return user;
}

export async function createAdminSession(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: { userId, token, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });

  return token;
}

export async function deleteAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE)?.value;
    if (token) {
      await prisma.adminSession.deleteMany({ where: { token } });
    }
    cookieStore.delete(COOKIE);
  } catch {}
}

export async function createVerificationCode(userId: string, email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.adminVerificationCode.deleteMany({
    where: { userId, used: false },
  });

  await prisma.adminVerificationCode.create({
    data: { userId, code, email, expiresAt },
  });

  return code;
}

export async function verifyCode(userId: string, code: string) {
  const record = await prisma.adminVerificationCode.findFirst({
    where: { userId, code, used: false, expiresAt: { gt: new Date() } },
  });
  if (!record) return false;

  await prisma.adminVerificationCode.update({
    where: { id: record.id },
    data: { used: true },
  });

  return true;
}
