import { redirect } from "next/navigation";

import "react-multi-carousel/lib/styles.css";

import { products } from "../data";
import { ProductCarousel } from "./ProductCarousel";

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
        <div className="flex flex-col px-6 py-8 gap-1">
          <h1 className="text-4xl font-serif font-bold">{product.title}</h1>
          <span className="text-xl font-medium">{product.price}฿</span>
          <div className="leading-7 space-y-2 opacity-90 py-2">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
