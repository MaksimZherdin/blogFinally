import { createSlice } from "@reduxjs/toolkit";

import getArticlePage from "../asyncActions/articles/getArticlePage";

interface IAuthor {
  username: string;
  image: string;
}
interface IArticle {
  title?: string;
  body?: string;
  description?: string;
  tagList?: [];
  author?: IAuthor;
  favoritesCount?: number | undefined;
  createdAt?: string;
  favorited?: boolean | undefined;
}

interface IArticlePage {
  article: IArticle;
  isLoading: boolean;
}

const initialState: IArticlePage = {
  article: {},
  isLoading: true,
};

export const articlePageSlicer = createSlice({
  name: "articlePageSlicer",
  initialState,
  reducers: {
    clearArticlePage(state) {
      state.article = {};
    },
  },
  extraReducers: {
    [getArticlePage.fulfilled.type]: (state, action) => {
      state.article = action.payload.data.article;
      state.isLoading = false;
    },
    [getArticlePage.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getArticlePage.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { clearArticlePage } = articlePageSlicer.actions;
export default articlePageSlicer.reducer;
