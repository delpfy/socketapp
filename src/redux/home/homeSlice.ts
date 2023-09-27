import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseHome } from "../../utils/InitialiseHome";
import {
  ItemsDisplay,
  HomeState,
  Items,
  SelectedSortParams,
  Category,
} from "../types";
import {
  checkItemById,
  getAllItems,
  getItemById,
  getItemsByCategory,
  searchItems,
  updateItem,
  updateItemFields,
  UploadItemImage,
  getAllCategories,
  searchCategories,
  getItemBySlug,
} from "./asyncActions";
import { actualizeData } from "../../utils/actuilizeLocalStorageData";
import { actualizeFirstRender } from "../../utils/actualizeFirstLoad";
import { actualizeFirstRenderBasket } from "../../utils/actuilizeFirstLoadBasket";

const initialState: HomeState = InitialiseHome();

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    SetCategorySlug(state, action: PayloadAction<string>) {
      state.category_slug = action.payload;
    },
    SetSubcategory(state, action: PayloadAction<string>) {
      state.subcategory = action.payload;
    },

    setReset(state, action: PayloadAction<boolean>) {
      state.reset = action.payload;
    },
    clearCurrentImages(state) {
      state.currentImages = [];
    },
    setCurrentImages(state, action: PayloadAction<[]>) {
      state.currentImages = action.payload;
    },
    setSearchedId(state, action: PayloadAction<string>) {
      state.itemAppendingId = action.payload;
    },
    setFavoritesId(state, action: PayloadAction<string>) {
      state.itemFavoritesId = action.payload;
    },
    setComparisonId(state, action: PayloadAction<string>) {
      state.itemCompareId = action.payload;
    },

    setEditItemMode(state, action: PayloadAction<boolean>) {
      state.editItemMode = action.payload;
    },
    setDifferencesMode(state, action: PayloadAction<boolean>) {
      state.differencesMode = action.payload;
    },
    synchronizeFavorites(state) {
      state.itemsFavorites = JSON.parse(
        localStorage.getItem("favoriteItems") || "{}"
      );
    },
    synchronizeComparison(state) {
      state.itemsComparison = JSON.parse(
        localStorage.getItem("comparisonItems") || "{}"
      );
    },

    sortByCost_ASC(state) {
      state.sorted = true;
      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = [...state.itemsSortedParams.items].sort(
          (a, b) =>
            a.price -
            Math.round((a.price * a.sale) / 100) -
            (b.price - Math.round((b.price * b.sale) / 100))
        );
      } else {
        state.itemsSorted.items = [...state.itemsCategory.items].sort(
          (a, b) =>
            a.price -
            Math.round((a.price * a.sale) / 100) -
            (b.price - Math.round((b.price * b.sale) / 100))
        );
      }
    },
    sortByCost_DESC(state) {
      state.sorted = true;
      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = [...state.itemsSortedParams.items]
          .sort(
            (a, b) =>
              a.price -
              Math.round((a.price * a.sale) / 100) -
              (b.price - Math.round((b.price * b.sale) / 100))
          )
          .reverse();
      } else {
        state.itemsSorted.items = [...state.itemsCategory.items]
          .sort(
            (a, b) =>
              a.price -
              Math.round((a.price * a.sale) / 100) -
              (b.price - Math.round((b.price * b.sale) / 100))
          )
          .reverse();
      }
    },
    sortByRelevance_ASC(state) {
      state.sorted = true;

      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = [...state.itemsSortedParams.items].sort(
          (a, b) => b.rating - a.rating
        );
      } else {
        state.itemsSorted.items = [...state.itemsCategory.items].sort(
          (a, b) => b.rating - a.rating
        );
      }
    },
    sortByRelevance_DESC(state) {
      state.sorted = true;
      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = [...state.itemsSortedParams.items]
          .sort((a, b) => b.rating - a.rating)
          .reverse();
      } else {
        state.itemsSorted.items = [...state.itemsCategory.items]
          .sort((a, b) => b.rating - a.rating)
          .reverse();
      }
    },

    sortByCostRange(state, action: PayloadAction<number[]>) {
      state.sorted = true;
      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = state.itemsSortedParams.items.filter(
          (item: Items) =>
            item.price - Math.round((item.price * item.sale) / 100) >=
              action.payload[0] &&
            item.price - Math.round((item.price * item.sale) / 100) <=
              action.payload[1]
        );
      } else {
        state.itemsSorted.items = state.itemsCategory.items.filter(
          (item: Items) =>
            item.price - Math.round((item.price * item.sale) / 100) >=
              action.payload[0] &&
            item.price - Math.round((item.price * item.sale) / 100) <=
              action.payload[1]
        );
      }
    },
    sortByRelevanceRange(state, action: PayloadAction<number[]>) {
      state.sorted = true;
      if (state.itemsSortedParams.items) {
        state.itemsSorted.items = state.itemsSortedParams.items.filter(
          (item: Items) =>
            item.rating >= action.payload[0] && item.rating <= action.payload[1]
        );
      } else {
        state.itemsSorted.items = state.itemsCategory.items.filter(
          (item: Items) =>
            item.rating >= action.payload[0] && item.rating <= action.payload[1]
        );
      }
    },

    sortItemsByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;
      const selectedParams = action.payload.selectedParams;

      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName, index) => {
            const paramValues = Object.values(selectedParams)[index];
            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              const fieldIndex = item.fields.findIndex(
                (field: any) => Object.values(field)[0] === paramValue
              );

              if (fieldIndex !== -1) {
                return Object.values(item.fields[fieldIndex])[0] === paramValue;
              }
              return false;
            });
          });
        }
      );
      state.sorted = true;
      state.itemsSortedParams = state.itemsSorted;
    },
  },

  extraReducers: (builder) => {
    // Upload item_image.
    builder.addCase(UploadItemImage.fulfilled, (state, action) => {
      /* state.avatarFile = action.payload.url; */
      state.currentImages = action.payload.map((image: any) => {
        return image.url;
      });
      console.log(action.payload[0].url);
      console.log(state.itemCurrent);
    });
    builder.addCase(UploadItemImage.pending, (state) => {});
    builder.addCase(UploadItemImage.rejected, (state, action) => {});

    // All items.
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      state.itemsDisplay = action.payload;
      state.itemsPromotionOffer = action.payload;

      state.itemsNew = [...action.payload.items].sort(
        (a: Items, b: Items) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      state.itemsTopSale = [...action.payload.items].sort(
        (a: Items, b: Items) => a.quantity - b.quantity
      );
      state.itemsTopRating = [...action.payload.items].sort(
        (a: Items, b: Items) => b.rating - a.rating
      );
      state.status = "success";
    });
    builder.addCase(getAllItems.pending, (state) => {
      state.status = "pending";
      state.itemsDisplay = {} as ItemsDisplay;
      state.itemsPromotionOffer = {} as ItemsDisplay;
      state.itemsNew = {} as ItemsDisplay;
      state.itemsTopSale = {} as ItemsDisplay;
      state.itemsTopRating = {} as ItemsDisplay;
    });
    builder.addCase(getAllItems.rejected, (state) => {
      state.status = "error";
      state.itemsDisplay = {} as ItemsDisplay;
      state.itemsPromotionOffer = {} as ItemsDisplay;
      state.itemsNew = {} as ItemsDisplay;
      state.itemsTopSale = {} as ItemsDisplay;
      state.itemsTopRating = {} as ItemsDisplay;
    });

    // Items by category.
    builder.addCase(getItemsByCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.itemsCategory = action.payload;
      console.log(action.payload);
      state.uniqueItemFieldsNames = action.payload.items[0]?.fields.map(
        (fieldName: any, index: number) =>
          Array.from(
            new Set(
              action.payload?.items?.map((item: any) => {
                return Object.keys(item?.fields[index])[0];
              }) ?? []
            )
          )
      );
      state.uniqueItemFieldsValues = action.payload.items[0]?.fields.map(
        (fieldName: any, index: number) =>
          Array.from(
            new Set(
              action.payload?.items?.map((item: any) => {
                return Object.values(item?.fields[index])[0];
              }) ?? []
            )
          )
      );
      state.itemsSorted = action.payload;
    });
    builder.addCase(getItemsByCategory.pending, (state) => {
      state.status = "pending";
      state.itemsCategory = {} as ItemsDisplay;
    });
    builder.addCase(getItemsByCategory.rejected, (state) => {
      state.status = "error";
      state.itemsCategory = {} as ItemsDisplay;
    });

    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      /* state.computerPartsSubcategory =  */
    });
    builder.addCase(getAllCategories.pending, (state) => {});
    builder.addCase(getAllCategories.rejected, (state) => {});

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

    builder.addCase(searchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categoriesDisplay = action.payload;
    });
    builder.addCase(searchCategories.pending, (state) => {
      state.status = "pending";
      state.categoriesDisplay = [] as Category[];
    });
    builder.addCase(searchCategories.rejected, (state) => {
      state.status = "error";
      state.categoriesDisplay = [] as Category[];
    });
    // get item by id.
    builder.addCase(getItemById.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
      state.item_status = "success";
    });
    builder.addCase(getItemById.pending, (state, action) => {
      state.item_status = "pending";
    });
    builder.addCase(getItemById.rejected, (state) => {
      state.item_status = "error";
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
    });

    builder.addCase(getItemBySlug.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
      state.item_status = "success";
    });
    builder.addCase(getItemBySlug.pending, (state, action) => {
      state.item_status = "pending";
    });
    builder.addCase(getItemBySlug.rejected, (state) => {
      state.item_status = "error";
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
    });

    builder.addCase(checkItemById.fulfilled, (state, action) => {
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
      state.item_status = "success";
    });
    builder.addCase(checkItemById.pending, (state, action) => {
      state.item_status = "pending";
    });
    builder.addCase(checkItemById.rejected, (state) => {
      state.item_status = "error";
      state.itemAppendingId = "";
      state.itemCompareId = "";
      state.itemFavoritesId = "";
    });

    // update.
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;

      const recentlyReviewed = JSON.parse(
        localStorage.getItem("recentlyReviewed") || "{}"
      );

      actualizeData(recentlyReviewed, action.payload);

      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );

      state.status = "success";
    });
    builder.addCase(updateItem.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateItem.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(updateItemFields.fulfilled, (state, action) => {
      state.itemCurrent = action.payload;
      state.status = "success";
    });
    builder.addCase(updateItemFields.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateItemFields.rejected, (state) => {
      state.status = "error";
    });

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
  SetSubcategory,
  SetCategorySlug,
  setReset,
  clearCurrentImages,
  setCurrentImages,
  setSearchedId,
  setFavoritesId,
  setComparisonId,
  setEditItemMode,
  setDifferencesMode,
  synchronizeFavorites,
  synchronizeComparison,
  sortByCost_ASC,
  sortByCost_DESC,
  sortByRelevance_ASC,
  sortByRelevance_DESC,
  sortByCostRange,
  sortByRelevanceRange,
  sortItemsByParameters,
} = homeSlice.actions;
export default homeSlice.reducer;
