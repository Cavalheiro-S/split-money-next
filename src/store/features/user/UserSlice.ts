
import { api } from '@/data/axios';
import { ApiBaseDTO } from '@/data/dtos/ApiBaseDTO';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

interface UserDTO {
    id?: string,
    name?: string,
    email: string,
    password?: string,
    balance: number,
}

const initialState = {
    user: {} as UserDTO,
    loading: false,
};

export const signinAsync = createAsyncThunk(
    'user/signinAsync',
    async (action: { email: string, password: string }, thunkApi) => {
        try {
            console.log("Logado");
            
        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

export const createUserAsync = createAsyncThunk(
    'user/createUserAsync',
    async (action: { name: string, email: string, password: string }, thunkApi) => {
        try {
            console.log("createUserAsync");
            
            const response = await api.post<ApiBaseDTO<UserDTO>>('/user', { ...action, balance: 0 })
            return response.data.data
        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

export const signoutAsync = createAsyncThunk(
    'user/signoutAsync',
    async (_, thunkApi) => {
        try {

        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.user = action.payload as UserDTO;
                state.loading = false;
            })
            .addCase(signoutAsync.fulfilled, (state) => {
                state.user = {} as UserDTO;
                state.loading = false;
            })
            .addCase(signinAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('pending')
                }
                , (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith('rejected')
                }
                , (state) => {
                    state.loading = false;
                    console.log('rejected');
                    
                }
            )
    }
});

export const { } = userSlice.actions;

export default userSlice.reducer;