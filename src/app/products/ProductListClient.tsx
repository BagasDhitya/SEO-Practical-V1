// app/products/ProductListClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { event, pageview, initGA } from "@/lib/googleAnalytics";

type Product = {
    objectId: string;
    title: string;
    price: number;
    stock: number;
    image: string;
    ratings?: number;
};

export default function ProductListClient({ products }: { products: Product[] }) {
    const pathname = usePathname();

    useEffect(() => {
        initGA()
        pageview(pathname); // track pageview hanya di browser
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
                            <p className="text-gray-600 mb-1">Rp {product.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 mb-2">Stok: {product.stock}</p>
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
