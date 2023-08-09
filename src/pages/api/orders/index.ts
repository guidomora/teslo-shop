// endpoint

import { IOrder } from '@/Interfaces/order'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method) {
        case "POST":
            return createOrder(req, res)

        default: 
        return res.status(400).json({ message: 'Bad request' })

    }
    
}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {orderItems, total} = req.body as IOrder

    // Verificar que tenemos un usuario
    const session:any = await getSession({req})

    if (!session) {
        return res.status(401).json({message: "Debe estar autenticado para hacer esto"})
    }
    
    return res.status(201).json(req.body )
}
