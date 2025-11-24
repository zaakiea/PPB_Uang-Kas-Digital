"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  nama: string;
  nim: string;
  role: "ADMIN" | "MAHASISWA";
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, SxUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah ada data user tersimpan di localStorage saat aplikasi dibuka
    const storedUser = localStorage.jm_user;
    if (storedUser) {
      SxUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    SxUser(userData);
    localStorage.setItem("jm_user", JSON.stringify(userData));
    // Redirect sesuai role
    if (userData.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/mahasiswa/dashboard");
    }
  };

  const logout = () => {
    SxUser(null);
    localStorage.removeItem("jm_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
