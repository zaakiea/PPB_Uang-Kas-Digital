"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan user ke context
      login(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    /* PERBAIKAN: 
      - 'fixed inset-0 z-50': Membuat halaman ini menutupi seluruh layar (overlay),
        sehingga padding sidebar dari layout.tsx dan background hitam tidak terlihat.
      - 'bg-gray-50': Memberikan warna background terang yang konsisten.
    */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 p-4 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Uang Kas Digital</h1>
          <p className="text-gray-500 text-sm">
            Masuk untuk mengelola kas angkatan
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            {/* PERBAIKAN: text-gray-800 agar tulisan label terlihat jelas */}
            <label className="block text-sm font-medium text-gray-800 mb-1">
              NIM
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              {/* PERBAIKAN: text-black agar inputan user terlihat (tidak putih) */}
              <input
                type="text"
                required
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black placeholder-gray-400"
                placeholder="Masukkan NIM"
              />
            </div>
          </div>

          <div>
            {/* PERBAIKAN: text-gray-800 agar tulisan label terlihat jelas */}
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              {/* PERBAIKAN: text-black agar inputan user terlihat (tidak putih) */}
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-black placeholder-gray-400"
                placeholder="Masukkan Password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk Aplikasi"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
