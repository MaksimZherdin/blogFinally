import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "../../../https";

const updateUser = createAsyncThunk("user/put", async (user: object) => {
  const res = $api
    .put("/user", {
      user,
    })
    .then((res) => res)
    .catch((e) => e);
  return res;
});
export default updateUser;
