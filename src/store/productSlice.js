import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "product-paginated",
    async(page, thunkApi) => {
        try{
            const res = await axios.get(`http://localhost:32500/product/get-products?page=${page}&size=8`)
            return {data: res.data, page: page};
        }catch(error) {
            if(axios.isAxiosError(error)) {
                return thunkApi.rejectWithValue(error.response.data.message);
            }else {
                return thunkApi.rejectWithValue("Unknown Error");
            }
        }
    }
)

const initialState = {
    products: {},
    loading: false,
    errorMessage: null,
    lastPage: 0
};


const productSlice = createSlice({
    name: "product-slice",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(getProduct.fulfilled, (state, action) => {
            const products = [...action.payload.data]
            const tmpProducts = {...state.products}
            // console.log(tmpProducts);
            
            products.forEach(ele => tmpProducts[ele.id] = ele)
            state.products = tmpProducts;
            state.loading = false;
            state.lastPage = action.payload.page;
            
        }),
        builder.addCase(getProduct.rejected, (state, action) => {
            state.errorMessage = action.payload;
        })
    }
});

export const productReducer = productSlice.reducer;