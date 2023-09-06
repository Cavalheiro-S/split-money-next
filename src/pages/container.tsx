import { NavBar } from "@/components/NavBar/NavBar"
import { RootState } from "@/store"
import { NextComponentType, NextPageContext } from "next"
import { useRouter } from "next/navigation"
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
        !userState.isAuthenticated && router.replace("/session/login")
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