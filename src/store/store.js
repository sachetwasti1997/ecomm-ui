import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { counterReducer } from "./counterSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: {
    productReducer,
    counterReducer,
    userReducer
  },
});
