import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
    name: "index",
    initialState: 0,
    reducers:{
        increaseIndex: (state) => state+1
    }
})

export const {increaseIndex} = indexSlice.actions;

export default indexSlice.reducer;