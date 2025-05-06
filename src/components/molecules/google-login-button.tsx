"use client";

import React, { useState } from "react";

import { signIn } from "next-auth/react";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { toast } from "react-toastify";

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      await signIn("google", {
        redirect: true,
      });
    } catch (error) {
      console.error("Erro no processo de login:", error);
      toast.error("Erro ao processar login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyButton
      className="mt-4"
      variant="outline-neutral"
      borderRadius="squared"
      size="md"
      leftIcon={<MyIcon name="google" />}
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? "Entrando..." : "Logar com o Google"}
    </MyButton>
  );
}
