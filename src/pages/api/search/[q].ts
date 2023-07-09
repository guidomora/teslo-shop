import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../database/db'
import Product from '@/models/Product'
import { IProduct } from '@/Interfaces/products'

type Data = 
| {message: string}
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case "GET":
            return searchProducts(req, res)
        default:
            return res.status(400).json({ message: 'Bad request' })    
    }
    
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let {q = ""} = req.query
    if (q.length === 0) {
        return res.status(400).json({
            message:"Debe especificar el query de busqueda"
        })
    }

    q = q.toString().toLowerCase()
    await connect()
    const products = await Product.find({
        $text:{$search:q}
    }).select("title images price inStock slug -_id").lean()
    await disconnect()

    return res.status(200).json(products)
}
