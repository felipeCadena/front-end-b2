import MyButton from "@/components/atoms/my-button";
import MyTypography from "@/components/atoms/my-typography";
import Image from "next/image";
import React from "react";

export default function FirstSection() {
  return (
    <section className="mt-10">
      <Image
        src="/images/image-lp.png"
        alt="image-lp"
        width={400}
        height={400}
      />
      <div className="mt-4 px-4">
        <MyTypography variant="heading2" weight="bold" className="">
          Qual será sua próxima aventura?
        </MyTypography>
        <MyButton variant="default" size="md" borderRadius="squared" className="mt-4">
          Descobrir agora
        </MyButton>
      </div>
    </section>
  );
}
