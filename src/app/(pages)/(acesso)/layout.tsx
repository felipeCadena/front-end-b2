"use client";

import { ReactNode } from "react";

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  return (
    <section className="h-screen md:grid md:grid-cols-[2fr_1fr] md:bg-primary-900">
      <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-[150px] min-h-screen overflow-hidden">
        {[
          {
            src: "/images/atividades/montanha.webp",
            span: "row-span-3",
            padding: "py-2 pr-2",
          },
          { src: "/images/carrosel/carrosel-1.jpeg", span: "row-span-2" },
          {
            src: "/images/carrosel/carrosel-2.jpeg",
            span: "row-span-1",
            padding: "p-2",
          },
          { src: "/images/atividades/paraquedas.webp", span: "row-span-2" },
          { src: "/images/atividades/mergulho.webp", span: "row-span-2" },
          { src: "/images/atividades/moto.webp", span: "row-span-2" },
          { src: "/images/atividades/parapente.webp", span: "row-span-1" },
          { src: "/images/atividades/canoagem.webp", span: "row-span-2" },
          { src: "/images/carrosel/carrosel-1.jpeg", span: "row-span-2" },
          { src: "/images/carrosel/carrosel-2.jpeg", span: "row-span-1" },
          { src: "/images/atividades/mergulho.webp", span: "row-span-1" },
        ].map((item, index) => (
          <div
            key={index}
            className={`overflow-hidden ${item.span} ${item.padding}`}
          >
            <img
              src={item.src}
              alt={`Image ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {children}
    </section>
  );
};

export default Layout;
