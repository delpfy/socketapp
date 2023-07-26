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
  updateItem,
} from "./asyncActions";

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

    // get item by id.
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;
    });
    builder.addCase(getItemById.pending, (state) => {});
    builder.addCase(getItemById.rejected, (state) => {});

    // update.
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.itemCurrent = action.payload.item;

      const recentlyReviewed = JSON.parse(
        localStorage.getItem("recentlyReviewed") || "{}"
      );

      if (recentlyReviewed !== undefined) {
        const itemIndex = recentlyReviewed.findIndex(
          (item: Items) => item.name === action.payload.item.name
        );
        console.log("RATING 1" + action.payload.item.rating);

        if (itemIndex !== -1) {
          console.log("RATING 2" + recentlyReviewed[itemIndex].rating);
          for (const key in action.payload.item) {
            console.log("KEY" + key);
            if (action.payload.item.hasOwnProperty(key)) {
              if (
                action.payload.item[key as keyof CombinedItems] !==
                recentlyReviewed[itemIndex][key]
              ) {
                console.log("obj2[key] 1" + recentlyReviewed[itemIndex][key]);
                recentlyReviewed[itemIndex][key] =
                  action.payload.item[key as keyof CombinedItems];
                console.log("obj2[key] 2" + recentlyReviewed[itemIndex][key]);
              }
            }
          }

          for (const key in recentlyReviewed[itemIndex]) {
            if (
              recentlyReviewed[itemIndex].hasOwnProperty(key) &&
              !action.payload.item.hasOwnProperty(key)
            ) {
              delete recentlyReviewed[itemIndex][key];
            }
          }

          localStorage.setItem(
            "recentlyReviewed",
            JSON.stringify(recentlyReviewed)
          );
        }
      }
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

export const { SetCategory, setCurrentItem } = homeSlice.actions;
export default homeSlice.reducer;
