import { createContext } from 'react';


export interface ContextProps {
     isMenuOpen:boolean;

     toggleMenu: () => void
}

export const UiContext = createContext({

} as ContextProps);