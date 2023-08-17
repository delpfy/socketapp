import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { Items, ItemsDisplay, ItemsPOST, TShippingItems } from "../types";

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
  { items: Items } | { items: TShippingItems },
  { itemId: string; params: {} }
>("home/updateItem", async (params) => {
  const { data } = await axios.patch<
    { items: Items } | { items: TShippingItems }
  >(`/items/${params.itemId}`, params.params, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return data;
});

export const createItem = createAsyncThunk<
  { item: Items } | { item: TShippingItems },
  ItemsPOST
>("home/createItem", async (params) => {
  const { data } = await axios.post<
    { item: Items } | { item: TShippingItems }
  >(`/items/`, params, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return data;
});
