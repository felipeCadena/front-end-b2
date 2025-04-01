import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
      role?: string;
      defaultPath?: string;
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    defaultPath?: string;
  }
}
