import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../database/db'
import { IProduct } from '@/Interfaces/products'
import Product from '@/models/Product'

type Data =
    | { message: string }
    | IProduct


    export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
        switch( req.method ) {
            case 'GET':
                return getProductBySlug(req, res);
    
            default:
                return res.status(400).json({
                    message: 'Bad request'
                })
        }
    
    }
    
    async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
    
        await connect();
        const { slug } = req.query;
        const product = await Product.findOne({ slug }).lean();
        await disconnect();
    
        if( !product ) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
    
        return res.json( product );
    
    
    }