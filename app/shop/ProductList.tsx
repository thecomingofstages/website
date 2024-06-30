import Image from "next/image";
import Link from "next/link";

import { products } from "./data";

export function ProductList() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <Link
          key={product.title}
          href={`/shop/${product.id}`}
          className="flex flex-col"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-t-md"
          />
          <div className="flex flex-col p-4 rounded-b-md bg-white/10">
            <b className="text-xl font-serif">{product.title}</b>
            <span>{product.price}฿</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
