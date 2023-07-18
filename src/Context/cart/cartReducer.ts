import { ICartProduct } from "@/Interfaces/cart";
import { CartState } from "./CartProvider"; 

type CartActionType = 
| {type: "[Cart] - LoadCart from cookies | storage", payload: ICartProduct[] }
| {type: "[Cart] - Update products in cart", payload: ICartProduct[] }

// Recibe un estado/accion y produce un nuevo estado
export const cartReducer = (state: CartState, action:CartActionType): CartState => {
    switch (action.type) {
        case "[Cart] - LoadCart from cookies | storage":
            return {
                ...state,
                cart: action.payload
            }
        case "[Cart] - Update products in cart":
            return {
               ...state,
               cart: [...action.payload] 
            }
    
        default:
            return state;
    }
}