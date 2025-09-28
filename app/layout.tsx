import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Editorial Workflow Management System",
  description:
    "Responsive editorial services platform with role-based dashboards, secure payments, and automated communications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-start px-6 py-6">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              Editorial Manager
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 pb-20">{children}</main>
        <footer className="border-t border-slate-200 bg-white/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Editorial Workflow Management System</span>
            <span>Secure payments · Audit-ready communications · SLA-backed delivery</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
