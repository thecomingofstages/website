import Image from "next/image";
import React from "react";

import Facebook from "@/app/home/sections/Contact/Facebook_logo.png";
import IG from "@/app/home/sections/Contact/IG_logo.png";
import Email from "@/app/home/sections/Contact/Mail_logo.png";
import TikTok from "@/app/home/sections/Contact/TikTok_logo.png";
import logoWhite from "@/app/images/logo-white.png";
import Candy from '@/app/home/sections/Contact/background.png';

export const ContactSection = () => {
  return (
    <footer
      id="contact"
      className="w-full flex md:flex-row flex-col justify-center items-center p-10 "
    >
      
      <div id="logo">
        <div className="p-1 md:justify-center items-center">
          <Image
            src={logoWhite}
            width={203}
            height={175}
            alt="logo"
          />
        </div>
      </div>
  
      <div className="p-5">
        <div id="termtext">
          <div className="pl-3 md:text-left text-center">
            <p className="md:underline">Terms and policy</p>
          </div>
        </div>
        <div id="social-link">
          <div className="p-3">
            <div className="flex gap-3 ">
              <a href="https://www.facebook.com/profile.php?id=61557725535970&mibextid=LQQJ4d">
              <Image
                src={Facebook}
                className="flex-shrink-0 cursor-pointer hover:text-yellow-600"
                width={45}
                height={45}
                alt="Facebook"
              />
              </a>           
              <a href="https://www.instagram.com/thecomingofstages/">
              <Image
                src={IG}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="Instagram"                
              />
              </a>
              <a href="https://www.tiktok.com/@thecomingofstages?_t=8lkgjm7nlwo&_r=1">
              <Image
                src={TikTok}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="Tiktok"
              />
              </a>              
              <p className="pt-3 font-medium">@thecomingofstages</p>
            </div>
          </div>

          <div id="email">
            <div className="p-3">
              <div className="flex gap-3">
              <Image
                src={Email}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
              <p className="pt-3 font-medium ">official_account@thecomingofstages.com</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>  
      {/* <div className="absolute bg-cover bg-center">
        <Image
          src={Candy}
          width={1440}
          height={464}
          alt="logo"
        />
      </div>    */}
    </footer>
  );
};
