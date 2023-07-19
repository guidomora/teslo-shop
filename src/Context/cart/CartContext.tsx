import { ICartProduct } from '@/Interfaces/cart';
import { createContext } from 'react';


export interface ContextProps {
     cart: ICartProduct[]; // es un array porque vamos a tener una coleccion de productos
     numberOfItems: number;
     subTotal: number;
     taxRate: number;
     tax: number;
     total: number;
     addProductToCart: (product: ICartProduct) => void
     updateCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({

} as ContextProps);