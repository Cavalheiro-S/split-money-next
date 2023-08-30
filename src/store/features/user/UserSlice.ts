import { api } from '@/data/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserSignup {
    name: string,
    email: string,
    password: string,
}

const initialState = {
    user: {} as User,
    loading: false,
};

export const signInAsync = createAsyncThunk(
    'user/signInAsync',
    async (action: { email: string, password: string }, thunkApi) => {
        try {
            const response = await api.post<ApiBase<{ access_token: string, expiresIn: number }>>("/auth/login",
                { email: action.email, password: action.password })
            if (!response.data.data)
                throw new Error()
            localStorage.setItem('token', response.data.data.access_token);
            const config = {
                headers: {
                    Authorization: `Bearer ${response.data.data.access_token}`,
                }
            }
            const responseUser = await api.post<ApiBase<User>>("/user/getByEmail", { email: action.email }, config)

            return responseUser.data.data
        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

export const signUpUserAsync = createAsyncThunk(
    'user/signUpUserAsync',
    async (action: UserSignup, thunkApi) => {
        try {
            const body = {
                name: action.name,
                email: action.email,
                password: action.password,
                balance: 0,
                loginMethod: 'email'
            }
            const response = await api.post<ApiBase<User>>('/user', body)
            return response.data.data
        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

export const signOutAsync = createAsyncThunk(
    'user/signOutAsync',
    async (_, thunkApi) => {
        try {
            localStorage.removeItem('token');
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
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.user = action.payload as User;
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.user = {} as User;
            })
            .addCase(signInAsync.fulfilled, (state, action) => {
                state.user = action.payload as User;
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
            .addMatcher(
                (action) => {
                    return action.type.endsWith('fulfilled')
                }
                , (state) => {
                    state.loading = false;
                }
            )
    }
});

export const { } = userSlice.actions;

export default userSlice.reducer;