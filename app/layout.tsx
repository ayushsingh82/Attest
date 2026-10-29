import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Header } from "@/components/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Reserve Guard", template: "%s - Reserve Guard" },
  description: "A Chainlink CRE workflow that checks token reserves against supply and writes a risk status on-chain.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
