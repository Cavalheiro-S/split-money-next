import { Record } from "@/components/Record/Record";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { AppDispatch, RootState } from "@/store";
import { setTransactionsAsync, setOutcomesAsync } from "@/store/features/transaction/TransactionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>()
    const transactionState = useSelector((state: RootState) => state.transactionState)
    const userState = useSelector((state: RootState) => state.userState)

    useEffect(() => {
        const loadData = async () => {
            if (!userState.user?.id) return
            dispatch(setTransactionsAsync(userState.user.id))
            dispatch(setOutcomesAsync(userState.user.id))
        }
        loadData()
    }, [dispatch, userState.user?.id])
    return (
        <>
            <SearchBar className="mt-10"/>
            <Record.Root data={transactionState.transactions} title="Últimos Lançamentos" />
            <Record.Root data={transactionState.outcomes} title="Últimas Despesas" />
        </>
    )
}