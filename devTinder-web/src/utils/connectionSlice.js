import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers:{
        addConnections: (state, action) => action.payload,
        removeOneConnection: (state, action)=>{
            const newConnectionList = state.filter((user) => user._id !== action.payload)
            return newConnectionList
        },
        removeConnections: () => null
    }
})

export const {addConnections, removeOneConnection, removeConnections} = connectionSlice.actions;

export default connectionSlice.reducer;