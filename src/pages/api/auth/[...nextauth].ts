import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import { checkUserEmailPassword, oAUthToDbUser } from '../../../../database/dbUsers';
import { signIn } from 'next-auth/react';



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

    // Indicamos nuestras paginas personalizadas para iniciar sesion y registrarnos
    pages:{
        signIn:"/auth/login",
        newUser: "/auth/register"
    },

    session: {
        maxAge:2592000, // 30 dias va a durar la session
        strategy: "jwt",
        updateAge: 86400 // cada dia se actualiza
    },

    callbacks: {
        async jwt({ token, account, user }: any) { //regresar un token

            if (account) {
                token.accessToken = account.access_token;
                switch (account.type) {

                    case 'oauth': // oauth significa cuando se inicia sesion con una red social
                        token.user = await oAUthToDbUser(user?.email || '', user?.name || '');
                        break;

                    case "credentials":
                        token.user = user;
                        break
                }
            }

            return token
        },

        async session({ session, token, user }: any) { // regresar una session
            session.accessToken = token.accessToken;
            session.user = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions)