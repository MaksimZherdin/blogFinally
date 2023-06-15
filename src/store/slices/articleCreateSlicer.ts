import { createSlice } from "@reduxjs/toolkit";

import createArticle from "../asyncActions/articles/createArticle";

interface IArticle {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
}

interface IState {
  article: IArticle;
}

const initialState: IState = {
  article: {},
};

export const articleCreateSlicer = createSlice({
  name: "articleCreateSlicer",
  initialState,
  reducers: {},
  extraReducers: {
    [createArticle.fulfilled.type]: () => {
      window.location.reload();
    },
  },
});

export default articleCreateSlicer.reducer;
