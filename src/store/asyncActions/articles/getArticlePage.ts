import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const getArticlePage = createAsyncThunk(
  "article/getArticlePage",
  async (slug: string | undefined) => {
    const res = $api.get(`/articles/${slug}`).then((res) => res);
    return res;
  }
);

export default getArticlePage;
