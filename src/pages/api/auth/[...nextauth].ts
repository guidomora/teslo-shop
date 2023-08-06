import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import { checkUserEmailPassword } from '../../../../database/dbUsers';



export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!!,
            clientSecret: process.env.GITHUB_SECRET!!
        }),
        // ...add more providers here

        Credentials({
            name: "Custom Login",
            credentials: {
                email: { label: "Correo", type: "email", placeholder: "correo@google.com" },
                password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
            },
            async authorize(credentials) {
                console.log({ credentials });

                return await checkUserEmailPassword(credentials!.email, credentials!.password)
            }
        })

    ],



    callbacks: {
        async jwt({ token, account, user }:any) { //regresar un token

            if (account) {
                token.accesToken = account.accses_token
                switch(account.type) {
                    case "oauth":
                        break

                    case "credentials":
                        token.user = user;
                        break
                }
            }

            return token
        },

        async session({ session, token, user }:any) { // regresar una session
            session.accesToken = token.accesToken;
            session.user = token.user as any
            return session
        }
    }
}

export default NextAuth(authOptions)