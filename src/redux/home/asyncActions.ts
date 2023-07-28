import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { Items, ItemsDisplay, TShippingItems } from "../types";

export const getAllItems = createAsyncThunk<ItemsDisplay>(
  "home/getAllItems",
  async function () {
    const { data } = await axios.get<ItemsDisplay>(`/items`);
    return data;
  }
);

export const searchItems = createAsyncThunk<ItemsDisplay, string>(
  "home/searchItems",
  async function (params) {
    const { data } = await axios.get<ItemsDisplay>(`/items/search/${params}`);
    return data;
  }
);

export const getItemsByCategory = createAsyncThunk<ItemsDisplay, string>(
  "home/getItemsByCategory",
  async (params) => {
    const { data } = await axios.get<ItemsDisplay>(`/items/category/${params}`);
    return data;
  }
);

export const getItemById = createAsyncThunk<Items, string>(
  "home/getItemById",
  async (params) => {
    const { data } = await axios.get<Items>(`/items/${params}`);
    return data;
  }
);

export const updateItem = createAsyncThunk<
  { item: Items } | { item: TShippingItems },
  { itemId: string; params: {} }
>("home/updateItem", async (params) => {
  const { data } = await axios.patch<
    { item: Items } | { item: TShippingItems }
  >(`/items/${params.itemId}`, params.params, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return data;
});
