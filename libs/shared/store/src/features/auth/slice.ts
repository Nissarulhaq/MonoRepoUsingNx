import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
    token: "",
    user: null,
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<{
            token: string;
            isAuthenticated: boolean;
        }>) => {
            const { token, isAuthenticated } = action.payload;
            state.token = token;
            state.isAuthenticated = isAuthenticated;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            // Reset state to initial values
            state.token = "";
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;