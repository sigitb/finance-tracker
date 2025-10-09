"use client"

import React from "react"
import {SessionProvider as NextAuthSessionProvider} from 'next-auth/react'
import { Session } from "next-auth"
export function SessionProvider({ children, session }:
    {
        children: React.ReactNode,
        session?: Session | null
    }
) {
    return <NextAuthSessionProvider>
        {children}
    </NextAuthSessionProvider>
}