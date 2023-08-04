import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseHome } from "../../utils/InitialiseHome";
import {
  ItemsDisplay,
  HomeState,
  TShippingItems,
  Items,
  CombinedItems,
} from "../types";
import {
  getAllItems,
  getItemById,
  getItemsByCategory,
  searchItems,
  updateItem,
} from "./asyncActions";
import { actualizeData } from "../../utils/actuilizeLocalStorageData";

const initialState: HomeState = InitialiseHome();

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },

    setCurrentItem(state, action: PayloadAction<TShippingItems | Items>) {
      state.itemCurrent = action.payload;
      state.status = "success";
    },

    sortByCost_ASC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items].sort(
        (a, b) => a.price - b.price
      );
    },
    sortByCost_DESC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items]
        .sort((a, b) => a.price - b.price)
        .reverse();
    },
    sortByRelevance_ASC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items].sort(
        (a, b) => b.rating - a.rating
      );
    },
    sortByRelevance_DESC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items]
        .sort((a, b) => b.rating - a.rating)
        .reverse();
    },

    sortByCostRange(state, action: PayloadAction<number[]>) {
      state.sortedByRange = true;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: Items) =>
          item.price >= action.payload[0] && item.price <= action.payload[1]
      );
      

    },
    sortByRelevanceRange(state, action: PayloadAction<number[]>) {
      state.sortedByRange = true;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: Items) =>
          item.rating >= action.payload[0] && item.rating <= action.payload[1]
      );
      

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

    // Items by category.
    builder.addCase(searchItems.fulfilled, (state, action) => {
      state.status = "success";
      state.itemsDisplay = action.payload;
    });
    builder.addCase(searchItems.pending, (state) => {
      state.status = "pending";
      state.itemsDisplay = {} as ItemsDisplay;
    });
    builder.addCase(searchItems.rejected, (state) => {
      state.status = "error";
      state.itemsDisplay = {} as ItemsDisplay;
    });

    // get item by id.
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;
      console.log(state.itemCurrent);
    });
    builder.addCase(getItemById.pending, (state) => {});
    builder.addCase(getItemById.rejected, (state) => {});

    // update.
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.itemCurrent = action.payload.item;

      const recentlyReviewed = JSON.parse(
        localStorage.getItem("recentlyReviewed") || "{}"
      );
      const basketItems = JSON.parse(
        localStorage.getItem("basketItems") || "{}"
      );

      actualizeData(recentlyReviewed, action.payload);

      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
    });
    builder.addCase(updateItem.pending, (state) => {});
    builder.addCase(updateItem.rejected, (state) => {});

    /* // Item by id.
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
    }); */
  },
});

export const {
  SetCategory,
  setCurrentItem,
  sortByCost_ASC,
  sortByCost_DESC,
  sortByRelevance_ASC,
  sortByRelevance_DESC,
  sortByCostRange,
  sortByRelevanceRange,
} = homeSlice.actions;
export default homeSlice.reducer;
