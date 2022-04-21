import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducer/tokenSlice";
import selectedSongReducer from "./reducer/selectedSongSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    selectedSong: selectedSongReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
