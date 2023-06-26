import { TransactionDTO } from "@/data/dtos/TransactionDTO";
import { createContext, useState } from "react";

interface TransactionData {
    transactions: TransactionDTO[],
    setTransactions: React.Dispatch<React.SetStateAction<TransactionDTO[]>>
}

interface TransactionProviderProps {
    children: React.ReactNode
}

export const TransactionContext = createContext<TransactionData>({} as TransactionData);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {

    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

    const value = {
        transactions,
        setTransactions
    }
    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}