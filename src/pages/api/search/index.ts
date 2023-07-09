import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // switch ("GET") {
    //     case value:
            
    //         break;
    
    //     default:
    //         break;
    // }
    res.status(400).json({ message: 'Debe especificar un query de búsqueda' })
}