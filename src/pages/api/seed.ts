
import Product from '@/models/Product'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../database/db'
import { initialData } from '../../../database/products'

type Data = {
    message:string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    // Si el proceso env de node esta en produccion no se va a ejecutar
    if (process.env.NODE_ENV === "production") {
        // 401 significa unauthorized
        return res.status(401).json({message: "No tiene acceso a este servicio"})
    }
    await connect()
    // En este punto podemos hacer cualquier interaccion con la db
    await Product.deleteMany()
    // insertamos las entries que habiamos puesto en el archivo seeddata
    await Product.insertMany(initialData.products)
    await disconnect()
    
    res.status(200).json({ message: 'Proceso realizado correctamente' })
}