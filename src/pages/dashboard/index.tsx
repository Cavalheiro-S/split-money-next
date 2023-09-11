'use client'

import { Record } from "@/components/Record/Record";
import { AppDispatch, RootState } from "@/store";
import { setOutcomesAsync, setTransactionsAsync } from "@/store/features/transaction/TransactionSlice";
import { getUserByEmail } from "@/store/features/user/UserSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import { Space } from "antd";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()
    const transactionState = useSelector((state: RootState) => state.transactionState)
    const userState = useSelector((state: RootState) => state.userState)
    const router = useRouter()

    useEffect(() => {
        const loadData = async () => {
            if (!userState.user?.id)
                router.replace("/session/login")
            await dispatch(getUserByEmail(userState.user.email))
            await dispatch(setTransactionsAsync(userState.user.id))
            await dispatch(setOutcomesAsync(userState.user.id))
        }
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.user?.id])
    return userState.loading ? <Loading /> : (
        <Space direction="vertical" className="mt-10">
            <Record.Root data={transactionState.transactions} title="Últimos Lançamentos" />
            <Record.Root data={transactionState.outcomes} title="Últimas Despesas" />
        </Space>
    )
}