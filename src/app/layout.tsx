import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--poppins-font'
})

export const metadata: Metadata = {
  // 🟢 Judul halaman → elemen terpenting untuk SEO (muncul di SERP & tab browser)
  title: "WarungKu | Mini E-Commerce",

  // 🟢 Meta description → mendeskripsikan isi halaman, mempengaruhi CTR di hasil pencarian
  description: "WarungKu adalah aplikasi e-commerce sederhana untuk kebutuhan sehari-hari. Belanja cepat, mudah, dan terpercaya.",

  // 🟢 Keywords → membantu mesin pencari memahami topik utama (walaupun Google modern kurang fokus, tapi masih berguna)
  keywords: ["WarungKu", "E-commerce", "Belanja Online", "Produk Murah", "Mini E-commerce"],

  // 🟢 Open Graph → meningkatkan SEO untuk social media (Facebook, LinkedIn, WhatsApp preview)
  openGraph: {
    title: "WarungKu | Mini E-Commerce", // 🟢 Judul yang muncul saat share
    description: "Belanja kebutuhan sehari-hari lebih mudah dengan WarungKu.", // 🟢 Deskripsi share
    url: "https://warungku.com", // 🟢 URL utama (canonical link, bagus untuk SEO off-page)
    siteName: "WarungKu",
    images: [
      {
        url: "https://example.com/og-image.jpg", // 🟢 Gambar untuk preview share (meningkatkan engagement)
        width: 800,
        height: 600,
        alt: "WarungKu E-commerce", // 🟢 Alt text untuk SEO gambar
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // 🟢 Robots → mengizinkan mesin pencari untuk index dan follow link (sangat penting untuk SEO)
  robots: {
    index: true, // halaman diindeks
    follow: true, // link diikuti oleh crawler
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* 🟢 `lang="id"` → memberi tahu mesin pencari dan screen reader bahwa konten berbahasa Indonesia */}
      <body className={`bg-gray-50 text-gray-900 ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
