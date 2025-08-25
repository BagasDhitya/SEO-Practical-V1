// app/products/page.tsx
import axios from "@/lib/axios";
import ProductListClient from "./ProductListClient";

type Product = {
    objectId: string;
    title: string;
    price: number;
    stock: number;
    image: string;
    ratings?: number;
};

// Fetch API di server component
export default async function ProductPage() {
    const res = await axios.get<Product[]>("/products");
    const products = res.data;

    return <ProductListClient products={products} />;
}
