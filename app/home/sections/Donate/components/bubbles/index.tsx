import Image from "next/image";

import { Disclosure, Transition, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from 'framer-motion'

import { BubbleData } from "./types";

export const Bubble = ({ bubbleFront, content, title }: BubbleData) => {
  // return (
  //   <Disclosure as="div" className="w-full max-w-md">
  //     <DisclosureButton>
  //       <Image src={bubbleFront} alt={title} width={200} height={200} />
  //     </DisclosureButton>
  //     <DisclosurePanel>
  //       {content}
  //     </DisclosurePanel>
  //     {/* <div data-ref="back">{content}</div> */}
  //   </Disclosure>
  // );
  return (
    <Disclosure as="div" className="relative w-full max-w-md">
      <DisclosureButton className="w-full pb-2">
        <Image src={bubbleFront} alt={title} width={200} height={200} />
      </DisclosureButton>

      <div className="w-full h-full overflow-hidden ">
        <Transition
          enter="duration-200 ease-out"
          enterFrom="opacity-0 -translate-x-6"
          enterTo="opacity-100 translate-x-0"
          leave="duration-300 ease-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-6"
        >
          <DisclosurePanel className="transition w-full">
            <div className="w-70 h-70 border-white border rounded-r-3xl ">
              <p className="p-10">{content}</p>
            </div>
            
          </DisclosurePanel>
        </Transition>
      </div>

    </Disclosure>
  );
};
