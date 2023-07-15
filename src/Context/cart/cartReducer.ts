import { ICartProduct } from "@/Interfaces/cart";
import { CartState } from "./CartProvider"; 

type CartActionType = 
| {type: "[Cart] - LoadCart from cookies | storage", payload: ICartProduct[] }
| {type: "[Cart] - Add Product", payload: ICartProduct }

// Recibe un estado/accion y produce un nuevo estado
export const cartReducer = (state: CartState, action:CartActionType): CartState => {
    switch (action.type) {
        case "[Cart] - LoadCart from cookies | storage":
            return {
                ...state,
            }
    
        default:
            return state;
    }
}