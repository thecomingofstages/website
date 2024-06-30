import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import "react-multi-carousel/lib/styles.css";

import { products } from "../data";
import { ProductCarousel } from "./ProductCarousel";
import { PurchaseForm } from "./PurchaseForm";

export const runtime = "edge";

export async function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export default function ShopItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = products.find((product) => product.id === id);
  if (!product) {
    return redirect("/shop");
  }
  return (
    <div className="flex min-h-screen h-full justify-center">
      <div className="flex flex-col max-w-xl w-full">
        <ProductCarousel title={product.title} images={product.images} />
        <div className="px-6 py-8 space-y-1">
          <Link
            href="/shop"
            className="bg-white/15 text-sm px-4 py-3 rounded-lg font-medium"
          >
            <ArrowLeft className="w-5 h-5 -mt-1 inline mr-2" />
            <span>กลับไปยังหน้ารายการสินค้า</span>
          </Link>
          <h1 className="text-4xl font-serif font-bold pt-6">
            {product.title}
          </h1>
          <span className="text-xl font-medium">{product.price}฿</span>
          <div className="leading-7 space-y-2 py-2">{product.description}</div>
          <div className="pt-2">
            <h2 className="rounded-t-lg text-black bg-white px-4 py-3 font-bold text-lg">
              สั่งซื้อสินค้า
            </h2>
            <PurchaseForm
              title={product.title}
              id={product.id}
              price={product.price}
              size={product.size}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
