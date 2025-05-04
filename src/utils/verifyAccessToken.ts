'use client';

import { signOut } from 'next-auth/react';

export const verifyAccessToken = (tokenExpiration: number) => {
  const today = new Date().getTime();

  if (!tokenExpiration) {
    console.log({ message: 'Token inválido ou inexistente' });
    return false;
  }

  if (today > tokenExpiration) {
    console.log({ message: 'Token expirado' });
    return false;
  }

  console.log({ message: 'Token válido' });
  return true;
};
