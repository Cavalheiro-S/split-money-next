import { api } from "@/data/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { closeModal } from "../modal/ModalSlice";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { setUserIsAuthenticated } from "../user/UserSlice";
import { AuthenticationError } from "@/exceptions";



export const execute = async (url: string, method: "POST" | "PATCH" | "DELETE" | "GET", thunkAPI: any, data?: any, callbackFinally?: Function,) => {
    try {
        const tokenValue = Cookies.get("split.money.token");
        const tokenExpiresAtValue = Cookies.get("split.money.expiresAt")
        const tokenExpiresAt = dayjs(tokenExpiresAtValue).unix();

        if (!tokenValue || dayjs(dayjs().unix()).isAfter(tokenExpiresAt)) {
            Cookies.remove("split.money.token")
            Cookies.remove("split.money.expiresAt")
            throw new AuthenticationError("Invalid token")
        }

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenValue}`,
            },
        };

        if (method === "GET" && data) {
            config.params = data;
        }

        const methods = {
            POST: async (url: string, data: any) => {
                const response = await api.post<ApiBase<Transaction>>(url, data, config);
                return response.data;
            },
            PATCH: async (url: string, data: any) => {
                const response = await api.patch<ApiBase<Transaction>>(url, data, config);
                return response.data;
            },
            DELETE: async (url: string) => {
                const response = await api.delete<ApiBase<Transaction>>(url, config);
                return response.data;
            },
            GET: async (url: string) => {
                const response = await api.get<ApiBase<Transaction>>(url, config);
                return response.data;
            }
        }
        const response = await methods[method](url, data)
        return response.data
    }
    catch (error) {
        if (error instanceof AuthenticationError) {
            thunkAPI.dispatch(setUserIsAuthenticated(false))
        }
        return thunkAPI.rejectWithValue(error)
    }
    finally {
        callbackFinally && callbackFinally()
    }
}

export const setTransactionsAsync = createAsyncThunk(
    'transaction/setTransactionsAsync',
    (userId: string, thunkAPI) => execute(`/transaction/${userId}`, "GET", thunkAPI)
)

export const addTransactionAsync = createAsyncThunk(
    'transaction/addTransactionAsync',
    ({ userId, ...transaction }: TransactionWithUserId, thunkAPI) =>
        execute("/transaction", "POST", thunkAPI, { ...transaction, userId })
)

export const setTransactionByIdAsync = createAsyncThunk(
    'transaction/setTransactionByIdAsync',
    (id: number, thunkAPI) => execute(`/transaction/${id}`, "GET", thunkAPI)
)

export const updateTransactionAsync = createAsyncThunk(
    'transaction/updateTransactionAsync',
    (transaction: Transaction, thunkAPI) => execute(
        `/transaction/${transaction.id}`,
        "PATCH",
        thunkAPI,
        transaction,
        () => thunkAPI.dispatch(closeModal())),
)

export const deleteTransactionAsync = createAsyncThunk(
    'transaction/deleteTransactionAsync',
    (id: string, thunkAPI) => execute(`/transaction/${id}`, "DELETE", thunkAPI)
)

export const setIncomesAsync = createAsyncThunk(
    'transaction/setIncomesAsync',
    (userId: string, thunkAPI) => execute('/transaction/type', "GET", thunkAPI, { userId, type: "income" },)
)

export const setOutcomesAsync = createAsyncThunk(
    'transaction/setOutcomesAsync',
    (userId: string, thunkAPI) => execute('/transaction/type', "GET", thunkAPI, { userId, type: "outcome" },)
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
                toast.success(`Transação ${transactionPayload.description} adicionada com sucesso!`)
            })
            .addCase(setTransactionByIdAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                state.transactionActive = transactionPayload
            })
            .addCase(updateTransactionAsync.fulfilled, (state, action) => {
                const transactionPayload = action.payload as Transaction
                const index = state.transactions.findIndex(transaction => transaction.id === transactionPayload.id)
                state.transactions[index] = transactionPayload
                toast.success(`Transação ${transactionPayload.description} atualizada com sucesso!`)
            })
            .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
                const id = action.payload as string
                const index = state.transactions.findIndex(transaction => transaction.id === id)
                state.transactions.splice(index, 1)
                toast.success(`Transação deletada com sucesso!`)
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
                if (action.payload instanceof AuthenticationError) {
                    toast.length > 0 && toast.error("Seu login expirou")
                    return;
                }
                toast.error("Falha ao realizar a operação, tente novamente mais tarde!")

            })
    }
})

export const { setTransactionActive, cleanTransactionActive } = transactionSlice.actions

export default transactionSlice.reducer