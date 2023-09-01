import { api } from '@/data/axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Cookies from "js-cookie"

interface UserSignup {
    name: string,
    email: string,
    password: string,
}

const initialState = {
    user: {} as User,
    loading: false,
    isAuthenticated: false,
};

export const getUserByEmail = createAsyncThunk(
    'user/getUserByEmail',
    async (action: { email: string }, thunkAPI) => {
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
            const responseUser = await api.post<ApiBase<User>>("/user/getByEmail", { email: action.email }, config)
            return responseUser.data.data
        }
        catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const signInAsync = createAsyncThunk(
    'user/signInAsync',
    async (action: { email: string, password: string }, thunkApi) => {
        try {
            const response = await api.post<ApiBase<{ access_token: string, expiresIn: number }>>("/auth/login",
                { email: action.email, password: action.password })
            if (!response.data.data)
                throw new Error()

            Cookies.set('split.money.token', response.data.data.access_token, { expires: 7 });
            const date = dayjs(response.data.data.expiresIn * 1000);
            Cookies.set('split.money.expiresAt', date.toISOString(), { expires: 7 });
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
        setUserIsAuthenticated: (state, action: PayloadAction<boolean>) => { state.isAuthenticated = action.payload }
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

export const { setUserIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;