import { FC, PropsWithChildren, ReactNode, useEffect, useReducer, useState } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";
import { ICartProduct } from "@/Interfaces/cart";
import Cookie from "js-cookie"

// No es lo mismo que en el CartContext, esta va a ser la interfaz del estado
export interface CartState {
  cart: ICartProduct[],
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: 0,
  tax: 0,
  total: 0
}


// Creamos el provider
const CartProvider: FC<PropsWithChildren> = ({ children }) => {

  // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)


  // Asi era originalmente pero para que funcione asi hay que desactivar el strict mode
  // useEffect(() => {
  //   // primero hay que preguntar si existe el "!" es para decir que ya hicimos la evaluacion
  //   const cartFromCookies = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : []
  //   dispatch({type:"[Cart] - LoadCart from cookies | storage", payload:cartFromCookies})
  // }, [])


  // useEffect(() => {
  //   Cookie.set("cart", JSON.stringify(state.cart)) // grabacion del carrito en las cookies
  // }, [state.cart])


  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    // Por si el usuario manipula la cookie, entonces como no se va a poder leer
    // en el catch genera un array vacio
    try {
      if (!isMounted) {
        // primero hay que preguntar si existe el "!" es para decir que ya hicimos la evaluacion
        const cart = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : []
        dispatch({
          type: "[Cart] - LoadCart from cookies | storage",
          payload: cart,
        });
        setIsMounted(true);
      }
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }


  }, [isMounted]);


  useEffect(() => {
    if (isMounted) Cookie.set("cart", JSON.stringify(state.cart)); // grabacion del carrito en las cookies
  }, [state.cart, isMounted]);


  useEffect(() => {
    // reduce suma por iteraciones, el valor inicial es 0
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const orderSummary = {
      numberOfItems,
      subTotal,
      taxRate,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }
    dispatch({type:"[Cart] - Update order summary", payload:orderSummary})

  }, [state.cart])




  const addProductToCart = (product: ICartProduct) => {
    // si el id del producto existe devuelve un true
    const productInCart = state.cart.some(p => p._id === product._id)
    // si no existe, se agrega al carrito
    if (!productInCart) return dispatch({ type: "[Cart] - Update products in cart", payload: [...state.cart, product] })

    // si el id y el size son iguales devuelve true
    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
    if (!productInCartButDifferentSize) return dispatch({ type: "[Cart] - Update products in cart", payload: [...state.cart, product] })

    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p; // si el id no es igual no hacemos nada
      if (p.size !== product.size) return p;  // si el size no es igual no hacemos nada

      p.quantity += product.quantity // Actualizamos la cantidad
      return p
    })
    // en el payload mandamos directo el uppdatedProductos
    dispatch({ type: "[Cart] - Update products in cart", payload: updatedProducts })
  }


  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Change product quantity", payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Remove product in cart", payload: product })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider