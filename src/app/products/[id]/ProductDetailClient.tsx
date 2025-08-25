// app/products/[id]/ProductDetailClient.tsx
"use client";

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

export default function ProductDetailClient({ product }: { product: Product }) {
    const pathname = usePathname();

    useEffect(() => {
        initGA()
        pageview(pathname); // track pageview
    }, [pathname]);

    return (
        <main className="px-6 py-10 max-w-3xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={300}
                    className="w-full md:w-1/2 h-72 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-green-700 mb-3">{product.title}</h1>
                    <p className="text-xl text-gray-800 mb-2">Rp {product.price.toLocaleString()}</p>
                    <p className="text-gray-600 mb-2">Stok: {product.stock}</p>
                    <p className="text-yellow-500 mb-4">
                        ⭐ {product.ratings ? product.ratings.toFixed(1) : "Belum ada rating"}
                    </p>
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() =>
                            event({ action: "Add to Cart", category: "Product Detail", label: product.title, value: product.price })
                        }
                    >
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </main>
    );
}
