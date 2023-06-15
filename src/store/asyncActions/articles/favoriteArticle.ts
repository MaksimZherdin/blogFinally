import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const favoriteArticle = createAsyncThunk(
  "article/favoriteArticle",
  async (slug: string | undefined) => {
    const res = $api.post(`/articles/${slug}/favorite`).then((res) => res);
    return res;
  }
);

export default favoriteArticle;
