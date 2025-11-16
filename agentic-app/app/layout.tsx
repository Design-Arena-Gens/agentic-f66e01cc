import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "TikTok Shop Automator",
  description:
    "Automatisez vos vitrines TikTok Shop, générez des scripts vidéo et planifiez vos publications produits en quelques minutes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-950 text-slate-100`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
