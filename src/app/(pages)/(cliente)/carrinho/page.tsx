"use client";

import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import MyTypography from "@/components/atoms/my-typography";
import MobileActivitiesOrderSummary from "@/components/organisms/mobile-activity-order-summary";
import CartConflictCheckerWithModal from "@/components/organisms/modal-cart-conflit";
import { users } from "@/services/api/users";
import { useCart } from "@/store/useCart";
import PATHS from "@/utils/paths";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Carrinho() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const { carts } = useCart();
  const userCart = carts.find((cart) => cart.userId === userId);

  return (
    <section className="m-4 -z-10 md:hidden">
      <CartConflictCheckerWithModal cart={userCart?.cart ?? []} />

      <div className="flex gap-4 items-center">
        <MyIcon
          name="voltar-black"
          className="-ml-2"
          onClick={() => router.back()}
        />
        <MyTypography variant="subtitle1" weight="bold" className="ml-6">
          Carrinho de compras
        </MyTypography>
      </div>
      {userCart?.cart && userCart?.cart.length > 0 ? (
        <MobileActivitiesOrderSummary activities={userCart?.cart ?? []} />
      ) : (
        <div className="w-full h-[30vh] flex justify-center items-center">
          <MyTypography variant="subtitle3" weight="bold" className="my-8">
            Seu carrinho está vazio.
          </MyTypography>
        </div>
      )}
      <MyButton
        variant="outline-neutral"
        borderRadius="squared"
        size="lg"
        className="w-full font-bold text-[1rem]"
        leftIcon={<MyIcon name="add" />}
        onClick={() => router.push(PATHS.atividades)}
      >
        {userCart?.cart && userCart?.cart.length > 0
          ? "Adicionar mais atividades"
          : "Adicionar atividades"}
      </MyButton>

      {userCart?.cart && userCart?.cart.length !== 0 && (
        <MyButton
          variant="default"
          borderRadius="squared"
          size="lg"
          className="w-full mt-6"
          onClick={() => router.push(PATHS["carrinho-pagamento"])}
        >
          Finalizar Pedido
        </MyButton>
      )}
    </section>
  );
}
