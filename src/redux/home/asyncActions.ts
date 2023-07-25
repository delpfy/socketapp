import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { ItemDisplay, Items, ItemsDisplay, ShippingItems, ShippingItemsDisplay } from "../types";

export const getAllItems = createAsyncThunk<ItemsDisplay>(
  "home/getAllItems",
  async function () {
    const { data } = await axios.get<ItemsDisplay>(`/items`);
    return data;
  }
);

export const getItemsByCategory = createAsyncThunk<ItemsDisplay, string>(
  "home/getItemsByCategory",
  async (params) => {
    const { data } = await axios.get<ItemsDisplay>(
      `/items/category/${params}`
    );
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

export const updateItem = createAsyncThunk<{item: Items} | {item: ShippingItems}, {itemId: string, params: {}}>(
  "home/updateItem",
  async (params) => {
    const { data } = await axios.patch<{item: Items} | {item: ShippingItems}>(`/items/${params.itemId}`, params.params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);


