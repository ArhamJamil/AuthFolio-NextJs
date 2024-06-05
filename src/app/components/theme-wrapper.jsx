"use client";

import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Toaster } from "./ui/toaster";

const ThemeWrapper = ({ children }) => {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Toaster />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only text-xl text-white">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("darkgreen")}>
              Dark: Green
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("darkblue")}>
              Dark: Blue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("rose")}>
              Rose
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>{children}</div>
    </>
  );
};

export default ThemeWrapper;
