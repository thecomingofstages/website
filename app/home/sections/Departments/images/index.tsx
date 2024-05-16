"use client";

import Image, { ImageProps } from "next/image";

import {
  costumeImage,
  creativeImage,
  danceImage,
  directorImage,
  documentImage,
  financeImage,
  hrImage,
  itImage,
  lightImage,
  marketingImage,
  musicSoundImage,
  propsSetImage,
  scriptImage,
  stageImage,
  tcosImage,
  vocalImage,
} from "./raw-images";

/**
 * Department images. Adjust the order by moving the images in the array.
 */
const departmentImages = [
  tcosImage,
  itImage,
  creativeImage,
  scriptImage,
  financeImage,
  directorImage,
  propsSetImage,
  costumeImage,
  vocalImage,
  documentImage,
  hrImage,
  danceImage,
  stageImage,
  marketingImage,
  musicSoundImage,
  lightImage,
];

export const DepartmentImages = (
  props: Omit<ImageProps, "title" | "src" | "alt">
) => {
  return (
    <>
      {departmentImages.map((departmentImage) => (
        <Image
          title={`ฝ่าย${departmentImage.title}`}
          src={departmentImage.src}
          alt={departmentImage.title}
          key={departmentImage.name}
          {...props}
        />
      ))}
    </>
  );
};
