import { signIn } from "next-auth/react";

export const handleGoogleLogin = () => {
  signIn('google',{callbackUrl:'/'})
};
