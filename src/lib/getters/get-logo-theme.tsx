"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export function Logo() {
  const { theme } = useTheme();
  const logo = theme === "light" ? "/finity-black.svg" : "/finity-white.svg";

  return (
    <>
      <Image src={logo} alt="Logo" width={130} height={100} />
    </>
  );
}
