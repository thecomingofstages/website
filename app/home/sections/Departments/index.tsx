import Image from "next/image";

import { DepartmentImages } from "./images";
import background from "./images/background.png";

export default function DepartmentsSection() {
  return (
    <div className="overflow-x-scroll w-full">
      <div className="relative z-10 h-[500px] xl:h-[700px] aspect-[87/26]">
        <div className="absolute left-[90.69px] top-[63.77px] xl:left-[126.96px] xl:top-[89.28px] z-10">
          <div className="flex h-[370px] xl:h-[520px] gap-x-[3px] gap-y-[3px] xl:gap-x-[4.5px] xl:gap-y-[4px] flex-col flex-wrap">
            <DepartmentImages
              width={257}
              height={257}
              className="w-[183.26px] h-[183.26px] xl:w-[257px] xl:h-[257px]"
            />
          </div>
        </div>
        <Image
          src={background}
          alt="background"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
