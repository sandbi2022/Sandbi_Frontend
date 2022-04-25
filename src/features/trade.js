import {createSlice} from "@reduxjs/toolkit";


export const tradeSlice= createSlice({
    name:"trade",
    initialState:{value:{
        TID:"",
        TradePair:"",
        Seller:"",              
    }},
    reducers:{
        Pend:(state,action)=>{
            state.value= action.payload
        },
    }
})
export const {Pend}= tradeSlice.actions;
export default tradeSlice.reducer;