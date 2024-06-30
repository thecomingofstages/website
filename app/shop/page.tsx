import Image from "next/image";

import "react-multi-carousel/lib/styles.css";

import LogoWhite from "@/app/images/logo-black.png";

import { LandingCarosuel } from "./LandingCarousel";

export default function ShopMainPage() {
  return (
    <div className="flex min-h-screen h-full justify-center">
      <div className="flex flex-col max-w-xl w-full">
        <LandingCarosuel />
        <div className="flex flex-row px-6 py-4 gap-4">
          <div className="p-4 bg-white rounded-full">
            <Image src={LogoWhite} alt="logo" width={60} height={60} />
          </div>
          <div className="flex flex-col justify-center">
            <span className="opacity-90 text-sm">The Coming of Stages</span>
            <h1 className="font-bold text-2xl">Merchandise Shop</h1>
          </div>
        </div>
        <div className="px-6">
          <div className="p-6 space-y-4 bg-white/15 rounded-xl">
            <p className="leading-7">
              <b>Pre-Order สินค้า TCOS&apos; Merchandise</b>{" "}
              โดยสินค้าทั้งหมดถูกออกแบบโดยได้รับแรงบันดาลใจจากละครเวทีของเราในปีนี้
              นั่นก็คือเรื่อง Hansel & Gretel 👧🏽🧒🏼
              <br />
            </p>
            <p className="leading-7">
              สามารถสั่งซื้อสินค้าได้ตั้งแต่<b>วันที่ 30 มิ.ย. - 7 ก.ค. 2567</b>
              โดยสินค้าจะถูกจัดส่งตั้งแต่วันที่ 14 ก.ค. เป็นต้นไป
            </p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-serif font-bold text-3xl">Our Products</h2>
        </div>
      </div>
    </div>
  );
}
