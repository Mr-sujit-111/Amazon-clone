import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        selectedItems: []
    },
    reducers: {
        addToCart(state, action) {
            state.items = [...state.items, action.payload];
        },
        removeToCart(state, action) {
            const index = state.items.findIndex(cartItem => cartItem.id === action.payload.id);

            let updatedCartList = [...state.items];

            if (index >= 0) {
                updatedCartList.splice(index, 1);
            }

            state.items = updatedCartList
        },
        addSelectedItem(state, action) {
            state.selectedItems = action.payload;
        }
    },
});

export const { addToCart, removeToCart, addSelectedItem } = cartSlice.actions;
export const selectedItems = (state) => state?.items;

export const totalPrice = (state) => state?.items.reduce((total, item) => total + item.price, 0);
export default cartSlice.reducer;
