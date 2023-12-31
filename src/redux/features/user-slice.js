import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { BACK_URL } = process.env;

const initialState = {
  token: "",
  role: "",
  error: "",
};

export const loginUser = createAsyncThunk("user/loginUser", async (body) => {
  console.log(body);
  const res = await axios.post(
    "https://dulcina-backend.onrender.com/admin/login",
    body
  );
  if (res.data.user.role == "admin") {
    console.log(res.data);
    return res.data;
  }
  return res.data;
});

export const user = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default user.reducer;
