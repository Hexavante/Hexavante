import Link from "next/link";
import { HexavanteLogo } from "@/components/brand/hexavante-logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center"
        aria-label="Hexavante - Página inicial"
      >
        <HexavanteLogo size="md" wordmarkClassName="text-white" />
      </Link>
      {children}
    </div>
  );
}
