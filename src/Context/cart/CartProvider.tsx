import { FC, PropsWithChildren, ReactNode, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./CartReducer";
import { ICartProduct } from "@/Interfaces/cart";

// No es lo mismo que en el CartContext, esta va a ser la interfaz del estado
export interface CartState {
   cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}


// Creamos el provider
const CartProvider:FC<PropsWithChildren> = ({children}) => {
  
    // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    return (
    <CartContext.Provider value={{
        ...state,
    }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider