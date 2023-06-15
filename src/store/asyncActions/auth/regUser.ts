import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const registerUser = createAsyncThunk("user/reg", async (users: object) => {
  const res = await $api
    .post("/users", users)
    .then((res) => res)
    .catch((e) => e);
  return res;
});
export default registerUser;
