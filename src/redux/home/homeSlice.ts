import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseHome } from "../../utils/InitialiseHome";
import { ItemsDisplay, HomeState, ItemDisplay } from "../types";
import { getAllItems, getItemById, getItemsByCategory } from "./asyncActions";

const initialState: HomeState = InitialiseHome();

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    // All items.
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.status = "success";
      state.itemsDisplay = action.payload;
    });
    builder.addCase(getAllItems.pending, (state) => {
      state.status = "pending";
      state.itemsDisplay = {} as ItemsDisplay;
    });
    builder.addCase(getAllItems.rejected, (state) => {
      state.status = "error";
      state.itemsDisplay = {} as ItemsDisplay;
    });

    // Items by category.
    builder.addCase(getItemsByCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.itemsCategory = action.payload;
    });
    builder.addCase(getItemsByCategory.pending, (state) => {
      state.status = "pending";
      state.itemsCategory = {} as ItemsDisplay;
    });
    builder.addCase(getItemsByCategory.rejected, (state) => {
      state.status = "error";
      state.itemsCategory = {} as ItemsDisplay;
    });

    // Item by id.
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.status = "success";
      state.itemCurrent = action.payload;
      console.log("SUCCESS");
    });
    builder.addCase(getItemById.pending, (state) => {
      state.status = "pending";
      state.itemCurrent = {} as ItemDisplay;
      console.log("PENDING");
    });
    builder.addCase(getItemById.rejected, (state) => {
      state.status = "error";
      state.itemCurrent = {} as ItemDisplay;
      console.log("ERROR");
    });
  },
});

export const { SetCategory } = homeSlice.actions;
export default homeSlice.reducer;
