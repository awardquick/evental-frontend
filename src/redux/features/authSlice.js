import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth_details",
  initialState: {
    details: localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
