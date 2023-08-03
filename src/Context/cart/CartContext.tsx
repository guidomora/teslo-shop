import { ICartProduct } from '@/Interfaces/cart';
import { createContext } from 'react';
import { ShippingAdress } from './CartProvider';


export interface ContextProps {
     isLoaded: boolean;
     cart: ICartProduct[]; // es un array porque vamos a tener una coleccion de productos
     numberOfItems: number;
     subTotal: number;
     taxRate: number;
     tax: number;
     total: number;
     shippingAdress?: ShippingAdress
     addProductToCart: (product: ICartProduct) => void
     updateCartQuantity: (product: ICartProduct) => void;
     removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({

} as ContextProps);