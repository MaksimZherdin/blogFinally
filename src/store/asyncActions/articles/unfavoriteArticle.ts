import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const unfavoriteArticle = createAsyncThunk(
  "article/unFavoriteArticle",
  async (slug: string | undefined) => {
    const res = $api.delete(`/articles/${slug}/favorite`).then((res) => res);
    return res;
  }
);
export default unfavoriteArticle;
