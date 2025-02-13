"use client";

import { ReactNode } from "react";

const Layout = ({ children }: { children: JSX.Element | ReactNode }) => {
  return (
    <section className="h-screen md:grid md:grid-cols-[2fr_1fr] md:bg-primary-900">
      <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-auto min-h-screen overflow-hidden">
        {[
          {
            src: "/images/atividades/ar/ar-1.jpeg",
            span: "row-span-3",
            padding: "py-2 pr-2",
          },
          { src: "/images/atividades/terra/terra-1.jpeg", span: "row-span-2" },
          {
            src: "/images/atividades/mar/mar-1.jpeg",
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
