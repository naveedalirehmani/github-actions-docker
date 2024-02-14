"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Moon, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const isActive = theme === "light";

  return (
    <div className="bg-zinc-100 dark:bg-slate-900 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        {isActive ? (
          <SunMoon className="cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="cursor-pointer" onClick={toggleTheme} />
        )}
        <div className="flex px-2 items-center">
          <Link
            className={cn(buttonVariants({ className: "dark:bg-slate-1" }))}
            href="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
