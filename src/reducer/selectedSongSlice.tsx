import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  uri: [] as string[],
};

export const selectedSongSlice = createSlice({
  name: "selectedSong",
  initialState,
  reducers: {
    setSelectedSong: (state, action: PayloadAction<string[]>) => {
      state.uri = action.payload;
    },
    clearSelectedSong: (state) => {
      state.uri = [];
    },
  },
});

export const { setSelectedSong, clearSelectedSong } = selectedSongSlice.actions;
export default selectedSongSlice.reducer;
