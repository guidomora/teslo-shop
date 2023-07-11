import { IProduct } from '@/Interfaces/products';
import useSWR, { SWRConfiguration } from 'swr';




// const fetcher = (...args:[key:string]) => fetch(...args).then((res) => res.json())



export const useProducts = (url:string, config:SWRConfiguration = {}) => {
    
    // especificamos que la info de retorno es un array de IProduct
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher, config)


    return {
        products: data || [], // si no tenemos nada en los productos va a ser un array vacio
        isLoading: !error && !data, //si no hay data y no hay error va a estar en isLoading
        isError: error
    }
}