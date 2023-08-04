import { ICartProduct } from "@/Interfaces/cart";
import { CartState, ShippingAdress } from "./CartProvider";

type CartActionType =
    | { type: "[Cart] - LoadCart from cookies | storage", payload: ICartProduct[] }
    | { type: "[Cart] - Update products in cart", payload: ICartProduct[] }
    | { type: "[Cart] - Change product quantity", payload: ICartProduct }
    | { type: "[Cart] - Remove product in cart", payload: ICartProduct }
    | { type: "[Cart] - Load adress from cookies", payload: ShippingAdress }
    | { type: "[Cart] - Update adress", payload: ShippingAdress }
    | {
        type: "[Cart] - Update order summary", payload: {
            numberOfItems: number;
            subTotal: number;
            taxRate: number;
            tax: number;
            total: number;
        }
    }

// Recibe un estado/accion y produce un nuevo estado
export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case "[Cart] - LoadCart from cookies | storage":
            return {
                ...state,
                isLoaded: true,
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
        case "[Cart] - Update order summary":
        return {
            ...state,
            ...action.payload
        }
        case "[Cart] - Update adress": // hacen lo mismo pero se registra separado
        case "[Cart] - Load adress from cookies":
            return {
                ...state,
                shippingAdress: action.payload
            }

        default:
            return state;
    }
}