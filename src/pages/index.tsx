'use client'

import { Loading } from "@/components/Loading/Loading";
import { Record } from "@/components/Record/Record";
import { SearchBar } from "@/components/SearchBar/SearchBar";
// import { useTransaction } from "@/hooks/useTransaction";
import { AppDispatch, RootState } from "@/store";
import { setTransactionsAsync, setOutcomesAsync } from "@/store/features/transaction/TransactionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // const { getTransactionsOutcome } = useTransaction();
  const dispatch = useDispatch<AppDispatch>()
  const { transactions, outcomes, isLoading } = useSelector((state: RootState) => state.transactionState)

  useEffect(() => {
    const loadData = async () => {
      dispatch(setTransactionsAsync())
      dispatch(setOutcomesAsync())
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoading ? <Loading/> : (
    <>
      <SearchBar className="mt-10" />
      <Record data={transactions} title="Últimos Lançamentos" />
      <Record data={outcomes} title="Últimas Despesas" />
    </>
  )
}
