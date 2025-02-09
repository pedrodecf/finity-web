import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../assets/styles/globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Finity | Controle de Gastos",
  description:
    "Conheça o Finity, o app de controle de gastos e custos que simplifica suas finanças. Acompanhe despesas, planeje seu orçamento e alcance mais segurança financeira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={dmSans.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <div id="portal-root" />
        <Toaster />
      </body>
    </html>
  );
}
