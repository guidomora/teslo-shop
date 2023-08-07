import User from "@/models/Users"
import { connect, disconnect } from "./db"
import bcrypt from 'bcryptjs';

// Validar usuarios para ver si hacen match con nuestra db


export const checkUserEmailPassword = async (email: string, password: string) => {
    await connect()
    const user = await User.findOne({ email })
    await disconnect()

    if (!user) {
        return null // es null pq si retornamos un objeto va a funcionar de todos modos
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null
    }

    const { role, name, _id } = user

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name
    }
}

// crea o verifica el usuario de oauth
export const oAUthToDbUser = async( oAuthEmail: string, oAuthName: string ) => {

    await connect();
    const user = await User.findOne({ email: oAuthEmail });

    if ( user ) {
        await disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }

    // si el usuario no existe creamos uno
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client'  });
    await newUser.save();
    await disconnect();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };
}