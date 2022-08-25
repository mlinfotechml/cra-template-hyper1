import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  isLoggedIn: boolean | null;
};

const initialState: SliceState = {
  isLoggedIn: null,
};

const slice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {setLoggedIn} = slice.actions;

// Reducer
export default slice.reducer;