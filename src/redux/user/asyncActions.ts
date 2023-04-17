import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IUserDisplay, IUserLogin, IUserRegister } from "../types";

export const checkAuthorization = createAsyncThunk<IUserDisplay>(
  "home/checkAuthorization",
  async function () {
    const { data } = await axios.get<IUserDisplay>(`/authme`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    console.log("DATA " + data);
    return data;
  }
);

export const Authorize = createAsyncThunk<
  { success: string; token: string },
  IUserLogin
>("home/Authorize", async function (params) {
  console.log("DATA " + 1);
  const { data } = await axios.post<{ success: string; token: string }>(
    `/authorize`,
    params
  );
  console.log("DATA " + data);
  return data;
});

export const Register = createAsyncThunk<
  { success: string; token: string },
  IUserRegister
>("home/Register", async function (params) {
  console.log("DATA " + 1);
  const { data } = await axios.post<{ success: string; token: string }>(
    `/register`,
    params
  );
  console.log("DATA " + data);
  return data;
});
