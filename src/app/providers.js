"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";
import RegistrationForm from "@/components/RegistrationForm";

export function Providers({ children }) {
    return (
        <SessionProvider>
            <AuthProvider>
                <StoreProvider>
                    {children}
                    <RegistrationForm />
                </StoreProvider>
            </AuthProvider>
        </SessionProvider>
    );
}
