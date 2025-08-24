/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");

// 🔑 Baca environment variables dari .env (supaya API key tidak hardcode di kode)
const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY;

module.exports = {
    // 🌍 URL utama website (harus domain production, misalnya "https://seo-practical-v1.vercel.app/")
    siteUrl: "https://seo-practical-v1.vercel.app/",

    // 📄 Auto-generate robots.txt (biar mesin pencari tahu halaman mana yang boleh/cuma-cuma di-crawl)
    generateRobotsTxt: true,

    // 📦 Batas maksimal jumlah URL per file sitemap.xml (default 5000, di sini dinaikkan ke 7000)
    sitemapSize: 7000,

    // 📂 Folder output hasil generate (biasanya "./public" supaya otomatis bisa diakses)
    outDir: "./public",

    // 🛠 Tambahan path dinamis / statis untuk sitemap
    additionalPaths: async (config) => {
        // 🔗 Fetch data produk dari Backendless (REST API)
        const products = await axios
            .get(
                `https://api.backendless.com/${APP_ID}/${API_KEY}/data/products`
            )
            .then((res) => res.data)
            .catch(() => []); // kalau error, fallback ke array kosong

        // 📍 Halaman statis manual yang pasti ada
        const staticPaths = [
            await config.transform(config, "/"),          // halaman home
            await config.transform(config, "/products"),  // halaman daftar produk
        ];

        // 🔄 Generate halaman detail produk (dinamis berdasarkan objectId produk)
        const productPaths = await Promise.all(
            products.map((product) =>
                config.transform(config, `/products/${product.objectId}`)
            )
        );

        // 🔗 Gabungkan semua path (statis + dinamis)
        return [...staticPaths, ...productPaths];
    },

    /**
     * 📝 NOTES:
     * - `siteUrl` → domain utama web
     * - `generateRobotsTxt` → auto buat file robots.txt
     * - `sitemapSize` → max jumlah link per file sitemap
     * - `outDir` → folder hasil generate
     * - `additionalPaths` → untuk tambah URL manual / dinamis (misalnya data produk dari API)
     * 
     * ⚠️ Penting:
     * - Jangan pakai import alias (misal "@/lib/axios") karena file ini jalan langsung di Node.js plain,
     *   bukan di Next.js environment.
     */
};
