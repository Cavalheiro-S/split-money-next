import { TransactionDTO } from "@/data/dtos/TransactionDTO";
import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {
    transactionActive: TransactionDTO
    transactions: TransactionDTO[]
    incomes: TransactionDTO[]
    outcomes: TransactionDTO[]
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactionActive: {} as TransactionDTO,
        transactions: [] as TransactionDTO[],
        incomes: [] as TransactionDTO[],
        outcomes: [] as TransactionDTO[]
    },
    reducers: {
        addTransaction: (state, action) => {
            const transactionPayload = action.payload as TransactionDTO
            state.transactions.push(transactionPayload)
        },
        setTransactionById: (state, action) => {
            const transactionPayload = action.payload as TransactionDTO
            state.transactionActive = transactionPayload
        },
        setTransactions: (state, action) => {
            const transactionsPayload = action.payload as TransactionDTO[]
            state.transactions = transactionsPayload
        },
        setIncomes: (state, action) => {
            const incomesPayload = action.payload as TransactionDTO[]
            state.incomes = incomesPayload
        },
        setOutcomes: (state, action) => {
            const outcomesPayload = action.payload as TransactionDTO[]
            state.outcomes = outcomesPayload
        },
        updateTransaction: (state, action) => {
            const transactionPayload = action.payload as TransactionDTO
            const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
            state.transactions[index] = transactionPayload
        },
        deleteTransaction: (state, action) => {
            const transactionPayload = action.payload as TransactionDTO
            const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
            state.transactions.splice(index, 1)
        }
    }
})

export const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setTransactionById,
    setTransactions,
    setIncomes,
    setOutcomes
} = transactionSlice.actions

export default transactionSlice.reducer