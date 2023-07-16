import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { ItemDisplay, ItemsDisplay } from "../types";

export const getAllItems = createAsyncThunk<ItemsDisplay>(
  "home/getAllItems",
  async function () {
    console.log("DATA " + 1);
    const { data } = await axios.get<ItemsDisplay>(`/items`);
    console.log("DATA " + data);
    return data;
  }
);

export const getItemsByCategory = createAsyncThunk<ItemsDisplay, string>(
  "home/getItemsByCategory",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is category.
    const { data } = await axios.get<ItemsDisplay>(
      `/items/category/${params}`
    );
    console.log("DATA " + data);
    return data;
  }
);

export const getItemById = createAsyncThunk<ItemDisplay, string>(
  "home/getItemById",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is Id.
    const { data } = await axios.get<ItemDisplay>(`/items/${params}`);
    console.log("DATA " + data);
    return data;
  }
);
