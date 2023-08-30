import { api } from "@/data/axios";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

interface ExecuteResponse<T>{
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
    callbacks: {
        async signIn({ account, profile, user }) {
            if (profile && account?.provider === "google") {
                const { data: dataGet, success: successGet } = await execute<Omit<User, "password">>(() => api.get<Omit<User, "password">>("/user/email/" + profile.email))
                if (!dataGet || !successGet) {
                    const { data: dataPost, success: successPost } = await execute<Omit<User, "password">>(() => api.post<Omit<User, "password">>("/user", {
                        name: profile?.name,
                        email: profile?.email,
                        balance: 0,
                    }))
                    if(!successPost || !dataPost) return false
                    return true
                    
                }
                return successGet
            }

            return true
        },
        async session({ session }) {
            const { data, success } = await execute<ApiBase<Omit<User, "password">>>(() => api.get<Omit<User, "password">>("/user/email/" + session.user.email))
            session.user.id = data?.data.id || ""
            return session
        }
    }

}

export default NextAuth(authOptions)