import { api } from '@/data/axios';
import { AuthenticationError } from '@/exceptions';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

interface UserSignup {
    name: string,
    email: string,
    password: string,
}

const initialState = {
    user: {} as User,
    loading: false,
    isAuthenticated: false,
    error: ""
};

export const getUserByEmail = createAsyncThunk(
    'user/getUserByEmail',
    async (email: string, thunkAPI) => {
        try {
            const tokenValue = Cookies.get("split.money.token");
            const tokenExpiresAtValue = Cookies.get("split.money.expiresAt")
            const tokenExpiresAt = dayjs(tokenExpiresAtValue).unix();
            if (!tokenValue || dayjs(dayjs().unix()).isAfter(tokenExpiresAt)) {
                thunkAPI.dispatch(setUserIsAuthenticated(false))
                throw new Error("Token not valid")
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${Cookies.get("split.money.token")}`,
                }
            }
            const responseUser = await api.post<ApiBase<User>>("/user/getByEmail", { email: email }, config)
            return responseUser.data.data
        }
        catch (error) {
            if (error instanceof AuthenticationError) {
                thunkAPI.dispatch(setUserIsAuthenticated(false))
            }
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const signInAsync = createAsyncThunk(
    'user/signInAsync',
    async (action: { email: string, password: string }, thunkApi) => {
        try {
            const response = await api.post<ApiBase<{ access_token: string, expiresIn: number }>>(
                "/auth/login",
                { email: action.email, password: action.password })
            if (response.data.codeError === "email-password/invalid" || response.data.statusCode === 400) {
                thunkApi.dispatch(setUserError("Email ou senha inválidas"))
                return;
            }
            if (!response.data.data)
                throw new Error()

            Cookies.set('split.money.token', response.data.data.access_token);
            const date = dayjs(response.data.data.expiresIn * 1000);
            Cookies.set('split.money.expiresAt', date.toISOString());

            thunkApi.dispatch(setUserIsAuthenticated(true));
            await thunkApi.dispatch(getUserByEmail(action.email));
            return response.data.data
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
            const user = {
                name: action.name,
                email: action.email,
                password: action.password,
                balance: 0,
                loginMethod: 'email'
            }
            const response = await api.post<ApiBase<User>>('/user', user)
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
            Cookies.remove('split.money.token');
            Cookies.remove('split.money.expiresAt')
            thunkApi.dispatch(setUserIsAuthenticated(false))
        }
        catch (error) {
            return thunkApi.rejectWithValue({ error })
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIsAuthenticated: (state, action: PayloadAction<boolean>) => { state.isAuthenticated = action.payload },
        setUserError: (state, action: PayloadAction<string>) => { state.error = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUserAsync.fulfilled, (state, action) => {
                state.user = action.payload as User;
            })
            .addCase(signOutAsync.fulfilled, (state) => {
                state.user = {} as User;
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                state.user = action.payload as User;
            })
            .addMatcher(action => action.type.endsWith('fulfilled'), state => {
                state.loading = false;
            })
            .addMatcher(action => action.type.endsWith('pending'), state => {
                state.loading = true;
            })
            .addMatcher(action => action.type.endsWith('rejected'), (state, action) => {
                state.loading = false;
                if (action.payload instanceof AuthenticationError) {
                    state.user = {} as User;
                    toast.error("Seu login expirou")
                    toast.clearWaitingQueue();
                    return;
                }
            })
    }
});

export const { setUserIsAuthenticated, setUserError } = userSlice.actions;

export default userSlice.reducer;