import { FC, ReactNode, useReducer } from "react";
import { UiContext } from "./UiContext";
import { uiReducer } from "./UiReducer";

// No es lo mismo que en el UiContext, esta va a ser la interfaz del estado
export interface UiState {
    isMenuOpen: boolean;
    children?:ReactNode
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false
}


// Creamos el provider
const UiProvider:FC<UiState> = ({children}) => {
  
    // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toggleMenu = ()=> {
    dispatch({type: "[UI] - ToggleMenu"})
  }

    return (
    <UiContext.Provider value={{
        ...state,

        toggleMenu,
    }}>
        {children}
    </UiContext.Provider>
  )
}

export default UiProvider