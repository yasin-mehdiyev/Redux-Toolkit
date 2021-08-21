import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice';
import cartReducer from '../features/cart/cartSlice';
import adminReducer from '../features/admin/adminSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        admin: adminReducer,
    }
});

export default store;