"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { AlignJustify, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const menuLinks = [
  {
    label: "Főoldal",
    href: "/",
  },
  {
    label: "Versenyek",
    href: "/versenyek",
  },
];

export default function Header() {
  const mobilenavbarVariant = {
    initial: {
      opacity: 0,
      scale: 1,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const mobileLinkVar = {
    initial: {
      y: "-20px",
      opacity: 0,
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-4 z-50 mx-auto w-[calc(100%-16px)] max-w-7xl rounded-xl border backdrop-blur-md transition-all duration-700 ease-in-out sm:w-[calc(100%-32px)] md:w-[calc(100%-64px)]",
          "animate-fade-in -translate-y-4 opacity-[0.01]",
        )}
      >
        <div className="container flex h-14 w-full !max-w-screen-lg items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="text-md flex items-center gap-3">
              <Logo size="small" iconBg="black" />
            </Link>

            <div className="ml-4 hidden gap-0 text-slate-600 md:flex">
              {menuLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 font-medium hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto hidden h-full items-center gap-2 sm:flex">
            <Button>Bejelentkezés</Button>
          </div>

          <button
            className="ml-6 md:hidden"
            onClick={() => setHamburgerMenuIsOpen((open: boolean) => !open)}
          >
            <span className="sr-only">Menü kinyitása</span>
            {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        <motion.nav
          initial="initial"
          exit="exit"
          variants={mobilenavbarVariant}
          animate={hamburgerMenuIsOpen ? "animate" : "exit"}
          className={cn(
            `fixed left-0 top-0 z-50 h-screen w-screen overflow-auto bg-background/70 backdrop-blur-md`,
            {
              "pointer-events-none": !hamburgerMenuIsOpen,
            },
            "flex flex-col justify-between",
          )}
        >
          <div>
            <div className="container flex h-14 items-center justify-between">
              <Link href="/" className="text-md flex items-center gap-3">
                <Logo size="small" iconBg="black" />
              </Link>

              <button
                className="ml-6 md:hidden"
                onClick={() => setHamburgerMenuIsOpen((open: boolean) => !open)}
              >
                <span className="sr-only">Menü bezárása</span>
                {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
              </button>
            </div>
            <motion.ul
              className="flex flex-col uppercase ease-in md:flex-row md:items-center md:normal-case"
              variants={containerVariants}
              initial="initial"
              animate={hamburgerMenuIsOpen ? "open" : "exit"}
            >
              {menuLinks.map((item) => (
                <motion.li
                  key={item.label}
                  variants={mobileLinkVar}
                  className="border-grey-dark w-full border-b py-0.5 md:border-none"
                >
                  <Link
                    className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center justify-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${
                      hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}

              <motion.div
                className={cn(
                  "mt-12 flex -translate-y-10 items-end justify-end gap-2 px-4 opacity-[0.01] transition-all delay-200 duration-300 sm:hidden",
                  hamburgerMenuIsOpen ? "translate-y-0 opacity-100" : "",
                )}
              >
                <Button>Bejelentkezés</Button>
              </motion.div>
            </motion.ul>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
