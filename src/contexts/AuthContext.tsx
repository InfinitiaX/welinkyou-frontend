import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import api from "@/services/api";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "super_admin" | "practitioner" | "client";
  is_profile_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      if (api.isAuthenticated()) {
        const userData = await api.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch {
      // Token invalide ou expiré
      api.logout();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUser();
      setIsLoading(false);
    };
    initAuth();
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<User> => {
    await api.login(email, password);
    const userData = await api.getCurrentUser();
    setUser(userData);
    return userData;
  };

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Retourne l'URL du dashboard en fonction du rôle de l'utilisateur
 */
export function getDashboardUrl(role: User["role"]): string {
  switch (role) {
    case "super_admin":
      return "/dashboard/superadmin";
    case "practitioner":
      return "/professionnel-espace/dashboard";
    default:
      return "/";
  }
}
