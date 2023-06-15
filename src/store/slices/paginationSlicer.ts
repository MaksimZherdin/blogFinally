import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
};

export const paginationSlicer = createSlice({
  name: "paginationSlicer",
  initialState,
  reducers: {
    setPage(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: {},
});
export const { setPage } = paginationSlicer.actions;
export default paginationSlicer.reducer;
