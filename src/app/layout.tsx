import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, IBM_Plex_Mono, Barlow_Condensed, Black_Ops_One, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "APEX Protocol",
  description: "Personal transformation operating system.",
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmMono.variable} ${ibmPlexMono.variable} ${barlowCondensed.variable} ${blackOpsOne.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[var(--color-red-primary)] selection:text-white">
        <div className="global-vignette" />
        {children}
      </body>
    </html>
  );
}
