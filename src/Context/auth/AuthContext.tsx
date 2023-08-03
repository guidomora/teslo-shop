import { IUser } from "@/Interfaces/user";
import { createContext } from 'react';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string | undefined; }>
}

export const AuthContext = createContext({} as ContextProps);