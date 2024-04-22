"use client "

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { useEffect } from "react";

const SessionProvider = ({children}:any )  => {
useEffect(() => {
   const isClient = typeof window !== "undefined";
    if(!isClient) return;

}, [])

  return(
   <NextAuthSessionProvider>
    {children}
    </NextAuthSessionProvider>
)}

export default SessionProvider;
