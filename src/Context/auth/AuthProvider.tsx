import { IUser } from "@/Interfaces/user";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";
import tesloApi from "@/api/tesloApi";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

// No es lo mismo que en el NameContext, esta va a ser la interfaz del estado
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
    children?: ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


// Creamos el provider
const AuthProvider: FC<AuthState> = ({ children }) => {
    const {data, status} = useSession()
    
    


    // Como va a menejar el estado el provider
    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            console.log({user: data?.user});
            
            dispatch({type:"[Auth] - Login", payload:data?.user as IUser})
        }

    }, [status, data])
    


    // useEffect(() => {
    //     checkToken()
    // }, [])

    const checkToken = async () => {

        // En el caso de que no haya cookies no hace nada
        if(!Cookies.get("token")) {
            return
        }

        try {
            const { data } = await tesloApi.get("/user/validate-token")
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: "[Auth] - Login", payload: user })
        } catch (error) {
            Cookies.remove("token")
        }
    }



    // una promesa que retorna un boolean
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: "[Auth] - Login", payload: user })
            return true // como todo sale bien retornamos un true
        } catch (error) {
            return false // y si sale mal va a ser false
        }
    }

    // Otra forma de crear de epeficificar el dato (es mas recomendable crear una interface)
    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean, message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: "[Auth] - Login", payload: user })
            return {
                hasError: false
            }
        } catch (error) {
            // si el error es de axios
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            } return { // si no es de axios
                hasError: true,
                message: "No se pudo crear el usuario intente de nuevo"
            }
        }
    }

    const logout = () => {
        Cookies.remove("token")
        Cookies.remove("cart")
        Cookies.remove("firstName")
        Cookies.remove("lastName")
        Cookies.remove("adress")
        Cookies.remove("adress2")
        Cookies.remove("zip")
        Cookies.remove("city")
        Cookies.remove("country")
        Cookies.remove("phone")

        signOut()
        //router.reload() // hace un refresh
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider