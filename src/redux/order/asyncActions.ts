import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { TLocationCity, TShippingItems, TShippingItemsDisplay } from "../types";

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

export const getLocations = createAsyncThunk<TLocationCity, { city: string }>(
  "orders/getLocations",
  async (params) => {
    const { data } = await axios.get<TLocationCity>(
      `https://api.sat.ua/study/hs/api/v1.0/main/json/getTowns?language=uk&searchString=${params.city.toLowerCase()}`
    );

    return data;
  }
);

export const getNovaPoshtaLocations = createAsyncThunk<
  any,
  { city: string; searchValue: string }
>("orders/getNovaPoshtaLocations", async (params) => {
  console.log("params.searchValue " + params.searchValue);
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
