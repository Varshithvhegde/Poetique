"use client";
// Import necessary React and Tailwind CSS modules
// Import necessary React and Tailwind CSS modules

import * as React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex gap-0 justify-between px-10 py-3.5 whitespace-nowrap border-b border-solid border-b-gray-200 max-md:flex-wrap max-md:px-5">
      <div className="flex gap-4 my-auto text-lg font-bold tracking-tight text-slate-950">
      {/* <div className="flex gap-4 my-auto text-lg font-bold tracking-tight text-slate-50"> */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ad416733944792f0901ab1b650ab432d3a81612a6cdcce5237a802d944c7145?"
          className="my-auto w-4 aspect-square"
          alt="Poetify"
        />
        <div>Poetify</div>
      </div>
      <div className="flex gap-5 justify-between py-2.5 font-medium text-slate-950">
        <Link href="/" passHref legacyBehavior>
          <a className="hover:text-blue-500 transition duration-300">Home</a>
        </Link>
        <Link href="/create" passHref legacyBehavior>
          <a className="hover:text-blue-500 transition duration-300">Create</a>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
