import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

import { User, UserDisplay, UserLogin, UserRegister, UserUpdate } from "../types";

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

export const Update = createAsyncThunk<{ success: string }, {}>(
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
  { success: string; token: string; emailConfirmationToken: string },
  UserRegister
>("home/Register", async function (params) {
  const { data } = await axios.post<{
    success: string;
    token: string;
    emailConfirmationToken: string;
  }>(`/register`, params);

  return data;
});

export const newsletterUnsub = createAsyncThunk<
any,
any
>("home/newsletterUnsub", async function (params) {
const { data } = await axios.post<any>(`/unsubscribe`, params);

return data;
});

export const ResetPassword = createAsyncThunk<
  { success: string; token: string },
  { email: string }
>("home/ResetPassword", async function (params) {
  const { data } = await axios.post<{ success: string; token: string }>(
    `/reset-password`,
    params
  );

  return data;
});

export const confirmEmail = createAsyncThunk<
  { success: string },
  { token: string }
>("home/confirmEmail", async function (params) {
  const { data } = await axios.get<{ success: string; token: string }>(
    `/confirm-email?token=${params.token}`
  );

  return data;
});

export const UpdatePassword = createAsyncThunk<
  { success: string },
  { email: string; password: string }
>("home/UpdatePassword", async function (params) {
  const { data } = await axios.patch<{ success: string }>(
    `/update-password`,
    params
  );

  return data;
});
