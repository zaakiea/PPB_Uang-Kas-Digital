import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Ambil semua data user (untuk Admin melihat daftar mahasiswa)
export async function GET() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "MAHASISWA") // Hanya ambil mahasiswa
    .order("nama", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Success", data });
}

// POST: Tambah Mahasiswa Baru
export async function POST(request: Request) {
  const body = await request.json();
  const { nim, nama, password } = body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ nim, nama, password, role: "MAHASISWA" }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Mahasiswa berhasil ditambahkan", data });
}
