import { Bebas_Neue, Anton } from "next/font/google";
import type { Metadata } from "next";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata: Metadata = {
  title: "APEX | System Authorization",
  description: "Discipline creates legends.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bebas.variable} ${anton.variable} font-sans`}>
      {children}
    </div>
  );
}
