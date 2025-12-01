"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (session?.user) {
      const userData = {
        email: session.user.email,
        name: session.user.name || session.user.email?.split('@')[0],
        role: session.user.email === "projetovanvava@gmail.com" ? "admin" : "client",
        isSuperUser: session.user.email === "projetovanvava@gmail.com",
        image: session.user.image,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }

    setLoading(false);
  }, [session, status]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
