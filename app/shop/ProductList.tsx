import Image from "next/image";

import { products } from "./data";

export function ProductList() {
  return (
    <div className="grid grid-cols-2 gap-6 py-4">
      {products.map((product) => (
        <div className="flex flex-col bg-white/10 px-4 pt-4 rounded-sm">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="rounded"
          />
          <div className="flex flex-col py-4">
            <b className="text-xl font-serif">{product.title}</b>
            <span>{product.price}฿</span>
          </div>
        </div>
      ))}
    </div>
  );
}
