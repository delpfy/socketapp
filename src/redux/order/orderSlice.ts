import {  createSlice } from "@reduxjs/toolkit";
import {  TLocationCity } from "../types";
import { getLocations, getNovaPoshtaLocations, getUkrPoshtaLocations } from "./asyncActions";

const orderSlice = createSlice({
  name: "reviews",
  initialState: {
    location: {
      data: [{}],
    } as TLocationCity,

    novaPoshtaLocation: {},
    ukrPoshtaLocation: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.location = action.payload;
    });
    builder.addCase(getLocations.pending, (state) => {});
    builder.addCase(getLocations.rejected, (state) => {});

    builder.addCase(getNovaPoshtaLocations.fulfilled, (state, action) => {
      state.novaPoshtaLocation = action.payload;
    });
    builder.addCase(getNovaPoshtaLocations.pending, (state) => {});
    builder.addCase(getNovaPoshtaLocations.rejected, (state) => {});

    builder.addCase(getUkrPoshtaLocations.fulfilled, (state, action) => {
        state.ukrPoshtaLocation = action.payload;
      });
      builder.addCase(getUkrPoshtaLocations.pending, (state) => {});
      builder.addCase(getUkrPoshtaLocations.rejected, (state) => {});
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
