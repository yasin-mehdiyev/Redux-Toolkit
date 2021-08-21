import { createSlice } from '@reduxjs/toolkit';

const initialUIState = { isToggleCart: false, notifyEnum: '0', foods: [], loading: true };

// notifyEnum - 0 -> initial Value (default case).
// notifyEnum - 1 -> when it is exist error,It works catch block (error case).
// notifyEnum - 2 -> when it is great everything (success case).

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        toggleHandler (state) {
            state.isToggleCart = !state.isToggleCart;
        },
        setNotifications (state, action) {
            state.notifyEnum = action.payload;
        },
        setFoods (state, action) {
            state.foods = action.payload;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
    }
});

export const { toggleHandler, setNotifications, setFoods, setLoading } = uiSlice.actions;

export default uiSlice.reducer;