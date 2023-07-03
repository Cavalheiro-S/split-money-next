'use client'

import { Record } from "@/components/Record/Record";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Wrapper } from "@/components/Wrapper/Wrapper";
import { useTransaction } from "@/hooks/useTransaction";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { getTransactions, getTransactionsOutcome } = useTransaction();
  const { transactions, outcomes } = useSelector((state: RootState) => state.transactionState)

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getTransactions(),
        getTransactionsOutcome()
      ])
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SearchBar className="mt-10" />
      <Record data={transactions} title="Últimos Lançamentos" />
      <Record data={outcomes} title="Últimas Despesas" />
    </>
  )
}
