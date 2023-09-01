import { api } from "@/data/axios";
import dayjs from "dayjs";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExecuteResponse<T> {
    data: T | null,
    success: boolean
}

const execute = async <T>(callback: Function): Promise<ExecuteResponse<T>> => {
    try {
        const response = await callback()
        response.data as T
        return { data: response.data, success: true }
    }
    catch (error) {
        return { data: null, success: false }
    }
}

export const authOptions: AuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@email.com", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials, req) {

                const res = await api.post("auth/login", {
                    email: credentials?.email,
                    password: credentials?.password
                })

                const user = res.data

                if (user)
                    return user;

                return null;
            }
        })
    ],
    callbacks: {},
    jwt: {
        decode(params){
            console.log(params);
            return {}
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 15 // 15 minutes
    }

}

export default NextAuth(authOptions)