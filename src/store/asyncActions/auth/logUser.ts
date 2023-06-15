import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const logUser = createAsyncThunk("user/log", async (user: object) => {
  const res = $api
    .post("/users/login", user)
    .then((res) => res)
    .catch((e) => e);
  return res;
});

export default logUser;
