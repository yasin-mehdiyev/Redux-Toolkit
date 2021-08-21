import { createSlice } from '@reduxjs/toolkit';

const initialAdminState = { productById: {}, searchFindData: [], isShownSearch: false };

const uiSlice = createSlice({
    name: 'admin',
    initialState: initialAdminState,
    reducers: {
        setProduct (state, action) {
            state.productById = {
                id: action.payload.id,
                title: action.payload.title,
                quantity: Number(action.payload.quantity),
                price: Number(action.payload.price),
                totalAmount: Number(action.payload.totalAmount),
                desc: action.payload.desc,
            }
        },
        setSearchData (state, action) {
            state.searchFindData = action.payload;
        },
        setShowSearch (state, action) {
            state.isShownSearch = action.payload;
        }
    }
});

export const { setProduct, setSearchData, setShowSearch } = uiSlice.actions;

export default uiSlice.reducer;