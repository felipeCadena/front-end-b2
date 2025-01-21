"use client";

import React, { useState } from "react";
import MyIcon from "../atoms/my-icon";
import MyButton from "../atoms/my-button";
import MyTypography from "../atoms/my-typography";

export default function PeopleSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        className="border border-gray-300 rounded-md p-3 text-xs w-full flex gap-2 items-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <MyIcon name="pessoas" />
        <span className="text-xs">Número de pessoas</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)} // Fecha ao clicar fora do modal
        >
          <div
            className="bg-white w-full max-w-md p-4 mx-2 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
          >
            {/* Adultos */}
            <div className="flex justify-between items-center py-5">
              <div>
                <div className="flex gap-1">
                  <MyTypography variant="body-big" weight="semibold">
                    Adultos
                  </MyTypography>
                  <MyTypography
                    variant="body-big"
                    weight="regular"
                    className="line-through"
                  >
                    R$ 191,50
                  </MyTypography>
                  <MyTypography variant="body-big" weight="semibold">
                    R$ 181,50
                  </MyTypography>
                </div>
                <MyTypography variant="body-big" weight="regular" className="">
                  Idade: 13 - 99
                </MyTypography>
              </div>
              <div className="flex items-center">
                <MyIcon name="subtracao" className="" />

                <span className="mx-4">{adults}</span>
                <MyIcon name="soma" className="" />
              </div>
            </div>

            {/* Crianças */}
            <div className="flex justify-between items-center py-5">
              <div>
                <div className="flex gap-1">
                  <MyTypography variant="body-big" weight="semibold">
                    Crianças
                  </MyTypography>
                  <MyTypography
                    variant="body-big"
                    weight="regular"
                    className="line-through"
                  >
                    R$ 95,50
                  </MyTypography>
                  <MyTypography variant="body-big" weight="semibold">
                    R$ 90,00
                  </MyTypography>
                </div>
                <MyTypography variant="body-big" weight="regular" className="">
                  Idade: Idade: 4 - 10
                </MyTypography>
              </div>

              <div className="flex items-center">
                <MyIcon name="subtracaoDesativada" className="" />

                <span className="mx-4">{children}</span>
                <MyIcon name="soma" className="" />
              </div>
            </div>

            {/* Bebês */}
            <div className="flex justify-between items-center py-5">
              <div>
                <div className="flex gap-1">
                  <MyTypography variant="body-big" weight="semibold">
                    Bebês
                  </MyTypography>
                  <MyTypography
                    variant="body-big"
                    weight="regular"
                    className="line-through"
                  >
                    Grátis
                  </MyTypography>
                </div>
                <MyTypography variant="body-big" weight="regular" className="">
                  Idade: Idade: 1 - 3
                </MyTypography>
              </div>
              <div className="flex items-center">
                <MyIcon name="subtracaoDesativada" className="" />

                <span className="mx-4">{babies}</span>
                <MyIcon name="soma" className="" />
              </div>
            </div>

            {/* Botão Salvar */}
            <MyButton
              variant="default"
              size="lg"
              borderRadius="squared"
              leftIcon={<MyIcon name="save" />}
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Salvar
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
}
