import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { Category, Items, ItemsDisplay, TShippingItems } from "../types";

export const UploadItemImage = createAsyncThunk<[any], FormData>(
  "home/UploadItemImage",
  async function (formData) {
    const { data } = await axios.post<[any]>(`/upload`, formData, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });

    return data;
  }
);

export const getAllItems = createAsyncThunk<ItemsDisplay>(
  "home/getAllItems",
  async function () {
    const { data } = await axios.get<ItemsDisplay>(`/items`);
    return data;
  }
);

export const getAllCategories = createAsyncThunk<any[]>(
  "category/getAllCategories",
  async (params) => {
    const { data } = await axios.get<any[]>("/categories");
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

export const searchCategories = createAsyncThunk<any, string>(
  "home/searchCategories",
  async function (params) {
    const { data } = await axios.get<any>(`/categories/search/${params}`);
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

export const getItemBySlug = createAsyncThunk<Items, string>(
  "home/getItemBySlug",
  async (params) => {
    const { data } = await axios.get<Items>(`/items/slug/${params}`);
    return data;
  }
);

export const getCategoryBySlug = createAsyncThunk<Items, string>(
  "home/getCategoryBySlug",
  async (params) => {
    const { data } = await axios.get<Items>(`/categories/slug/${params}`);
    return data;
  }
);

export const checkItemById = createAsyncThunk<Items, string>(
  "home/checkItemById",
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

export const updateItemFields = createAsyncThunk<
  { items: Items } | { items: TShippingItems },
  { itemId: string; params: {} }
>("home/updateItemFields", async (params) => {
  const { data } = await axios.patch<
    { items: Items } | { items: TShippingItems }
  >(`/items/update/${params.itemId}`, params.params, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return data;
});

export const deleteItem = createAsyncThunk<any, { itemId: string }>(
  "home/deleteItem",
  async (params) => {
    const { data } = await axios.delete<any>(`/items/${params.itemId}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const createItem = createAsyncThunk<
  { item: Items } | { item: TShippingItems },
  any
>("home/createItem", async (params) => {
  const { data } = await axios.post<{ item: Items } | { item: TShippingItems }>(
    `/items/`,
    params,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});
