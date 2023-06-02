import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    formData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { formData } = userSlice.actions;

export default userSlice.reducer;
