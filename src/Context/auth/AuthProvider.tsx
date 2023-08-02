import { IUser } from "@/Interfaces/user";
import { FC, ReactNode, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";

// No es lo mismo que en el NameContext, esta va a ser la interfaz del estado
export interface AuthState {
    isLoggedIn: boolean;
    user?:IUser
    children?: ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user:undefined
}


// Creamos el provider
const AuthProvider:FC<AuthState> = ({children}) => {
  
    // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)

  

    return (
    <AuthContext.Provider value={{
        ...state,
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider