import {  PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  TLocationCity, TLocationNova } from "../types";
import { getLocations, getNovaPoshtaLocations, getUkrPoshtaLocations } from "./asyncActions";

const orderSlice = createSlice({
  name: "reviews",
  initialState: {
    locations: {
      data: [{}],
    } as TLocationCity,

    city: "",

    novaPoshtaLocations: {
      data:[{}]
    } as TLocationNova,
    ukrPoshtaLocations: {},

    location: "",
    novaPoshtaLocation: "",
    ukrPoshtaLocation: "",
    totalExpences: 0,
    user_contact: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    }
  },

  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setNovaPoshtaLocation(state, action: PayloadAction<string>) {
      state.novaPoshtaLocation = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setTotalExpences(state, action: PayloadAction<number>) {
      state.totalExpences = action.payload;
      console.log(state.totalExpences);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
    });
    builder.addCase(getLocations.pending, (state) => {});
    builder.addCase(getLocations.rejected, (state) => {});

    builder.addCase(getNovaPoshtaLocations.fulfilled, (state, action) => {
      state.novaPoshtaLocations = action.payload;
      console.log("!!!!")
      console.log(state.novaPoshtaLocations);
      console.log("!!!!")
    });
    builder.addCase(getNovaPoshtaLocations.pending, (state) => {});
    builder.addCase(getNovaPoshtaLocations.rejected, (state) => {});

    builder.addCase(getUkrPoshtaLocations.fulfilled, (state, action) => {
        state.ukrPoshtaLocations = action.payload;
      });
      builder.addCase(getUkrPoshtaLocations.pending, (state) => {});
      builder.addCase(getUkrPoshtaLocations.rejected, (state) => {});
  },
});

export const {setCity, setNovaPoshtaLocation, setLocation,setTotalExpences} = orderSlice.actions;
export default orderSlice.reducer;
