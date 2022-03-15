import { configureStore } from "@reduxjs/toolkit";
import gameSlice  from "./GameSlice";

export const store=configureStore({
    reducer:{
        game:gameSlice,
    }
})