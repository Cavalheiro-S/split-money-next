import { RootState } from "@/store"
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Loading } from "../Loading/Loading"

interface Props {
    children: ReactNode
}

export const Layout = ({ children }: Props) => {

    const userState = useSelector((state: RootState) => state.userState)
    const transactionState = useSelector((state: RootState) => state.transactionState)
    return (
        <>
            {transactionState.isLoading ? <Loading /> : children}
        </>
    )
}