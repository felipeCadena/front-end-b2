"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useState } from "react";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";

export default function FacebookLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);

      const result = await signIn("facebook", {
        redirect: true,
      });

      if (result?.error) {
        console.error("Erro no login com Facebook:", result.error);
        toast.error("Erro ao fazer login com Facebook");
      }
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
      leftIcon={<MyIcon name="facebook" />}
      onClick={handleFacebookLogin}
      disabled={isLoading}
    >
      {isLoading ? "Entrando..." : "Logar com o Facebook"}
    </MyButton>
  );
}
