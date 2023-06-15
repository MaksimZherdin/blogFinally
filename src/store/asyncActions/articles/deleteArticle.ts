import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (slug: string | undefined) => {
    const res = $api.delete(`/articles/${slug}`).then((res) => res);
    return res;
  }
);
export default deleteArticle;
