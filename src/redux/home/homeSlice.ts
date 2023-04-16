import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseHome } from "../../utils/InitialiseHome";
import {IItemsDisplay, HomeState, IItemDisplay} from '../types'
import { getAllItems, getItemById, getItemsByCategory } from "./asyncActions";

const initialState: HomeState = InitialiseHome();

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetID(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    SetCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    SetDisplayItems(state, action: PayloadAction<IItemsDisplay>) {
      state.itemsDisplay = action.payload;
    },
    

  },
  extraReducers: (builder) => {

    // All items.
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.itemsDisplay = action.payload;
    });
    builder.addCase(getAllItems.pending, (state) => {
      state.status = 'pending';
      state.itemsDisplay = {} as IItemsDisplay;
    });
    builder.addCase(getAllItems.rejected, (state) => {
      state.status = 'error';
      state.itemsDisplay = {} as IItemsDisplay;
    });

    // Items by category.
    builder.addCase(getItemsByCategory.fulfilled, (state, action) => {
      state.status = 'success';
      state.itemsCategory = action.payload;
    });
    builder.addCase(getItemsByCategory.pending, (state) => {
      state.status = 'pending';
      state.itemsCategory = {} as IItemsDisplay;
    });
    builder.addCase(getItemsByCategory.rejected, (state) => {
      state.status = 'error';
      state.itemsCategory = {} as IItemsDisplay;
    });

    // Item by id.
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.status = 'success';
      state.itemCurrent = action.payload;
      console.log("SUCCESS");
    });
    builder.addCase(getItemById.pending, (state) => {
      state.status = 'pending';
      state.itemCurrent = {} as IItemDisplay;
      console.log("PENDING");
    });
    builder.addCase(getItemById.rejected, (state) => {
      state.status = 'error';
      state.itemCurrent = {} as IItemDisplay;
      console.log("ERROR");
    });

  }});

export const { SetID, SetCategory, SetDisplayItems} = homeSlice.actions;
export default homeSlice.reducer;
