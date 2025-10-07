import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "./prisma"
import {compare} from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter:PrismaAdapter(prisma),
    session:{strategy:"jwt"},
    pages:{
        signIn:"/"
    },
    providers:[
        CredentialsProvider({
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials){
                if(!credentials.email || !credentials.password){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email as string
                    }
                })
                if(!user){
                    return null
                }

                const passwordMatch = await compare(credentials.password as string, user.password)

                if(!passwordMatch){
                    return  null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name:user.name || "",
                    image: user.image || ""
                }
            },
        }),
    ],
    callbacks:{
        async session({token, session}) {
            if(token && session.user){
                session.user.id = token.sub!
            }

            if(session.user){
                session.user.name = token.name as string
                session.user.email = token.email as string,
                session.user.image = token.picture as string
            }
            return session
        },
        async jwt({token, user}) {
            if(user){
                token.sub = user.id
            }
            return token
        }
    }
})