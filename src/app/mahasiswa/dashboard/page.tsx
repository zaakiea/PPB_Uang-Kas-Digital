"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { CreditCard, History } from "lucide-react";
import Link from "next/link";

export default function MahasiswaDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "MAHASISWA")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="bg-blue-600 -mx-4 -mt-4 p-8 pb-12 rounded-b-[2rem] text-white shadow-lg md:mx-0 md:mt-0 md:rounded-2xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm mb-1">Selamat Datang,</p>
            <h1 className="text-2xl font-bold">{user.nama}</h1>
            <p className="text-sm opacity-80 mt-1">{user.nim}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-blue-100 text-sm">Saldo Kas Angkatan</p>
          <p className="text-4xl font-bold mt-1">Rp 12.500.000</p>
        </div>
      </header>

      {/* Menu Cepat */}
      <div className="grid grid-cols-2 gap-4 -mt-8 px-2">
        <Link
          href="/mahasiswa/bayar"
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <CreditCard size={24} />
          </div>
          <span className="font-semibold text-gray-700">Bayar Kas</span>
        </Link>
        <Link
          href="/mahasiswa/histori"
          className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <History size={24} />
          </div>
          <span className="font-semibold text-gray-700">Riwayat</span>
        </Link>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-3 text-gray-800">
          Status Pembayaran Terakhir
        </h2>
        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-800">Iuran Bulan Februari</p>
            <p className="text-xs text-gray-500">20 Feb 2025</p>
          </div>
          <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded-full">
            PENDING
          </span>
        </div>
      </div>
    </div>
  );
}
