import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../../database/db'
import User from '@/models/Users'
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';

type Data =
    | { message: string }
    | {
        token: string
        user: {
            email: string
            name: string
            role: string
        }
    }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "POST":
            return loginUser(req, res)


        default:
            res.status(400).json({ message: 'Bad request' })

    }

}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = "", password = "" } = req.body

    await connect();
    const user = await User.findOne({ email })
    await disconnect();

    if (!user) {
        return res.status(400).json({ message: "Correo o constraseña no validos - EMAIL" })
    }

    // compara la password que esta siendo ingresada con la de user.password (el ! al final de este es para decir que no es undefined)
    if (!bcrypt.compareSync(password, user.password!)) { // si no son comparables va a ser un bad request
        return res.status(400).json({ message: "Correo o constraseña no validos - PASSWORD" })
    }

    const { role, name, _id } = user
    const token = signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email, role, name
        }
    })
}
