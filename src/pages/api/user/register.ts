import { connect, disconnect } from '../../../../database/db'
import User from '@/models/Users'
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { isValidEmail } from '@/utils/validations';

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
            return registerUser(req, res)


        default:
            res.status(400).json({ message: 'Bad request' })

    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = "", password = "", name = "" } = req.body as { email: string, password: string, name: string }

    if (password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe de ser de 6 caracteres o mas" })
    }

    if (name.length < 2) {
        return res.status(400).json({ message: "El nombre debe de ser de 2 caracteres o mas" })
    }

    if (!isValidEmail(email)) { //isValidEmail es de validations
        return res.status(400).json({ message: "El correo no es valido" })
    }

    await connect();
    const user = await User.findOne({ email })

    if (user) {
        await disconnect();
        return res.status(400).json({ message: "No puede usar ese correo" })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: "client",
        name,
    })

    try {
        await newUser.save({ validateBeforeSave: true }) // si todo sale bien, se crea el usuario exitosamente
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Revisar los logs del servidor" })
    }

    const { _id, role } = newUser
    const token = signToken(_id, email)

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name
        }
    })
}
