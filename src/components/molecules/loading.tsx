import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <section className="absolute left-0 top-0 z-40 flex h-screen w-full items-center justify-center overflow-hidden border-2 backdrop-blur-[2px]">
      <Image
        src="/logo.png"
        alt="B2 Adventure Logo"
        width={250}
        height={250}
        className="object-contain animate-pulse"
      />
    </section>
  );
}
