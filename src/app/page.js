"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import SignUp from "./signup/page";
import { Toaster } from "./components/ui/toaster";


export default function Home() {
  const { setTheme } = useTheme();

  return (
    <>

      {/* <Login /> */}
      <SignUp></SignUp>
    </>
  );
}
