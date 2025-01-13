"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Hook para obter o caminho atual

  const handleLinkClick = () => {
    setIsOpen(false); // Fecha o menu ao clicar em um link
  };

  const getLinkClass = (href:string) => {
    return pathname === href
      ? "text-blue-500 font-bold border-b-2 border-blue-500"
      : "text-black md:text-white ";
  };

  return (
    <header className="flex  h-20 w-full shrink-0 items-center justify-between px-4  md:px-8 bord bg-gray-900 text-white shadow-lg z-1000 fixed top-0">
      {/* Menu Hambúrguer apenas em telas menores */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bord" // Esconde em telas grandes
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only bord">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="bord">
          <div className="grid gap-2 ">
            <Link
              href="/"
              className={`flex w-full items-center py-2 text-lg font-semibold ${getLinkClass(
                "/"
              )}`}
              prefetch={false}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/now-playing"
              className={`flex w-full items-center py-2 text-lg font-semibold ${getLinkClass(
                "/now-playing"
              )}`}
              prefetch={false}
              onClick={handleLinkClick}
            >
              Now Playing
            </Link>
            <Link
              href="/popular"
              className={`flex w-full items-center py-2 text-lg font-semibold ${getLinkClass(
                "/popular"
              )}`}
              prefetch={false}
              onClick={handleLinkClick}
            >
              Popular
            </Link>
            <Link
              href="/top-rated"
              className={`flex w-full items-center py-2 text-lg font-semibold ${getLinkClass(
                "/top-rated"
              )}`}
              prefetch={false}
              onClick={handleLinkClick}
            >
              Top Rated
            </Link>
            <Link
              href="/upcoming"
              className={`flex w-full items-center py-2 text-lg font-semibold ${getLinkClass(
                "/upcoming"
              )}`}
              prefetch={false}
              onClick={handleLinkClick}
            >
              Upcoming
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="mr-6 bord" prefetch={false}>
        <p className="italic lg:text-2xl md:hover:text-gray-300  playwrite-au-sa-">LH Movies</p>
        <span className="sr-only">Leandro´s Logo</span>
      </Link>
      {/* Menu Tradicional apenas em telas grandes */}
      <nav className="hidden md:flex gap-6 bord mx-auto">
        <Link
          href="/now-playing"
          className={`group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-gray-300 ${getLinkClass(
            "/now-playing"
          )}`}
          prefetch={false}
        >
          Now Playing
        </Link>
        <Link
          href="/popular"
          className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-gray-300 ${getLinkClass(
            "/popular"
          )}`}
          prefetch={false}
        >
          Popular
        </Link>
        <Link
          href="/top-rated"
          className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-gray-300  ${getLinkClass(
            "/top-rated"
          )}`}
          prefetch={false}
        >
          Top Rated
        </Link>
        <Link
          href="/upcoming"
          className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-gray-300 ${getLinkClass(
            "/upcoming"
          )}`}
          prefetch={false}
        >
          Upcoming
        </Link>
      </nav>
    </header>
  );
}

function MenuIcon(props:any) {
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
