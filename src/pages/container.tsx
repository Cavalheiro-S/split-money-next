import { Header } from "@/components/Header"
import { Loading } from "@/components/Loading/Loading"
import { NavBar } from "@/components/NavBar/NavBar"
import { RootState } from "@/store"
import { NextComponentType, NextPageContext } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"

interface Props {
    Component: NextComponentType,
    pageProps: any
}

export default function Page({ Component, pageProps: { session, ...pageProps } }: Props) {
    const userState = useSelector((state: RootState) => state.userState)
    const router = useRouter()
    useEffect(() => {
        if (!userState.isAuthenticated && !router.asPath.includes("session/signup")) {
            router.replace("/session/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.isAuthenticated])
    return (
        <>
            <Header />
            <NavBar />
            <Component {...pageProps} />
            <ToastContainer limit={1} />
        </>
    )
}