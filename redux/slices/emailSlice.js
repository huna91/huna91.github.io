import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email_address: "",
};

const emailSlice = createSlice({
  name: "email_data",
  initialState,
  reducers: {
    reset_add: (state, action) => {
      state.email_address = "";
    },
    save_add: (state, action) => {
      state.email_address = action.payload;
    },
  },
});

export default emailSlice;
export const { reset_add, save_add } = emailSlice.actions;
