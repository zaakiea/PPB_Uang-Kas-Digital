import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const { nim, password } = await request.json();

  // Cek user berdasarkan NIM dan Password
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("nim", nim)
    .eq("password", password) // Catatan: Di production jangan plain text!
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "NIM atau Password salah" },
      { status: 401 }
    );
  }

  // Return data user agar bisa disimpan di localStorage/Session frontend
  return NextResponse.json({
    message: "Login Berhasil",
    user: {
      id: data.id,
      nama: data.nama,
      role: data.role,
    },
  });
}
