import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  ShippingItemDisplay,
  TShippingItems,
  TShippingItemsDisplay,
} from "../types";

export const getAllBasketItems = createAsyncThunk<TShippingItemsDisplay>(
  "home/getAllBasketItems",
  async function () {
    const { data } = await axios.get<TShippingItemsDisplay>(`/basketitems`);
    return data;
  }
);

export const getBasketItemsByUser = createAsyncThunk<
  TShippingItemsDisplay,
  string
>("home/getBasketItemsByUser", async (params) => {
  const { data } = await axios.get<TShippingItemsDisplay>(
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

export const addBasketItem = createAsyncThunk<"", TShippingItems>(
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

export const removeBasketItem = createAsyncThunk<"", TShippingItems>(
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

export const deleteBasketItem = createAsyncThunk<"", TShippingItems>(
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
