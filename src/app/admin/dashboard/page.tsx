"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-500">Ringkasan keuangan angkatan</p>
      </header>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Wallet size={24} />
            </div>
            <span className="font-medium opacity-90">Total Saldo Kas</span>
          </div>
          <p className="text-3xl font-bold">Rp 12.500.000</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <span className="font-medium text-gray-600">
              Pemasukan Bulan Ini
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp 1.200.000</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <TrendingDown size={24} />
            </div>
            <span className="font-medium text-gray-600">
              Pengeluaran Bulan Ini
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">Rp 450.000</p>
        </div>
      </div>

      {/* Area untuk Daftar Transaksi Terbaru (Nanti di-fetch) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4">Transaksi Terbaru</h2>
        <div className="text-center text-gray-400 py-8">
          Belum ada transaksi baru
        </div>
      </div>
    </div>
  );
}
