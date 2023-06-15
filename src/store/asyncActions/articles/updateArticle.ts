import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (data: any) => {
    const res = $api
      .put(`/articles/${data.slug}`, data.article)
      .then((res) => res);
    return res;
  }
);
export default updateArticle;
