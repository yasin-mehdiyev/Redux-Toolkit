import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice';
import cartReducer from '../features/cart/cartSlice';
import adminReducer from '../features/admin/adminSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        admin: adminReducer,
        auth: authReducer,
    }
});

export default store;