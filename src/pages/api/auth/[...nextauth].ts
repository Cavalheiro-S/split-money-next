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
        })
    ],

}

export default NextAuth(authOptions)