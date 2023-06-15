import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const getArticles = createAsyncThunk(
  "article/getArticles",
  async (num: number) => {
    const res = $api
      .get(`/articles?limit=5&offset=${num * 5}`)
      .then((res) => res);
    return res;
  }
);
export default getArticles;
