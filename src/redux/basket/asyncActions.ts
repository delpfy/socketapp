import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  ShippingItemDisplay,
  ShippingItems,
  ShippingItemsDisplay,
} from "../types";

export const getAllBasketItems = createAsyncThunk<ShippingItemsDisplay>(
  "home/getAllBasketItems",
  async function () {
    const { data } = await axios.get<ShippingItemsDisplay>(`/basketitems`);
    return data;
  }
);

export const getBasketItemsByUser = createAsyncThunk<
  ShippingItemsDisplay,
  string
>("home/getBasketItemsByUser", async (params) => {

  const { data } = await axios.get<ShippingItemsDisplay>(
    `/basketitems/user/${params}`,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const getBasketItemById = createAsyncThunk<ShippingItemDisplay, string>(
  "home/getBasketItemById",
  async (params) => {
    const { data } = await axios.get<ShippingItemDisplay>(
      `/basketitems/${params}`,
      {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  }
);

export const addBasketItem = createAsyncThunk<"", ShippingItems>(
  "home/addBasketItem",
  async (params) => {
    const { data } = await axios.post(`/basketitems`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    console.log("DATA 34" + data);
    return data;
  }
);

export const removeBasketItem = createAsyncThunk<"", ShippingItems>(
  "home/removeBasketItem",
  async (params) => {


    const { data } = await axios.delete(`/basketitems/${params._id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const deleteBasketItem = createAsyncThunk<"", ShippingItems>(
  "home/deleteBasketItem",
  async (params) => {

    const { data } = await axios.delete(`/basketitems/remove/${params._id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    console.log("DATA 34" + data);
    return data;
  }
);
