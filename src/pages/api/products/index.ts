import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../database/db';
import { IProduct } from '@/Interfaces/products';
import Product from '@/models/Product';
import { SHOP_CONSTANTS } from '../../../../database/constants';

type Data = 
| { message: string }
| IProduct[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getProducts(req, res)

        default:
            return res.status(400).json({
                message: "Bad request"
            })
    }


}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // la query por defecto va a sr all (trae todos los productos)
    const {gender = "all" } = req.query
    let condition = {}

    // si la query es diferente de all y es uno de los vlidateGenders
    if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = {gender}
    }

    await connect()
    const products = await Product.find(condition)
                                // el menos indica que no traiga eso -_id 
                                .select("title images inStock price slug -_id")
                                .lean()
    await disconnect()
    return res.status(200).json(products)
}
