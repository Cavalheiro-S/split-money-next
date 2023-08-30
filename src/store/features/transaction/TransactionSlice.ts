import { api } from "@/data/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { closeModal } from "../modal/ModalSlice";
import { AxiosRequestConfig } from "axios";

type TransactionWithUserId = {
    transaction: Transaction
    userId: string,
}

export const execute = async (callbackAction: Function, thunkAPI: any, callbackFinally?: Function) => {
    try {
        const response = await callbackAction()
        return response.data.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error })
    }
    finally {
        if (callbackFinally)
            callbackFinally()
    }
}

export const setTransactionsAsync = createAsyncThunk(
    'transaction/setTransactionsAsync',
    (userId: string, thunkAPI) => execute(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return api.get<ApiBase<Transaction>>('/transaction/' + userId, config)
    }, thunkAPI)
)

export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    ({ transaction, userId }: TransactionWithUserId, thunkAPI) =>
        execute(() => {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return api.post<ApiBase<Transaction>>('/transaction', { ...transaction, userId }, config)
        }, thunkAPI)
)

export const setTransactionByIdAsync = createAsyncThunk(
    'transaction/setTransactionByIdAsync',
    (id: number, thunkAPI) => execute(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        return api.get<ApiBase<Transaction>>(`/transaction/${id}`, config)
    }, thunkAPI)
)

export const updateTransactionAsync = createAsyncThunk(
    'transaction/updateTransactionAsync',
    (transaction: Transaction, thunkAPI) => execute(
        () => {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return api.patch<ApiBase<Transaction>>(`/transaction/${transaction.id}`, transaction, config)
        },
        thunkAPI.dispatch(closeModal()))
)

export const deleteTransactionAsync = createAsyncThunk(
    'transaction/deleteTransactionAsync',
    (id: string, thunkAPI) => execute(
        () => {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return api.delete<ApiBase<Transaction>>(`/transaction/${id}`, config)
        }, thunkAPI)
)

export const setIncomesAsync = createAsyncThunk(
    'transaction/setIncomesAsync',
    (userId: string, thunkAPI) => execute(
        () => {
            const token = localStorage.getItem('token')
            const config: AxiosRequestConfig = {
                params: {
                    userId,
                    type: 'income'
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return api.get<ApiBase<Transaction>>('/transaction/type', config)
        },
        thunkAPI)
)

export const setOutcomesAsync = createAsyncThunk(
    'transaction/setOutcomesAsync',
    (userId: string, thunkAPI) => execute(
        () => {
            const token = localStorage.getItem('token')
            const config: AxiosRequestConfig = {
                params: {
                    userId,
                    type: 'outcome'
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            return api.get<ApiBase<Transaction>>('/transaction/type', config)
        }
        , thunkAPI)
)

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactionActive: {} as Transaction,
        transactions: [] as Transaction[],
        incomes: [] as Transaction[],
        outcomes: [] as Transaction[],
        isLoading: false
    },
    reducers: {
        cleanTransactionActive: (state) => {
            state.transactionActive = {} as Transaction
        },
        setTransactionActive: (state, action) => {
            state.transactionActive = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTransactionsAsync.fulfilled, (state, action) => {
                const transactionsPayload = action.payload as Transaction[]
                state.transactions = transactionsPayload
            })
            .addCase(addTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                state.transactions.push(transactionPayload)
                toast.success('Transação adicionada com sucesso!')
            })
            .addCase(setTransactionByIdAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                state.transactionActive = transactionPayload
            })
            .addCase(updateTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions[index] = transactionPayload
                toast.success('Transação atualizada com sucesso!')
            })
            .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions.splice(index, 1)
                toast.success('Transação deletada com sucesso!')
            })
            .addCase(setIncomesAsync.fulfilled, (state, action) => {
                const incomesPayload = action.payload as Transaction[]
                state.incomes = incomesPayload
            })
            .addCase(setOutcomesAsync.fulfilled, (state, action) => {
                const outcomesPayload = action.payload as Transaction[]
                state.outcomes = outcomesPayload
            })
            .addMatcher(action => action.type.endsWith('/fulfilled'), (state, action) => {
                state.isLoading = false
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state, action) => {
                state.isLoading = true
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.isLoading = false
                toast.error("Falha ao realizar a operação, tente novamente mais tarde!")
            })
    }
})

export const { setTransactionActive, cleanTransactionActive } = transactionSlice.actions

export default transactionSlice.reducer