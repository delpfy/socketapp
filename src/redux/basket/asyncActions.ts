import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IBasketItems, IBasketItemsDisplay } from "../types";

export const getAllBasketItems = createAsyncThunk<IBasketItemsDisplay>(
  "home/getAllBasketItems",
  async function () {
    console.log("DATA " + 1);
    const { data } = await axios.get<IBasketItemsDisplay>(`/basketitems`);
    console.log("DATA " + data);
    return data;
  }
);

export const getBasketItemByUser = createAsyncThunk<IBasketItems, string>(
  "home/getBasketItemByUser",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is id.
    const { data } = await axios.get<IBasketItems>(`/basketitems/${params}`);
    console.log("DATA " + data);
    return data;
  }
);

export const addBasketItem = createAsyncThunk<"", IBasketItems>(
  "home/addBasketItem",
  async (params, { rejectWithValue }) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is item.

    const { data } = await axios.post(`/basketitems`, params);
    console.log("DATA 34" + data);
    return data;
  }
);
