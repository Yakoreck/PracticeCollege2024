import { useMutation } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthResponse,
  UserDataLogin,
  UserDataRegister,
  login as loginFn,
  register as RegisterFn,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  login: (userData: UserDataLogin) => void;
  register: (userData: UserDataRegister) => void;
  logout: () => void;
}

interface User {
  name: string;
  id: number;
  role: "user" | "admin";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { mutate: LoginMutate } = useMutation({
    mutationFn: (data: UserDataLogin) => loginFn(data),
    onSuccess: (data: AuthResponse) => {
      setUser({ id: data.id, name: data.name, role: data.role }); 
      localStorage.setItem("user", JSON.stringify(data)); 
    },
  });

  const { mutate: RegisterMutate } = useMutation({
    mutationFn: (data: UserDataRegister) => RegisterFn(data),
    onSuccess: (data: AuthResponse) => {
      setUser({ id: data.id, name: data.name, role: data.role }); 
      localStorage.setItem("user", JSON.stringify(data)); 
    },
  });

  const login = (userData: UserDataLogin) => {
    LoginMutate(userData); 
  };

  const register = (userData: UserDataRegister) => {
    RegisterMutate(userData); 
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem("user"); 
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
