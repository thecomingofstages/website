import Image from "next/image";
import React from "react";

import Facebook from "@/app/home/sections/Contact/Facebook_logo.png";
import IG from "@/app/home/sections/Contact/IG_logo.png";
import Email from "@/app/home/sections/Contact/Mail_logo.png";
import TikTok from "@/app/home/sections/Contact/TikTok_logo.png";
import logoWhite from "@/app/images/logo-white.png";

export const ContactSection = () => {
  return (
    <footer
      id="contact"
      className="w-full flex md:flex-row flex-col justify-around items-start p-10"
    >
      <div className="p-5">
        <Image
          src={logoWhite}
          className="flex-shrink-0"
          width={250}
          height={190}
          alt="logo"
        />
      </div>
      <div className="dfd">
        <div className="dff">
          <div className="p-1">
            <p>Terms and policy</p>
          </div>
        </div>
        <div className="dff">
          <div className="p-3">
            <div className="flex gap-6 pb-5">
              <Image
                src={Facebook}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
              <Image
                src={IG}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
              <Image
                src={TikTok}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
              <p>@thecomingofstages</p>
            </div>
          </div>
          <div className="df">
            <div className="p-3">
              <Image
                src={Email}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
