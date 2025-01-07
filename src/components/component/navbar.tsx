"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Fecha o menu ao clicar em um link
  };

  return (
    <header className=" flex  h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 bord bg-gray-900 text-white shadow-lg z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden bord">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only bord">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bord">
          <Link href="/" className="mr-6  hidden lg:flex bord" prefetch={false}>
            LH's Movies
            <span className="sr-only">Leandro´s Logo</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/now-playing"
              className="flex w-full items-center py-2 mt-6 text-lg font-semibold bord"
              prefetch={false}
              onClick={handleLinkClick} // Fecha o menu ao clicar
            >
              Now Playing
            </Link>
            <Link
              href="/popular"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={handleLinkClick} // Fecha o menu ao clicar
            >
              Popular
            </Link>
            <Link
              href="/top-rated"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={handleLinkClick} // Fecha o menu ao clicar
            >
              Top Rated
            </Link>
            <Link
              href="/upcoming"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
              onClick={handleLinkClick} // Fecha o menu ao clicar
            >
              Upcoming
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 bord" prefetch={false}>
        LH's Movies
        <span className="sr-only">Leandro´s Logo</span>
      </Link>
      <nav className="mx-auto hidden lg:flex gap-6 bord ">
        <Link
          href="/now-playing"
          className="group inline-flex h-9 w-max items-center justify-center  px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Now Playing
        </Link>
        <Link
          href="/popular"
         className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Popular
        </Link>
        <Link
          href="top-rated"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Top Rated
        </Link>
        <Link
          href="upcoming"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Upcoming
        </Link>
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
