"use client"

import React, {  useEffect } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";


 const SessionProvider = ({children}:any )  => {

  return(
   <NextAuthSessionProvider>
    {children}
    </NextAuthSessionProvider>
)}

export default SessionProvider;
