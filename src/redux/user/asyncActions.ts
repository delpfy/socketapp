import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

import { UserDisplay, UserLogin, UserRegister, UserUpdate } from "../types";

export const checkAuthorization = createAsyncThunk<UserDisplay>(
  "home/checkAuthorization",
  async function () {
    const { data } = await axios.get<UserDisplay>(`/authme`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const Update = createAsyncThunk<{ success: string }, UserUpdate>(
  "home/Update",
  async function (params) {
    const { data } = await axios.patch<{ success: string }>(`/update`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    return data;
  }
);

export const UploadAvatar = createAsyncThunk<{ url: string }, any>(
  "home/UploadAvatar",
  async function (params) {
    const { data } = await axios.post<{ url: string }>(`/upload`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    return data;
  }
);

export const Authorize = createAsyncThunk<
  { success: string; token: string },
  UserLogin
>("home/Authorize", async function (params) {
  const { data } = await axios.post<{ success: string; token: string }>(
    `/authorize`,
    params
  );
  return data;
});

export const Register = createAsyncThunk<
  { success: string; token: string },
  UserRegister
>("home/Register", async function (params) {
  const { data } = await axios.post<{ success: string; token: string }>(
    `/register`,
    params
  );

  return data;
});
