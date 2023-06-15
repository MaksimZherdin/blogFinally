import { createSlice } from "@reduxjs/toolkit";

import getArticles from "../asyncActions/articles/getArticles";
import favoriteArticle from "../asyncActions/articles/favoriteArticle";
import unfavoriteArticle from "../asyncActions/articles/unfavoriteArticle";

const initialState = {
  articles: [],
  isLoading: true,
  favLoading: false,
};

export const articleSlicer = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getArticles.fulfilled.type]: (state, action) => {
      state.articles = action.payload.data.articles;
      state.isLoading = false;
    },
    [getArticles.pending.type]: (state) => {
      state.isLoading = true;
    },
    [favoriteArticle.fulfilled.type]: (state) => {
      state.favLoading = false;
    },
    [favoriteArticle.pending.type]: (state) => {
      state.favLoading = true;
    },
    [unfavoriteArticle.pending.type]: (state) => {
      state.favLoading = true;
    },
    [unfavoriteArticle.fulfilled.type]: (state) => {
      state.favLoading = false;
    },
  },
});

export default articleSlicer.reducer;
