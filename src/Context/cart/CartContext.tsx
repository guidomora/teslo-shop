import { ICartProduct } from '@/Interfaces/cart';
import { createContext } from 'react';


export interface ContextProps {
     cart:ICartProduct[]; // es un array porque vamos a tener una coleccion de productos
}

export const CartContext = createContext({

} as ContextProps);