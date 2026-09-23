import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
});

export const metadata: Metadata = {
  title: "Karen Marie Kasigila",
  description:
    "Director and partner at Africa Climate Finance and Mbeya Avocados. Search Product Tester at Google. Data scientist based in London, Ontario.",
  openGraph: {
    title: "Karen Marie Kasigila",
    description:
      "Climate finance, smallholder avocados, and the Dallas tools from a 2nd-place J.P. Morgan hackathon.",
    url: "https://kasigila.github.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
