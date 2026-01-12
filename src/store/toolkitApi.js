import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products",
  async (productId, thunkApi) => {
    const resp = await (
      await fetch(`https://dummyjson.com/product/${productId}`)
    ).json();
    return resp;
  }
);

const initialState = {
  products: [],
  status: undefined,
  error: undefined,
  loading: false,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload]; 
        state.status = "OK";
        state.loading = false;
      });
  },
});

export const productReducer = productSlice.reducer;

