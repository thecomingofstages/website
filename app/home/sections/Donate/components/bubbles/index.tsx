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
    <Disclosure as="div" className="flex flex-row relative ">
      <DisclosureButton className="w-full pb-2 z-10">
        <Image src={bubbleFront} alt={title} width={200} height={200} />
      </DisclosureButton>

      <div className="w-full h-full overflow-hidden">
        <Transition
          enter="duration-200 ease-out"
          enterFrom="opacity-0 -translate-x-6"
          enterTo="opacity-100 translate-x-0"
          leave="duration-300 ease-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-2"
        >
          <DisclosurePanel className="absolute transition left-12 z-0 mt-0">
            <div className=" border-white border rounded-r-3xl h-24 w-80">
              <div id="content" className="ml-10">
                <p className="p-5 text-xs leading-normal">{content}</p>
              </div>
              
            </div>
          </DisclosurePanel>
        </Transition>
      </div>

    </Disclosure>
  );
};
