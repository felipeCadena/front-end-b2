import React from 'react';
import AvaliacoesMobile from './mobile';
import AvaliacoesWeb from './web';

export default function Avaliações() {
  return (
    <main className="">
      <div className="md:hidden">
        <AvaliacoesMobile />
      </div>
      <div className="max-sm:hidden">
        <AvaliacoesWeb />
      </div>
    </main>
  );
}
