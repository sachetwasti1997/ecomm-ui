import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
  "fetch-user-details",
  async (token, thunkApi) => {

    try {
      const res = await axios.get("http://localhost:32000/user/fetch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue("Unauthorized");
      }
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user-sign-up",
  async (user, thunkApi) => {
    try {
      const res = await axios.post("http://localhost:32000/user/signup", user);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errors = "";
        if (error.response.data.errors) {
          errors = error.response.data.errors.join(",");
        } else if (error.response.data.message) {
          errors = error.response.data.message;
        }
        return thunkApi.rejectWithValue(errors);
      } else {
        return thunkApi.rejectWithValue("Unknown error occured!");
      }
    }
  }
);

export const userLogIn = createAsyncThunk(
  "user-log-up",
  async (loginRequest, thunkApi) => {
    try {
      const res = await axios.post(
        "http://localhost:32000/user/login",
        loginRequest
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errors = "";
        if (error.response.data.errors) {
          errors = error.response.data.errors.join(",");
        } else if (error.response.data.message) {
          errors = error.response.data.message;
        }
        return thunkApi.rejectWithValue(errors);
      } else {
        return thunkApi.rejectWithValue("Unknown error occured!");
      }
    }
  }
);

const intialState = {
  signedUp: false,
  signUpMessage: null,
  token: null,
  loading: false,
  error: null,
  loggedIn: false
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: intialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignUp.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(userSignUp.fulfilled, (state, action) => {
        state.signedUp = true;
        state.loading = false;
        state.signUpMessage = action.payload;
      }),
      builder.addCase(userSignUp.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder.addCase(userLogIn.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(userLogIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.loggedIn = true;
        localStorage.setItem('token', action.payload)
      }),
      builder.addCase(userLogIn.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.token = action.payload;
    }),
      builder.addCase(getUserDetails.rejected, (state, action) => {
        state.token = null;
        state.signedUp = false;
        state.signUpMessage = false;
        state.loggedIn = false;
        localStorage.setItem("token", '');
      });
  },
});

export const { removeError, setUserToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
