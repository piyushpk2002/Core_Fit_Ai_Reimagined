import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    userData: null,
    state: "",
    userTodo: [],
    user: null
}

export const registerUser = createAsyncThunk('/auth/register', async(userData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,
        userData,
        { withCredentials: true }
    )
    return response.data;
})

export const loginUser = createAsyncThunk('/auth/login', async (userData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,
        userData,
        { withCredentials: true}
    )
    return response.data;
})

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,
    {},
    {
        withCredentials: true
    })
    return response.data;
})

export const checkAuth = createAsyncThunk('/auth/check-auth', async () =>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/check-auth`,
    {
        withCredentials: true,
        headers: {
            "Cache-Control" : 'no-store, no-cache, must-revalidate, proxy-revalidate', Expires: '0'
        }
    })
    return response.data;
})

export const updateUserData = createAsyncThunk('/auth/update', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/update/${data.user._id}`,
        data.userData,
        { withCredentials: true }
    )
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateData : (state, action) => {
            state.userData = action.payload
        },
        setState: (state, actions) => {
            state.state = actions.payload;
        },
        setUserTodo: (state, action) =>{
            state.userTodo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false,
            state.isAuthenticated = true,
            state.user = action.payload.data
        }).addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false,
            state.user = null,
            state.isAuthenticated = false
        }).addCase(checkAuth.fulfilled, (state, actions) => {
            state.isLoading = false,
            state.user = actions?.payload?.success ? actions.payload.data : null,
            state.isAuthenticated = actions?.payload?.success
        }).addCase(updateUserData.fulfilled, (state, action) =>{
            state.isLoading = false,
            state.userData = action.payload.data,
            console.log(action.payload);
        })
    }
})

export const { setState, updateData, setUserTodo} = authSlice.actions;
export default authSlice.reducer;
