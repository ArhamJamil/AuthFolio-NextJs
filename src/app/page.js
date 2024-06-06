"use client";

import { useTheme } from "next-themes";
import SignUp from "./signup/page";


export default function Home() {
  const { setTheme } = useTheme();

  return (
    <>
      <SignUp></SignUp>
    </>
  );
}
