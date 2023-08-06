import User from "@/models/Users"
import { connect, disconnect } from "./db"
import bcrypt from 'bcryptjs';

// Validar usuarios para ver si hacen match con nuestra db


export const checkUserEmailPassword = async(email:string, password:string) => {
    await connect()
    const user = await User.findOne({email})
    await disconnect()

    if (!user) {
        return null // es null pq si retornamos un objeto va a funcionar de todos modos
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null
    }

    const {role, name, _id} = user

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name
    }
}