// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { event, pageview } from "@/lib/googleAnalytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Metadata } from "next";

type Product = {
    objectId: string;
    title: string;
    price: number;
    stock: number;
    image: string;
    ratings?: number;
};

// SEO Metadata
export const metadata: Metadata = {
    title: "Daftar Produk - MyShop",
    description: "Lihat semua produk MyShop dengan harga terbaru, stok, dan rating.",
};

export default async function ProductPage() {
    const res = await axios.get<Product[]>("/products");
    const products = res.data;

    return <ProductList products={products} />;
}

// Client component untuk GA4 pageview + event klik
function ProductList({ products }: { products: Product[] }) {
    const pathname = usePathname();

    useEffect(() => {
        pageview(pathname); // track pageview
    }, [pathname]);

    return (
        <main className="px-6 py-10 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-green-700">Daftar Produk</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        href={`/products/${product.objectId}`}
                        key={product.objectId}
                        onClick={() => event({ action: "Click Product", category: "Products Page", label: product.title })}
                    >
                        <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-gray-600 mb-1">
                                Rp {product.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                Stok: {product.stock}
                            </p>
                            <p className="text-yellow-500 text-sm">
                                ⭐ {product.ratings ? product.ratings.toFixed(1) : "Belum ada rating"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
