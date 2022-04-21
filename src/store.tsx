import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducer/tokenSlice";
import selectedSongReducer from "./reducer/selectedSongSlice";
import userReducer from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    selectedSong: selectedSongReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
