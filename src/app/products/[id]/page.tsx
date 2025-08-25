// app/products/[id]/page.tsx
import axios from "@/lib/axios";
import ProductDetailClient from "./ProductDetailClient";

type Product = {
    objectId: string;
    title: string;
    price: number;
    stock: number;
    image: string;
    ratings?: number;
};

// Static Params
export async function generateStaticParams() {
    const res = await axios.get<Product[]>("/products");
    return res.data.map((product) => ({ id: product.objectId }));
}

// Fetch API di server component
export default async function ProductDetailPage({ params }: any) {
    const res = await axios.get<Product>(`/products/${params.id}`);
    const product = res.data;

    return <ProductDetailClient product={product} />;
}
