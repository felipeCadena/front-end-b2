"use client";

import Image from "next/image";
import { ReactNode } from "react";

const images = [
  {
    src: "/images/atividades/terra/terra-7.jpeg",
    span: "row-span-3",
    padding: "py-2 pr-2",
  },
  { src: "/images/atividades/terra/terra-1.jpeg", span: "row-span-2" },
  {
    src: "/images/atividades/mar/mar-92.jpeg",
    span: "row-span-3",
    padding: "p-2",
  },
  { src: "/images/atividades/ar/ar-2.jpeg", span: "row-span-2" },
  { src: "/images/atividades/mar/mar-2.jpeg", span: "row-span-2" },
  { src: "/images/atividades/terra/terra-3.jpeg", span: "row-span-3" },
  { src: "/images/atividades/terra/terra-4.jpeg", span: "row-span-3" },
  { src: "/images/atividades/ar/ar-3.jpeg", span: "row-span-3" },
  { src: "/images/atividades/mar/mar-4.jpeg", span: "row-span-3" },
  { src: "/images/atividades/ar/ar-4.jpeg", span: "row-span-2" },
  { src: "/images/atividades/terra/terra-6.jpeg", span: "row-span-4" },
  { src: "/images/atividades/mar/mar-5.jpeg", span: "row-span-3" },
  { src: "/images/atividades/terra/terra-5.jpeg", span: "row-span-3" },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="md:grid md:grid-cols-[2fr_1fr] h-screen">
      {/* Grid de imagens apenas em telas md+ */}
      <div className="hidden md:grid grid-cols-3 gap-2 h-screen auto-rows-fr overflow-hidden bg-primary-900">
        {images.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.span} ${item.padding ?? ""}`}
          >
            <Image
              src={item.src ?? "/images/atividades/terra/terra-5.jpeg"}
              alt={`Imagem ${index}`}
              fill
              quality={90}
              sizes="(min-width: 768px) 33vw"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Conteúdo da página (formulários, etc.) */}
      <div className="flex items-center justify-center bg-white px-4 sm:px-8">
        {children}
      </div>
    </section>
  );
};

export default Layout;
