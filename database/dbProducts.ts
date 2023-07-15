import Product from "@/models/Product"
import { connect, disconnect } from "./db"
import { IProduct } from "@/Interfaces/products"

// Trae los productos segun su slug

export const getProductbySlug = async (slug: string): Promise<IProduct | null> => {
    await connect()
    const product = await Product.findOne({ slug }).lean()
    await disconnect()

    if (!product) {
        return null
    }

    //  forzamos a que el objeto sea serializado como un string
    return JSON.parse(JSON.stringify(product))
}



// ------------------------------------------
// Para el getStaticPaths

interface ProductSlug {
    slug: string
}

export const getAllProductsSlugs = async (): Promise<ProductSlug[]> => {
    await connect()
    const slugs = await Product.find().select('slug -_id').lean()
    await disconnect()

    return slugs
}

// Buscar segun termino de busqueda
export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
    term = term.toString().toLowerCase()
    await connect()
    const products = await Product.find({
        $text: { $search: term }
    }).select("title images price inStock slug -_id").lean()
    await disconnect()

    return products
}

export const getAllProducts = async ():Promise<IProduct[]> => {
    await connect()
    const products = await Product.find().lean()
    await disconnect()
    return JSON.parse(JSON.stringify(products))
}