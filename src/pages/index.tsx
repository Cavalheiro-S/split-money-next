'use client'

import { Loading } from "@/components/Loading/Loading";
import { Record } from "@/components/Record/Record";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { TransactionDTO } from "@/data/dtos/TransactionDTO";
import { useTransaction } from "@/hooks/useTransaction";
import { useEffect, useState } from "react";

export default function Home() {

  const [error, setError] = useState<string>('')
  const { getTransactions, getTransactionsByType, loading } = useTransaction();
  const [transactions, setTransactions] = useState<TransactionDTO[]>([])
  const [outcomes, setOutcomes] = useState<TransactionDTO[]>([])

  useEffect(() => {
    const loadTransactions = async () => {
      const { result } = await getTransactions()
      if (result?.data && Array.isArray(result.data)) {
        setTransactions(result.data)
      }
    }
    const loadOutcomes = async () => {
      const { result } = await getTransactionsByType("outcome")
      if (result?.data && Array.isArray(result.data)) {
        setOutcomes(result.data)
      }
    }
    loadTransactions()
    loadOutcomes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ])

  return loading ? <Loading />
    : (
      <>
        <SearchBar className="mt-10" />
        {!error &&
          <>
            <Record title="Últimos Lançamentos" data={transactions} />
            <Record title="Últimas Despesas" data={outcomes} />
          </>
        }

      </>
    )
}
