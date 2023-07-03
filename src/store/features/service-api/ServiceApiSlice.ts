import { createSlice } from "@reduxjs/toolkit";

export const serviceApiSlice = createSlice({
    name: 'service-api',
    initialState: {
        loading: false,
        error: "",
    },
    reducers: {
        setLoading: (state, action) => {
            const loadingPayload = action.payload as boolean
            state.loading = loadingPayload
        },
        setError: (state, action) => {
            const errorPayload = action.payload as string
            state.error = errorPayload
        },
        clearError: (state) => {
            state.error = ""
        }
    }
})

export const { setLoading, setError, clearError } = serviceApiSlice.actions

export default serviceApiSlice.reducer