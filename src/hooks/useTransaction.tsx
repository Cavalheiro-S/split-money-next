
import { api } from '@/data/axios';
import { ApiBaseDTO } from '@/data/dtos/ApiBaseDTO';
import { TransactionDTO } from '@/data/dtos/TransactionDTO';
import { AppDispatch } from '@/store';
import { setError, setLoading } from '@/store/features/service-api/ServiceApiSlice';
import {
    addTransaction,
    deleteTransaction as deleteTransactionSlice,
    setIncomes,
    setOutcomes,
    setTransactionById,
    setTransactions,
    updateTransaction as updateTransactionSlice
} from '@/store/features/transaction/TransactionSlice';
import { verifyErrorType } from '@/utils';
import { useDispatch } from 'react-redux';

type ApiResult = ApiBaseDTO<TransactionDTO>

export const useTransaction = () => {
    const dispatch = useDispatch<AppDispatch>()

    // Melhorar tratamento de erros da api
    async function execute(fn: () => Promise<ApiBaseDTO<TransactionDTO>>) {
        try {
            // dispatch(setLoading(true))
            const result = await fn();
            return { result, error: undefined };
        } catch (err) {
            const error = verifyErrorType(err);
            dispatch(setError(error))
            return { result: undefined, error };
        } finally {
            // dispatch(setLoading(false))
        }
    }

    const getTransactions = async () => execute(async () => {
        console.log('getTransactions');
        
        const response = await api.get<ApiResult>('/transaction')
        dispatch(setTransactions(response.data.data as TransactionDTO[]))
        return response.data
    })

    const getTransactionsIncome = async () => execute(async () => {
        const response = await api.get<ApiResult>('/transaction/type/income')
        dispatch(setIncomes(response.data.data as TransactionDTO[]))
        return response.data
    })

    const getTransactionsOutcome = async () => execute(async () => {
        const response = await api.get<ApiResult>('/transaction/type/outcome')
        dispatch(setOutcomes(response.data.data as TransactionDTO[]))
        return response.data
    })

    const getTransactionById = async (id: string) => execute(async () => {
        const response = await api.get<ApiResult>('/transaction/' + id)
        dispatch(setTransactionById(response.data.data as TransactionDTO))
        return response.data
    })

    const createTransaction = async (transaction: TransactionDTO) => execute(async () => {
        const response = await api.post<ApiResult>('/transaction', transaction)
        dispatch(addTransaction(response.data.data as TransactionDTO))
        return response.data
    })

    const updateTransaction = async (transaction: TransactionDTO) => execute(async () => {
        const response = await api.put<ApiResult>('/transaction/' + transaction.id, transaction)
        dispatch(updateTransactionSlice(response.data.data as TransactionDTO))
        return response.data
    })

    const deleteTransaction = async (id: string) => execute(async () => {
        const response = await api.delete<ApiResult>('/transaction/' + id)
        dispatch(deleteTransactionSlice(id))
        return response.data
    })

    return {
        getTransactions,
        getTransactionById,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionsIncome,
        getTransactionsOutcome,
    }
}
