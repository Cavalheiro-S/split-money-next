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

    const router = useRouter()
    const { userState } = useSelector((state: RootState) => state)
    useEffect(() => {
        if (!userState.isAuthenticated){
            console.log("User is not authenticated");
            router.push("/session/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.isAuthenticated])
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
            <ToastContainer />
        </>
    )
}