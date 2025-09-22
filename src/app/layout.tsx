import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AdsSmart AI - Automação Publicitária com Inteligência Artificial",
  description: "Plataforma SaaS que automatiza completamente o processo de criação, lançamento e otimização de campanhas publicitárias no Meta Ads (Facebook e Instagram) com inteligência artificial.",
  keywords: ["Meta Ads", "Facebook Ads", "Instagram Ads", "Automação Publicitária", "Inteligência Artificial", "SaaS", "Marketing Digital"],
  authors: [{ name: "AdsSmart AI Team" }],

  robots: "index, follow",
  openGraph: {
    title: "AdsSmart AI - Automação Publicitária com IA",
    description: "Automatize suas campanhas publicitárias no Meta Ads com inteligência artificial. Crie, lance e otimize campanhas profissionais em poucos minutos.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdsSmart AI - Automação Publicitária com IA",
    description: "Automatize suas campanhas publicitárias no Meta Ads com inteligência artificial.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${poppins.variable} font-inter antialiased bg-gray-50 text-gray-900`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
