"use client";
import * as React from "react";
import {
  IoImageOutline,
  IoColorPaletteOutline,
  IoText,
  IoWalletOutline,
} from "react-icons/io5";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import bg from "../../public/bg.png"
import { MerriweatherFont } from "./create/edit/font";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center mx-auto w-full bg-white max-w-[1200px] my-4 select-none">
        {" "}
        {/* Updated max-width for desktop */}
        <div className="flex flex-col items-center px-5 w-full bg-white">
          <div className="flex overflow-hidden relative flex-col justify-end pt-4 pl-4 text-base font-bold text-white rounded-xl max-w-[928px] min-h-[480px]">
            <Image
              alt="new"
              src={bg}
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col justify-end pt-20 pr-20 pb-6 pl-10 max-md:px-5 max-md:max-w-full">
              <div className="mt-40 text-5xl tracking-tighter max-md:mt-10 max-md:mr-1 max-md:max-w-full max-md:text-4xl">
                Turn your words into art
              </div>
              <div className={"mt-2 leading-[150%] max-md:mr-1 max-md:max-w-full"+" "+MerriweatherFont.className}>
                Create beautiful visual poetry from your own words or from the
                works of others. Add text to images, convert text to images, or
                create your own image from scratch with our free image
                generator.
              </div>
              <div className="flex flex-col justify-center px-5 py-3 mt-14 tracking-wide whitespace-nowrap bg-indigo-700 rounded-3xl leading-[150%] w-[155px] max-md:mt-10">
                <div className="justify-center bg-indigo-700 pointer">
                  <Link href="/create">Start Creating</Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-3 mt-20">
              <div className="flex flex-col flex-1 px-4 pt-4 pb-20 bg-white rounded-lg border border-solid border-zinc-200">
                <IoImageOutline className="w-6 aspect-square h-6" />
                <div className="mt-3 text-base font-bold text-neutral-900">
                  Vast variety of images
                </div>
                <div className="mt-6 text-sm leading-5 text-gray-500">
                  Over 80,000 images to choose from
                </div>
              </div>
              <div className="flex flex-col flex-1 px-4 pt-4 pb-20 bg-white rounded-lg border border-solid border-zinc-200">
                <IoColorPaletteOutline className="w-6 aspect-square h-6" />
                <div className="mt-3 text-base font-bold text-neutral-900">
                  Customize with colors
                </div>
                <div className="mt-6 text-sm leading-5 text-gray-500">
                  Change the background color, text color, and more
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-5 ">
              <div className="flex-none md:flex-1 px-4 pt-4 pb-20 bg-white rounded-lg border border-solid border-zinc-200">
                <IoText className="w-6 aspect-square h-6" />
                <div className="mt-3 text-base font-bold text-neutral-900">
                  Choose text styles
                </div>
                <div className="mt-6 text-sm leading-5 text-gray-500">
                  Select from various font styles
                </div>
              </div>
              <div className="flex-none md:flex-1 px-4 pt-4 pb-20 bg-white rounded-lg border border-solid border-zinc-200">
                <IoWalletOutline className="w-6 aspect-square h-6" />
                <div className="mt-3 text-base font-bold text-neutral-900">
                  All free
                </div>
                <div className="mt-1 text-sm leading-5 text-gray-500">
                  All features are available for free
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center px-16 py-3 mt-14 text-base font-bold tracking-wide leading-6 text-white whitespace-nowrap bg-indigo-700 rounded-3xl">
            <div className="justify-center bg-indigo-700">
              <Link href="/create">Get started</Link>
            </div>
          </div>

          <div className="mt-14 text-base leading-6 text-center text-gray-500 whitespace-nowrap">
            © 2022 Poetique. All rights reserved.
          </div>

          <div className="self-stretch mt-10 w-full bg-white min-h-[20px]" />
        </div>
      </div>
    </>
  );
}
