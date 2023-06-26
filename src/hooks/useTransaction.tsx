
import { TransactionContext } from '@/contexts/TransactionContext';
import { api } from '@/data/axios';
import { ApiBaseDTO } from '@/data/dtos/ApiBaseDTO';
import { TransactionDTO } from '@/data/dtos/TransactionDTO';
import { verifyErrorType } from '@/utils';
import React, { useContext } from 'react';

type ApiResult = ApiBaseDTO<TransactionDTO>

export const useTransaction = () => {

    const [loading, setLoading] = React.useState(false);
    const { transactions, setTransactions } = useContext(TransactionContext)

    // Melhorar tratamento de erros da api
    async function execute(fn: () => Promise<ApiBaseDTO<TransactionDTO>>) {
        try {
            setLoading(true);
            const result = await fn();
            return { result, error: undefined };
        } catch (err) {
            const error = verifyErrorType(err);
            return { result: undefined, error };
        } finally {
            setLoading(false);
        }
    }

    const getTransactions = async () => execute(async () => {
        const response = await api.get<ApiResult>('/transaction')
        if (response.data && Array.isArray(response.data.data)) {
            setTransactions(response.data.data)
        }
        return response.data
    })

    const getTransactionsByType = async (type: "income" | "outcome") => execute(async () => {
        const response = await api.get<ApiResult>('/transaction/type/' + type)
        return response.data
    })

    const getTransactionById = async (id: string) => execute(async () => {
        const response = await api.get<ApiResult>('/transaction/' + id)
        return response.data
    })

    const createTransaction = async (transaction: TransactionDTO) => execute(async () => {
        const response = await api.post<ApiResult>('/transaction', transaction)
        if (response.data && !Array.isArray(response.data.data) && response.data.data) {
            setTransactions([...transactions, response.data.data])
        }
        return response.data
    })

    const updateTransaction = async (transaction: TransactionDTO) => execute(async () => {
        const response = await api.put<ApiResult>('/transaction/' + transaction.id, transaction)
        if (response.data && !Array.isArray(response.data.data) && response.data.data) {
            const index = transactions.findIndex(t => t.id === transaction.id)
            if (index >= 0) {
                transactions[index] = response.data.data
                setTransactions([...transactions])
            }
        }
        return response.data
    })

    const deleteTransaction = async (id: string) => execute(async () => {
        const response = await api.delete<ApiResult>('/transaction/' + id)
        if (response.data && !Array.isArray(response.data.data) && response.data.data) {
            const index = transactions.findIndex(t => t.id === Number(id))
            if (index >= 0) {
                transactions.splice(index, 1)
                setTransactions([...transactions])
            }
        }
        return response.data
    })

    return {
        getTransactions,
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionsByType,
        transactions,
        setTransactions,
        loading
    }
}
