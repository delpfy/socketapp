import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseHome } from "../../utils/InitialiseHome";
import { ItemsDisplay, HomeState, Items, SelectedSortParams } from "../types";
import {
  checkItemById,
  getAllItems,
  getItemById,
  getItemsByCategory,
  searchItems,
  updateItem,
  updateItemFields,
  UploadItemImage,
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

    clearCurrentImages(state){
      state.currentImages = []
    },
    setCurrentImages(state, action: PayloadAction<[]>){
      state.currentImages = action.payload
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

    sortLaptopsByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;

      const selectedParams = action.payload.selectedParams;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName) => {
            const paramValues = selectedParams[paramName];

            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              switch (paramName) {
                case "Бренд":
                  return item.fields.brand.toString() === paramValue;
                case "Тип матриці":
                  return item.fields.matrixType.toString() === paramValue;
                case "Розмір матриці":
                  return item.fields.screenDiagonal.toString() === paramValue;
                case "Роздільна здатність":
                  return item.fields.resolution.toString() === paramValue;
                case "Процесор":
                  return item.fields.processor.toString() === paramValue;
                case "Обсяг ОЗУ":
                  return item.fields.RAM.toString() === paramValue;
                case "Серія":
                  return item.fields.series.toString() === paramValue;
                case "Тип конструкції":
                  return item.fields.construction.toString() === paramValue;
                case "Операційна система":
                  return item.fields.operatingSystem.toString() === paramValue;
                case "Тип покриття матриці":
                  return item.fields.coatingType === paramValue;
                case "Сенсорний екран":
                  return item.fields.touchScreen.toString() === paramValue;
                case "Частота оновлення":
                  return item.fields.refreshRate.toString() === paramValue;
                case "Яскравість":
                  return item.fields.brightness.toString() === paramValue;
                case "Інші функції дисплея":
                  return (
                    item.fields.otherDisplayFeatures.toString() === paramValue
                  );
                case "Максимальний обсяг ОЗУ":
                  return item.fields.maxRAM.toString() === paramValue;
                case "Тип накопичувача":
                  return item.fields.storageType.toString() === paramValue;
                case "Обсяг накопичувача":
                  return item.fields.storageCapacity.toString() === paramValue;
                case "Оптичний привід":
                  return item.fields.opticalDrive.toString() === paramValue;
                case "Рідер карт пам'яті":
                  return item.fields.cardReader.toString() === paramValue;
                case "Веб-камера":
                  return item.fields.webcam.toString() === paramValue;
                case "Підсвітка клавіатури":
                  return (
                    item.fields.keyboardBacklight.toString() === paramValue
                  );
                case "Пасивне охолодження":
                  return item.fields.passiveCooling.toString() === paramValue;
                case "Сканер відбитків пальців":
                  return (
                    item.fields.fingerprintScanner.toString() === paramValue
                  );
                case "Цифрова клавіатура":
                  return item.fields.numericKeypad.toString() === paramValue;
                case "Адаптер Ethernet":
                  return item.fields.ethernetAdapter.toString() === paramValue;
                case "Wi-Fi":
                  return item.fields.wifi.toString() === paramValue;
                case "Bluetooth":
                  return item.fields.bluetooth.toString() === paramValue;
                case "Вага":
                  return item.fields.weight.toString() === paramValue;
                case "Матеріал корпусу":
                  return item.fields.bodyMaterial === paramValue;
                case "Колір кришки":
                  return item.fields.lidColor === paramValue;
                case "Колір корпусу":
                  return item.fields.bodyColor === paramValue;
                default:
                  return false;
              }
            });
          });
        }
      );

      state.itemsSortedParams = state.itemsSorted;
    },

    sortMonitorsByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;
      const selectedParams = action.payload.selectedParams;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName) => {
            const paramValues = selectedParams[paramName];

            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              switch (paramName) {
                case "Бренд":
                  return item.fields.brand.toString() === paramValue;
                case "Тип матриці":
                  return item.fields.matrixType.toString() === paramValue;
                case "Розмір матриці":
                  return item.fields.screenDiagonal.toString() === paramValue;
                case "Роздільна здатність":
                  return item.fields.resolution.toString() === paramValue;
                case "Час відгуку":
                  return item.fields.responseTime.toString() === paramValue;
                case "Кути огляду":
                  return item.fields.viewingAngles.toString() === paramValue;
                case "Тип підсвічування":
                  return item.fields.backlightType.toString() === paramValue;
                case "Яскравість":
                  return item.fields.brightness.toString() === paramValue;
                case "Співвідношення контрастності":
                  return item.fields.contrastRatio.toString() === paramValue;
                case "Співвідношення сторін":
                  return item.fields.aspectRatio.toString() === paramValue;
                case "Покриття екрану":
                  return item.fields.screenCoating.toString() === paramValue;
                case "Зігнута матриця":
                  return item.fields.curvedScreen.toString() === paramValue;
                case "Частота оновлення":
                  return item.fields.refreshRate.toString() === paramValue;
                default:
                  return false;
              }
            });
          });
        }
      );
      state.sorted = true;
      state.itemsSortedParams = state.itemsSorted;
    },

    sortCabelsByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;
      const selectedParams = action.payload.selectedParams;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName) => {
            const paramValues = selectedParams[paramName];

            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              switch (paramName) {
                case "Бренд":
                  return item.fields.brand === paramValue;
                case "Тип роз'єму":
                  return item.fields.connectorType.toString() === paramValue;
                case "Довжина кабелю":
                  return item.fields.cableLength.toString() === paramValue;
                case "Сумісність":
                  return item.fields.compatibility.toString() === paramValue;
                case "Матеріал":
                  return item.fields.material.toString() === paramValue;
                case "Колір":
                  return item.fields.color.toString() === paramValue;
                default:
                  return false;
              }
            });
          });
        }
      );
      state.sorted = true;
      state.itemsSortedParams = state.itemsSorted;
    },

    sortElectronicsByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;
      const selectedParams = action.payload.selectedParams;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName) => {
            const paramValues = selectedParams[paramName];

            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              switch (paramName) {
                case "Бренд":
                  return item.fields.brand === paramValue;
                case "Тип":
                  return item.fields.type.toString() === paramValue;
                case "Бездротовий":
                  return item.fields.wireless.toString() === paramValue;
                case "Сумісність":
                  return item.fields.compatibility.toString() === paramValue;
                case "Матеріал":
                  return item.fields.material.toString() === paramValue;
                case "Колір":
                  return item.fields.color.toString() === paramValue;
                default:
                  return false;
              }
            });
          });
        }
      );
      state.sorted = true;
      state.itemsSortedParams = state.itemsSorted;
    },

    sortNetworkByParameters(
      state,
      action: PayloadAction<{ selectedParams: SelectedSortParams }>
    ) {
      state.sorted = true;
      const selectedParams = action.payload.selectedParams;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: any) => {
          return Object.keys(selectedParams).every((paramName) => {
            const paramValues = selectedParams[paramName];

            if (paramValues.length === 0) {
              return true;
            }

            return paramValues.some((paramValue) => {
              switch (paramName) {
                case "Бренд":
                  return item.fields.brand === paramValue;
                case "Тип":
                  return item.fields.type === paramValue;
                case "Максимальна швидкість":
                  return item.fields.maxSpeed?.toString() === paramValue;
                case "Постачання живлення":
                  return item.fields.powerSupply.toString() === paramValue;
                case "Монтаж у стійку":
                  return item.fields.rackMountable.toString() === paramValue;
                case "Підтримка PoE":
                  return item.fields.poeSupport.toString() === paramValue;
                case "Підтримка VPN":
                  return item.fields.vpnSupport.toString() === paramValue;
                case "Файервол":
                  return item.fields.firewall.toString() === paramValue;
                case "Колір":
                  return item.fields.color.toString() === paramValue;
                default:
                  return false;
              }
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
  state.currentImages = action.payload.map((image: any) => {return image.url})
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
      const recentlyReviewed = JSON.parse(
        localStorage.getItem("recentlyReviewed") || "{}"
      );
      const basketItems = JSON.parse(
        localStorage.getItem("basketItems") || "{}"
      );
      state.status = "success";
      state.itemsCategory = action.payload;
      state.itemsCategory.items.map((item: any) => {
        actualizeFirstRender(recentlyReviewed, item);
        actualizeFirstRenderBasket(basketItems, item);
      });
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
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
  sortLaptopsByParameters,
  sortMonitorsByParameters,
  sortCabelsByParameters,
  sortElectronicsByParameters,
  sortNetworkByParameters,
} = homeSlice.actions;
export default homeSlice.reducer;
