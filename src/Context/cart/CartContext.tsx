import { ICartProduct } from '@/Interfaces/cart';
import { ShippingAdress } from '@/Interfaces/order';
import { createContext } from 'react';



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
     updateAdress: (adress: ShippingAdress) => void;
     createOrder: () => Promise<void>;
}

export const CartContext = createContext({

} as ContextProps);