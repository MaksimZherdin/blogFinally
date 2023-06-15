import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const createArticle = createAsyncThunk(
  "article/createArticle",
  async (body: object) => {
    const res = $api.post("/articles", body).then((res) => res);
    return res;
  }
);
export default createArticle;
