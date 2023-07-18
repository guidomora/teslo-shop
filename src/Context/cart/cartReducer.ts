import { ICartProduct } from "@/Interfaces/cart";
import { CartState } from "./CartProvider";

type CartActionType =
    | { type: "[Cart] - LoadCart from cookies | storage", payload: ICartProduct[] }
    | { type: "[Cart] - Update products in cart", payload: ICartProduct[] }
    | { type: "[Cart] - Change product quantity", payload: ICartProduct }
    | { type: "[Cart] - Remove product in cart", payload: ICartProduct }

// Recibe un estado/accion y produce un nuevo estado
export const cartReducer = (state: CartState, action: CartActionType): CartState => {
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
        case "[Cart] - Change product quantity":
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                })
            }
        case "[Cart] - Remove product in cart":
            return {
                ...state,
                cart: state.cart.filter(product => {
                    // si el id y el size son iguales retornamos false pq esos no los queremos borrar
                    // por eso el caso contrario retornamos true
                    if (product._id === action.payload._id && product.size === action.payload.size) {
                        return false
                    }
                    return true
                })
            }

        default:
            return state;
    }
}