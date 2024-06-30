import "react-multi-carousel/lib/styles.css";

import { CartItems } from "./CartItems";
import { ShopHeader } from "./Header";
import { LandingCarosuel } from "./LandingCarousel";
import { ProductList } from "./ProductList";

export default function ShopMainPage() {
  return (
    <div className="flex min-h-screen h-full justify-center">
      <div className="flex flex-col max-w-xl w-full">
        <LandingCarosuel />
        <ShopHeader />
        <div className="px-6">
          <CartItems />
        </div>
        <div className="p-6">
          <div className="p-6 space-y-4 bg-white/15 rounded-xl">
            <p className="leading-7">
              <b>Pre-Order สินค้า TCOS&apos; Merchandise</b>{" "}
              โดยสินค้าทั้งหมดถูกออกแบบโดยได้รับแรงบันดาลใจจากละครเวทีของเราในปีนี้
              นั่นก็คือเรื่อง Hansel & Gretel 👧🏽🧒🏼
              <br />
            </p>
            <p className="leading-7">
              สามารถสั่งซื้อสินค้าได้ตั้งแต่<b>วันที่ 30 มิ.ย. - 7 ก.ค. 2567</b>{" "}
              โดยสินค้าจะถูกจัดส่งตั้งแต่วันที่ 14 ก.ค. เป็นต้นไป
            </p>
          </div>
          <div className="space-y-4 pt-4">
            <h2 className="font-serif font-bold text-3xl pt-2">Our Products</h2>
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
