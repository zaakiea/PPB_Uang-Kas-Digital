import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // Import Auth
import Navigation from "@/components/Navigation"; // Import Navigasi

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uang Kas Digital",
  description: "Aplikasi Pengelolaan Kas Angkatan PWA",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AuthProvider>
          <div className="flex min-h-screen">
            {/* Sidebar (Navigation) akan muncul di sini */}
            <Navigation />

            {/* Main Content Area */}
            {/* Di Desktop (md), geser konten ke kanan sebesar lebar sidebar (pl-64) */}
            {/* Di Mobile, beri padding bawah agar tidak tertutup bottom nav (pb-20) */}
            <main className="flex-1 md:pl-64 pb-20 md:pb-0">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
