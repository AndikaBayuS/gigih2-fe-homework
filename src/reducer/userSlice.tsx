import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: "",
    display_name: "",
    images: [{ url: "" }],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
