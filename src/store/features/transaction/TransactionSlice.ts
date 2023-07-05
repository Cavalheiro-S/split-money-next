import { api } from "@/data/axios";
import { ApiBaseDTO } from "@/data/dtos/ApiBaseDTO";
import { TransactionDTO } from "@/data/dtos/TransactionDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { closeModal } from "../modal/ModalSlice";

export const setTransactionsAsync = createAsyncThunk(
    'transaction/setTransactionsAsync',
    async (name, thunkAPI) => {
        try {
            const response = await api.get<ApiBaseDTO<TransactionDTO>>('/transaction')
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    async (transaction: TransactionDTO, thunkAPI) => {
        try {
            const response = await api.post<ApiBaseDTO<TransactionDTO>>('/transaction', transaction)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const setTransactionByIdAsync = createAsyncThunk(
    'transaction/setTransactionByIdAsync',
    async (id: number, thunkAPI) => {
        try {
            const response = await api.get<ApiBaseDTO<TransactionDTO>>(`/transaction/${id}`)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const updateTransactionAsync = createAsyncThunk(
    'transaction/updateTransactionAsync',
    async (transaction: TransactionDTO, thunkAPI) => {
        try {
            const response = await api.patch<ApiBaseDTO<TransactionDTO>>(`/transaction/${transaction.id}`, transaction)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
        finally{
            thunkAPI.dispatch(closeModal())
        }
    }
)

export const deleteTransactionAsync = createAsyncThunk(
    'transaction/deleteTransactionAsync',
    async (id: string, thunkAPI) => {
        try {

            const response = await api.delete<ApiBaseDTO<TransactionDTO>>(`/transaction/${id}`)
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const setIncomesAsync = createAsyncThunk(
    'transaction/setIncomesAsync',
    async (name, thunkAPI) => {
        try {
            const response = await api.get<ApiBaseDTO<TransactionDTO>>('/transaction/type/income')
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const setOutcomesAsync = createAsyncThunk(
    'transaction/setOutcomesAsync',
    async (name, thunkAPI) => {
        try {
            const response = await api.get<ApiBaseDTO<TransactionDTO>>('/transaction/type/outcome')
            return response.data.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactionActive: {} as TransactionDTO,
        transactions: [] as TransactionDTO[],
        incomes: [] as TransactionDTO[],
        outcomes: [] as TransactionDTO[],
        isLoading: false
    },
    reducers: {
        cleanTransactionActive: (state) => {
            state.transactionActive = {} as TransactionDTO
        },
        setTransactionActive: (state, action) => {
            state.transactionActive = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTransactionsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const transactionsPayload = action.payload as TransactionDTO[]
                state.transactions = transactionsPayload
            })
            .addCase(addTransactionAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const transactionPayload = action.payload as TransactionDTO
                state.transactions.push(transactionPayload)
                toast.success('Transação adicionada com sucesso!')
            })
            .addCase(setTransactionByIdAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const transactionPayload = action.payload as TransactionDTO
                state.transactionActive = transactionPayload
            })
            .addCase(updateTransactionAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const transactionPayload = action.payload as TransactionDTO
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions[index] = transactionPayload
                toast.success('Transação atualizada com sucesso!')
            })
            .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const transactionPayload = action.payload as TransactionDTO
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions.splice(index, 1)
                toast.success('Transação deletada com sucesso!')
            })
            .addCase(setIncomesAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const incomesPayload = action.payload as TransactionDTO[]
                state.incomes = incomesPayload
            })
            .addCase(setOutcomesAsync.fulfilled, (state, action) => {
                state.isLoading = false
                const outcomesPayload = action.payload as TransactionDTO[]
                state.outcomes = outcomesPayload
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