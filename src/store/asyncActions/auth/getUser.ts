import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const getUser = createAsyncThunk("user/get", async () => {
  const res = $api.get("/user").then((res) => res);
  return res;
});
export default getUser;
