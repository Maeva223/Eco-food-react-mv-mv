import { createContext, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
