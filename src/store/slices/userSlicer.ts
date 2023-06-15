import { createSlice } from "@reduxjs/toolkit";

import registerUser from "../asyncActions/auth/regUser";
import getUser from "../asyncActions/auth/getUser";
import profilePic from "../../assets/img/Rectangle 1.svg";
import logUser from "../asyncActions/auth/logUser";
import updateUser from "../asyncActions/auth/putUser";

const isAuth = localStorage.getItem("token");

const initialState = {
  username: null,
  email: null,
  token: null,
  isAuth: !!isAuth,
  image: profilePic,
  error: null,
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      localStorage.clear();
      state.username = null;
      state.email = null;
      window.location.reload();
    },
  },
  extraReducers: {
    [registerUser.fulfilled.type]: (state, action) => {
      if (action.payload.data === undefined) {
        state.error = action.payload.response.data;
      } else {
        const { email, username, token } = action.payload.data.user;
        state.email = email;
        state.username = username;
        localStorage.setItem("token", token);
      }
    },
    [getUser.fulfilled.type]: (state, action) => {
      const { username, email, image } = action.payload.data.user;
      state.email = email;
      state.username = username;
      if (image) {
        state.image = image;
      }
    },
    [logUser.fulfilled.type]: (state, action) => {
      if (action.payload.data === undefined) {
        state.error = action.payload.response.data;
      } else {
        const { email, username, token } = action.payload.data.user;
        localStorage.setItem("token", token);
        state.email = email;
        state.username = username;
        window.location.reload();
      }
    },
    [updateUser.fulfilled.type]: (state, action) => {
      if (action.payload.data === undefined) {
        state.error = action.payload.response.data;
      } else {
        state.image = action.payload.data.user.image;
        window.location.reload();
      }
    },
  },
});
export const { logOut } = userSlicer.actions;
export default userSlicer.reducer;
