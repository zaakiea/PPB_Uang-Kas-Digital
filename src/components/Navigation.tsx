"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  Users,
  User,
  LogOut,
  History,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Jangan tampilkan navigasi di halaman login
  if (pathname === "/login") return null;
  if (!user) return null;

  // Menu untuk ADMIN
  const adminMenus = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Mahasiswa", href: "/admin/mahasiswa", icon: Users },
    { name: "Transaksi", href: "/admin/transaksi", icon: Wallet },
    { name: "Profil", href: "/admin/profil", icon: User },
  ];

  // Menu untuk MAHASISWA
  const mhsMenus = [
    { name: "Saldo", href: "/mahasiswa/dashboard", icon: Home },
    { name: "Histori", href: "/mahasiswa/histori", icon: History },
    { name: "Bayar", href: "/mahasiswa/bayar", icon: FileText },
    { name: "Profil", href: "/mahasiswa/profil", icon: User },
  ];

  const menus = user.role === "ADMIN" ? adminMenus : mhsMenus;

  return (
    <>
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600">Uang Kas Digital</h1>
          <p className="text-xs text-gray-500 mt-1">Halo, {user.nama}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname.startsWith(menu.href)
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <menu.icon size={20} />
              {menu.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* --- BOTTOM NAVIGATION (Mobile) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname === menu.href ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <menu.icon
              size={24}
              strokeWidth={pathname === menu.href ? 2.5 : 2}
            />
            <span className="text-[10px] mt-1 font-medium">{menu.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
