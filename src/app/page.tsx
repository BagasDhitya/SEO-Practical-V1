import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
        Selamat Datang di WarungKu
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6 max-w-xl">
        Belanja kebutuhan sehari-hari kini lebih mudah. Temukan produk terbaik
        seperti kopi, teh, coklat, dan lainnya dengan harga terjangkau.
      </p>
      <Link
        href="/products"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
      >
        Lihat Produk
      </Link>
    </main>
  );
}
