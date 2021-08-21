import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    data: [],
    items: [],
    totalQuantity: 0,
    isChangedCart: false,
}

const uiSlice = createSlice({
    name: 'cart',
    initialState : initialCartState,
    reducers: {
        setInitialData (state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity
        },
        addToCart (state, action) {
            let newItem = action.payload;
            let existingItem = state.items?.find(item => item?.id === newItem?.id);

            if(!existingItem){
                state.totalQuantity = state.totalQuantity + 1;
                if(state.items === undefined){
                    state.items = [];
                }
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    quantity: newItem.quantity,
                    totalAmount: newItem.totalAmount,
                    price: newItem.price,
                    desc: newItem.desc,
                });
                state.isChangedCart = true;
            }
            else{
                alert('This Product is exist in your cart');
                state.isChangedCart = false;
            }
        },
        addItem (state, action) {
            let newItem = action.payload;
            let existingItem = state.items.find(item => item.id === newItem.id);
            existingItem.quantity++;
            state.isChangedCart = true;
            existingItem.totalAmount = existingItem.quantity * existingItem.price;
        },
        removeItem (state, action) {
            let newItemId = action.payload;
            let findItemById = state.items.find(item => item.id === newItemId);
            state.isChangedCart = true;

            if(findItemById.quantity === 1) {
                state.totalQuantity--;
                state.items = state.items.filter(item => item.id !== newItemId);
            }
            else{
                findItemById.quantity--;
                findItemById.totalAmount = findItemById.totalAmount - findItemById.price;
            }
        },
    }
});

export const { setInitialData, addToCart, addItem, removeItem } = uiSlice.actions;

export default uiSlice.reducer;