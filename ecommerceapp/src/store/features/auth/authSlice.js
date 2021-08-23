import { createSlice } from '@reduxjs/toolkit';

const token = sessionStorage.getItem('token') !== null ? true : false;

const initialAuthStates = { token: null, isLoggedIn: token };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthStates,
    reducers: {
        setLogin (state, action) {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        setLogout (state) {
            state.token = null;
            state.isLoggedIn = false;
        },
    }
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;