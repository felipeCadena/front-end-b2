import React from "react";

export default function Loading() {
  return (
    <section className='absolute left-0 top-0 z-40 flex h-screen w-full items-center justify-center overflow-hidden border-2 backdrop-blur-[2px]'>
      <picture>
        <img
          src='/loading.gif'
          width={200}
          height={200}
          alt='loading'
        />
      </picture>
    </section>
  );
}
