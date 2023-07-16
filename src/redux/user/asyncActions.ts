import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { UserDisplay, UserLogin, UserRegister } from "../types";

export const checkAuthorization = createAsyncThunk<UserDisplay>(
  "home/checkAuthorization",
  async function () {
    const { data } = await axios.get<UserDisplay>(`/authme`, {
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
  UserLogin
>("home/Authorize", async function (params) {
  console.log("DATA " + 1);
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
  console.log("DATA " + 1);
  const { data } = await axios.post<{ success: string; token: string }>(
    `/register`,
    params
  );
  console.log("DATA " + data);
  return data;
});
