import Image from "next/image";
import React from "react";

import logoWhite from "@/app/images/logo-white.png";

import Facebook from "./Facebook_logo.png";
import IG from "./IG_logo.png";
import Email from "./Mail_logo.png";
import TikTok from "./TikTok_logo.png";
import Candy from "./background.png";

export const ContactSection = () => {
  return (
    <footer
      id="contact"
      className="w-screen relative overflow-x-hidden min-h-[600px] md:min-h-[450px] flex flex-col justify-end"
    >
      <div className="absolute inset-0 z-10 flex md:flex-row flex-col justify-center items-center p-10 gap-2 md:gap-10">
        <div className="p-1 md:justify-center items-center">
          <Image
            src={logoWhite}
            width={180}
            height={180}
            alt="logo"
            className="max-w-[150px] lg:max-w-[unset]"
          />
        </div>

        <div>
          {/* <div id="termtext">
              <div className="pl-3 md:text-left text-center">
                <p className="md:underline">Terms and policy</p>
              </div>
            </div> */}
          <div
            id="social-link"
            className="flex flex-col gap-6 items-center md:items-start"
          >
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-4">
              <div className="flex flex-row gap-3">
                <a
                  title="Facebook"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/profile.php?id=61557725535970&mibextid=LQQJ4d"
                >
                  <Image
                    src={Facebook}
                    className="flex-shrink-0 cursor-pointer hover:text-yellow-600"
                    width={45}
                    height={45}
                    alt="Facebook"
                  />
                </a>
                <a
                  title="Instagram"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/thecomingofstages/"
                >
                  <Image
                    src={IG}
                    className="flex-shrink-0"
                    width={45}
                    height={45}
                    alt="Instagram"
                  />
                </a>
                <a
                  title="Tiktok"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.tiktok.com/@thecomingofstages?_t=8lkgjm7nlwo&_r=1"
                >
                  <Image
                    src={TikTok}
                    className="flex-shrink-0"
                    width={45}
                    height={45}
                    alt="Tiktok"
                  />
                </a>
              </div>
              <p className="font-medium">@thecomingofstages</p>
            </div>

            <a
              id="email"
              href="mailto:official_account@thecomingofstages.com"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-4"
            >
              <Image
                src={Email}
                className="flex-shrink-0"
                width={45}
                height={45}
                alt="logo"
              />
              <p className="font-medium">
                official_account@thecomingofstages.com
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="relative bottom-0 h-[200px] sm:h-[300px] overflow-x-hidden">
        <Image
          src={Candy}
          fill
          alt="Candy"
          className="object-cover object-center xl:object-[50%_60%]"
        />
      </div>
    </footer>
  );
};
