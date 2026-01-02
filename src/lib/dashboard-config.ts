// File: src/lib/dashboard-config.js
// Deskripsi: Konfigurasi terpusat untuk setiap halaman dashboard,
// termasuk judul, kolom tabel, endpoint API, dan komponen form.

// Impor komponen form (asumsi Anda memiliki komponen generik atau spesifik)
import { GenericForm } from '@/components/form/GenericForm';

export const dashboardConfig = {
  "/peserta": {
    title: "Management Peserta",
    query: "/participants",
    description: "Kelola data peserta yang terdaftar dalam sistem.",
    tableTitle: "Data Peserta",
  },
  "/email": {
    title: "Kirim Email Massal",
    query: "/email/send",
    description: "Kirim email massal kepada peserta atau pengguna tertentu.",
    tableTitle: "Riwayat Pengiriman Email",
  }
};
