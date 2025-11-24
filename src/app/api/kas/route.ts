import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Ambil semua transaksi (Bisa difilter nanti di frontend)
export async function GET() {
  // Join table transactions dengan users untuk dapat nama penginput
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      users (
        nama,
        nim
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Success", data });
}

// POST: Input Transaksi Baru (Pemasukan/Pengeluaran)
export async function POST(request: Request) {
  const body = await request.json();
  // Pastikan body mengirim: judul, nominal, tipe, user_id, status
  const { judul, nominal, tipe, user_id, status, bukti_foto } = body;

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        judul,
        nominal: parseInt(nominal),
        tipe,
        user_id,
        status: status || "PENDING",
        bukti_foto,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Transaksi berhasil disimpan", data });
}
