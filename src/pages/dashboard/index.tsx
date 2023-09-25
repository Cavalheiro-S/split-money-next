import { TableRecord } from "@/components/Record/Record";
import { AppDispatch, RootState } from "@/store";
import { setOutcomesAsync, setTransactionsAsync } from "@/store/features/transaction/TransactionSlice";
import { getUserByEmail } from "@/store/features/user/UserSlice";
import { Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
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
    return (
        <Space direction="vertical" className="col-start-2 px-10 mt-10">
            <TableRecord data={transactionState.transactions} title="Últimos Lançamentos" />
            <TableRecord data={transactionState.outcomes} title="Últimas Despesas" />
        </Space>
    )
}