
import jwt from "jsonwebtoken"



// Funcion para generar tokens

export const signToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) { //verificacion de existencia de la semmilla de jwt
        throw new Error("No hay semilla de JWT -  revisar variable de entorno");
    }

    return jwt.sign(
        { _id, email },// payload info no sensible
        process.env.JWT_SECRET_SEED, // seed
        { expiresIn: "30d" } // opciones
    )
}

export const isValidToken = (token:string):Promise<string> => {
 if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT - Revisar variable de entorno");
 }

 if (token.length <= 10) {
    return Promise.reject("JWT no valido")
 }

 return new Promise((resolve, reject) => {
    try { // el verify recibe un token, la semilla y un callback
        jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) =>{
            if (err) return reject("JWT no es valido");

            const {_id} = payload as {_id:string}
            resolve(_id)
        })
    } catch (error) {
         reject("JWT no es valido");
    }
 })
}