import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { TLocationCity, TOrder, TOrders } from "../types";

export const getAllOrders = createAsyncThunk<any>(
  "home/getAllOrders",
  async function () {
    const { data } = await axios.get<any>(`/orders`);
    return data;
  }
);

export const getOrdersByUser = createAsyncThunk<TOrders, string>(
  "home/getOrdersByUser",
  async (params) => {
    const { data } = await axios.get<any>(`/orders/user/${params}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const addOrder = createAsyncThunk<TOrders, TOrder>(
  "home/addOrder",
  async (params) => {
    const { data } = await axios.post(`/orders`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    console.log("DATA 34" + data);
    return data;
  }
);



export const removeOrder = createAsyncThunk<"", any>(
  "home/removeOrder",
  async (params) => {
    const { data } = await axios.delete(`/orders/${params._id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const getLocations = createAsyncThunk<any, { city: string }>(
  "orders/getLocations",
  async (params) => {
    const { city } = params;
    const query = encodeURIComponent(city);
    const { data } = await axios.get<any>(
      `https://nominatim.openstreetmap.org/search?countrycodes=UA&city=${params.city}&format=json&limit=30`,
      {
        headers: {
          "Accept-Language": "uk-UA",
        },
      }
    );
    return data;
  }
);

export const getStreets = createAsyncThunk<
  any,
  { city: string; searchValue: string }
>("orders/getStreets", async (params) => {
  const { city } = params;
  const query = encodeURIComponent(city);
  const { data } = await axios.get<any>(
    `https://nominatim.openstreetmap.org/search?country=Ukraine&city=${params.city}&street=${params.searchValue}&format=json&limit=30`,
    {
      headers: {
        "Accept-Language": "uk-UA",
      },
    }
  );
  return data;
});

export const getNovaPoshtaLocations = createAsyncThunk<
  any,
  { city: string; searchValue: string }
>("orders/getNovaPoshtaLocations", async (params) => {
  const { data } = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
    apiKey: "5d01301bf2df2e22fdad66e5428dba0d",
    modelName: "AddressGeneral",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityName: params.city,
      Limit: 15,
      FindByString: params.searchValue ? params.searchValue : "",
    },
  });

  return data;
});

export const getUkrPoshtaLocations = createAsyncThunk<
  any,
  { city: string; searchValue: string }
>("orders/getUkrPoshtaLocations", async (params) => {
  const { data } = await axios.get("https://api.novaposhta.ua/v2.0/json/", {
    params: {
      apiKey: "5d01301bf2df2e22fdad66e5428dba0d",
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: "Киев",
        Limit: 5,
      },
    },
  });

  return data;
});
