import { api } from "@/data/axios";
import { ApiBaseDTO } from "@/data/dtos/ApiBaseDTO";
import { TransactionDTO } from "@/data/dtos/TransactionDTO";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { closeModal } from "../modal/ModalSlice";

export const execute = async (action: any, thunkAPI: any, callbackFinally?: Function) => {
    try {
        const response = await action
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
    (_, thunkAPI) => execute(api.get<ApiBaseDTO<TransactionDTO>>('/transaction'), thunkAPI)
)

export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    (transaction: TransactionDTO, thunkAPI) => execute(
        api.post<ApiBaseDTO<TransactionDTO>>('/transaction', transaction),
        thunkAPI)
)

export const setTransactionByIdAsync = createAsyncThunk(
    'transaction/setTransactionByIdAsync',
    (id: number, thunkAPI) => execute(
        api.get<ApiBaseDTO<TransactionDTO>>(`/transaction/${id}`), thunkAPI)
)

export const updateTransactionAsync = createAsyncThunk(
    'transaction/updateTransactionAsync',
    (transaction: TransactionDTO, thunkAPI) => execute(
        api.patch<ApiBaseDTO<TransactionDTO>>(`/transaction/${transaction.id}`, transaction),
        thunkAPI.dispatch(closeModal()))
)

export const deleteTransactionAsync = createAsyncThunk(
    'transaction/deleteTransactionAsync',
    (id: string, thunkAPI) => execute(
        api.delete<ApiBaseDTO<TransactionDTO>>(`/transaction/${id}`), thunkAPI)
)

export const setIncomesAsync = createAsyncThunk(
    'transaction/setIncomesAsync',
    (_, thunkAPI) => execute(
        api.get<ApiBaseDTO<TransactionDTO>>('/transaction/type/income'), thunkAPI)
)

export const setOutcomesAsync = createAsyncThunk(
    'transaction/setOutcomesAsync',
    (_, thunkAPI) => execute(
        api.get<ApiBaseDTO<TransactionDTO>>('/transaction/type/outcome'), thunkAPI)
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
                const transactionsPayload = action.payload as TransactionDTO[]
                state.transactions = transactionsPayload
            })
            .addCase(addTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as TransactionDTO
                state.transactions.push(transactionPayload)
                toast.success('Transação adicionada com sucesso!')
            })
            .addCase(setTransactionByIdAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as TransactionDTO
                state.transactionActive = transactionPayload
            })
            .addCase(updateTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as TransactionDTO
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions[index] = transactionPayload
                toast.success('Transação atualizada com sucesso!')
            })
            .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as TransactionDTO
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions.splice(index, 1)
                toast.success('Transação deletada com sucesso!')
            })
            .addCase(setIncomesAsync.fulfilled, (state, action) => {
                const incomesPayload = action.payload as TransactionDTO[]
                state.incomes = incomesPayload
            })
            .addCase(setOutcomesAsync.fulfilled, (state, action) => {
                const outcomesPayload = action.payload as TransactionDTO[]
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