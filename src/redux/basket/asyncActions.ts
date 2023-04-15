import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IBasketItemDisplay, IBasketItems, IBasketItemsDisplay } from "../types";

export const getAllBasketItems = createAsyncThunk<IBasketItemsDisplay>(
  "home/getAllBasketItems",
  async function () {
    console.log("DATA " + 1);
    const { data } = await axios.get<IBasketItemsDisplay>(`/basketitems`);
    console.log("DATA " + data);
    return data;
  }
);

export const getBasketItemByUser = createAsyncThunk<IBasketItemsDisplay, string>(
  "home/getBasketItemByUser",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is id.
    const { data } = await axios.get<IBasketItemsDisplay>(`/basketitems/user/${params}`, {
      headers: {'authorization': `Bearer ${window.localStorage.getItem('token')}` }
    });
    console.log("DATA " + data);
    return data;
  }
);

export const getBasketItemById = createAsyncThunk<IBasketItemDisplay, string>(
  'home/getBasketItemById',
  async (params) => {
      console.log("DATA " + 1);
      console.log("Params " + params) // Here is Id.
      const {data} = await axios.get<IBasketItemDisplay>(`/basketitems/${params}`, {
        headers: {'authorization': `Bearer ${window.localStorage.getItem('token')}` }
      });
      console.log("DATA " + data);
      return data;
  }
);

export const addBasketItem = createAsyncThunk<"", IBasketItems>(
  "home/addBasketItem",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is item.

    const { data } = await axios.post(`/basketitems`, params, {
      headers: {'authorization': `Bearer ${window.localStorage.getItem('token')}` }
    });
    console.log("DATA 34" + data);
    return data;
  }
);
