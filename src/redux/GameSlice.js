import { createSlice } from "@reduxjs/toolkit";
import imageData from '../components/img.json'
const data=imageData.img;
export const gameSlice=createSlice({
    name:"game",
    initialState:{
        images:data,
        newImage:[]
    },
    reducers:{
        getImage:(state,action)=>{
            state.newImage=  [...state.images,...state.images]
            .sort(()=>Math.random()-0.5)
            .map((res)=>({...res,id:Math.random()}))
            
        }
    },
})
export const {getImage}=gameSlice.actions;
export default gameSlice.reducer;