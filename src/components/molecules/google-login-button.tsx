'use client';

import React, { useState, useEffect } from 'react';

import { getSession, signIn, useSession } from 'next-auth/react';
import MyButton from '@/components/atoms/my-button';
import MyIcon from '@/components/atoms/my-icon';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { DEFAULT_ROLE_PATHS } from '@/utils/paths';

export default function GoogleLoginButton() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { data: session, status } = useSession();

  // Observa mudanças na sessão após o login
  useEffect(() => {
    if (isAuthenticating && status === 'authenticated' && session?.user) {
      try {
        // Atualiza o store com os dados do usuário
        const userData = {
          id: session.user.id,
          name: session.user.name ?? '',
          email: session.user.email ?? '',
          role: session?.user.role?.toLowerCase() ?? '',
        };

        setUser({
          id: session.user.id!, // Garante que id não é undefined
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });

        // Define a rota com base na role
        const userRole = session.user.role?.toLowerCase() ?? '';
        const roleMapping = {
          superadmin: 'admin',
          admin: 'admin',
          partner: 'partner',
          customer: 'customer',
        };

        const mappedRole = roleMapping[userRole as keyof typeof roleMapping];
        const defaultPath =
          DEFAULT_ROLE_PATHS[mappedRole as keyof typeof DEFAULT_ROLE_PATHS];

        if (defaultPath) {
          router.push(defaultPath);
          toast.success('Login realizado com sucesso!');
        }

        setIsAuthenticating(false);
      } catch (error) {
        console.error('Erro ao processar dados da sessão:', error);
        toast.error('Erro ao processar login');
        setIsAuthenticating(false);
      }
    }
  }, [session, status, isAuthenticating]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setIsAuthenticating(true);

      await signIn('google', {
        redirect: false,
      });
    } catch (error) {
      console.error('Erro no processo de login:', error);
      toast.error('Erro ao processar login');
      setIsAuthenticating(false);
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
      {isLoading ? 'Entrando...' : 'Logar com o Google'}
    </MyButton>
  );
}
