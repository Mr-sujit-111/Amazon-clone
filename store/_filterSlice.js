import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "filter",
    initialState: {
        filterValue: "all"
    },
    reducers: {
        addSelectedFilter(state, action) {
            state.filterValue = action.payload;
        }
    },
});

export const { addSelectedFilter } = cartSlice.actions;
export const selectedFilter = (state) => state.filterValue;
export default cartSlice.reducer;
