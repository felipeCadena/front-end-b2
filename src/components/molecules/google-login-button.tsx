"use client";

import { signIn } from "next-auth/react";
import MyButton from "@/components/atoms/my-button";
import MyIcon from "@/components/atoms/my-icon";
import { toast } from "react-toastify";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Erro no login com Google:", error);
      toast.error("Erro ao fazer login com Google");
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
    >
      Logar com o Google
    </MyButton>
  );
}
