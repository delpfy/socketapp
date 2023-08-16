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
      console.log(state.itemCurrent.fields);
      state.status = "success";
    },

    sortByCost_ASC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items].sort(
        (a, b) =>
          a.price -
          Math.round((a.price * a.sale) / 100) -
          (b.price - Math.round((b.price * b.sale) / 100))
      );
    },
    sortByCost_DESC(state) {
      state.sortedByRange = false;
      state.itemsCategory.items = [...state.itemsCategory.items]
        .sort(
          (a, b) =>
            a.price -
            Math.round((a.price * a.sale) / 100) -
            (b.price - Math.round((b.price * b.sale) / 100))
        )
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
          item.price - Math.round((item.price * item.sale) / 100) >=
            action.payload[0] &&
          item.price - Math.round((item.price * item.sale) / 100) <=
            action.payload[1]
      );
    },
    sortByRelevanceRange(state, action: PayloadAction<number[]>) {
      state.sortedByRange = true;
      state.itemsSorted.items = state.itemsCategory.items.filter(
        (item: Items) =>
          item.rating >= action.payload[0] && item.rating <= action.payload[1]
      );
    },

    sortLaptopsByParameters(
      state,
      action: PayloadAction<{ param: string; paramValue: any }>
    ) {
      state.sortedByRange = true;
      switch (action.payload.param) {
        case "Бренд":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.brand.toString() === action.payload.paramValue
          );
          break;
        case "Тип матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.matrixType.toString() === action.payload.paramValue
          );
          break;
        case "Розмір матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.screenDiagonal.toString() ===
              action.payload.paramValue
          );
          break;
        case "Роздільна здатність":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.resolution.toString() === action.payload.paramValue
          );
          break;
        case "Процесор":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.processor.toString() === action.payload.paramValue
          );
          break;
        case "Обсяг пам'яті":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.memory.toString() === action.payload.paramValue
          );
          break;
        case "Серія":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.series.toString() === action.payload.paramValue
          );
          break;
        case "Тип конструкції":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.construction.toString() === action.payload.paramValue
          );
          break;
        case "Операційна система":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.operatingSystem.toString() ===
              action.payload.paramValue
          );
          break;
        case "Тип покриття матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.coatingType.toLowerCase() ===
              action.payload.paramValue
          );
          break;
        case "Сенсорний екран":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.touchScreen.toString() === action.payload.paramValue
          );
          break;
        case "Частота оновлення":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.refreshRate.toString() === action.payload.paramValue
          );
          break;
        case "Яскравість":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.brightness.toString() === action.payload.paramValue
          );
          break;
        case "Інші функції дисплея":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.otherDisplayFeatures.toString() ===
              action.payload.paramValue
          );
          break;
        case "Максимальний обсяг ОЗУ":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.maxRAM.toString() === action.payload.paramValue
          );
          break;
        case "Тип накопичувача":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.storageType.toString() === action.payload.paramValue
          );
          break;
        case "Обсяг накопичувача":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.storageCapacity.toString() ===
              action.payload.paramValue
          );
          break;
        case "Оптичний привід":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.opticalDrive.toString() === action.payload.paramValue
          );
          break;
        case "Рідер карт пам'яті":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.cardReader.toString() === action.payload.paramValue
          );
          break;
        case "Веб-камера":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.webcam.toString() === action.payload.paramValue
          );
          break;
        case "Підсвітка клавіатури":
          console.log(typeof action.payload.paramValue);

          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.keyboardBacklight.toString() ===
              action.payload.paramValue
          );
          break;
        case "Пасивне охолодження":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.passiveCooling.toString() ===
              action.payload.paramValue
          );
          break;
        case "Сканер відбитків пальців":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.fingerprintScanner.toString() ===
              action.payload.paramValue
          );
          break;
        case "Цифрова клавіатура":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.numericKeypad.toString() === action.payload.paramValue
          );
          break;
        case "Адаптер Ethernet":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.ethernetAdapter.toString() ===
              action.payload.paramValue
          );
          break;
        case "Wi-Fi":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.wifi.toString() === action.payload.paramValue
          );
          break;
        case "Bluetooth":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.bluetooth.toString() === action.payload.paramValue
          );
          break;
        case "Вага":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.weight.toString() === action.payload.paramValue
          );
          break;
        case "Матеріал корпусу":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.bodyMaterial.toLowerCase() ===
              action.payload.paramValue
          );
          break;
        case "Колір кришки":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.lidColor.toLowerCase() === action.payload.paramValue
          );
          break;
        case "Колір корпусу":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.bodyColor.toLowerCase() === action.payload.paramValue
          );
          break;
      }
    },

    sortMonitorsByParameters(
      state,
      action: PayloadAction<{ param: string; paramValue: any }>
    ) {
      state.sortedByRange = true;
      switch (action.payload.param) {
        case "Бренд":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.brand.toString() === action.payload.paramValue
          );
          break;
        case "Тип матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.matrixType.toString() === action.payload.paramValue
          );
          break;
        case "Розмір матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.screenDiagonal.toString() ===
              action.payload.paramValue
          );
          break;
        case "Роздільна здатність":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.resolution.toString() === action.payload.paramValue
          );
          break;
        case "Час відгуку":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.responseTime.toString() === action.payload.paramValue
          );
          break;
        case "Кути огляду":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.viewingAngles.toString() === action.payload.paramValue
          );
          break;
        case "Тип підсвічування":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.backlightType.toString() === action.payload.paramValue
          );
          break;
        case "Яскравість":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.brightness.toString() === action.payload.paramValue
          );
          break;
        case "Співвідношення контрастності":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.contrastRatio.toString() === action.payload.paramValue
          );
          break;
          case "Співвідношення сторін":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.aspectRatio.toString() === action.payload.paramValue
          );
          break;
        case "Покриття екрану":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.screenCoating.toString() === action.payload.paramValue
          );
          break;
        case "Зігнута матриця":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.curvedScreen.toString() === action.payload.paramValue
          );
          break;
        case "Частота оновлення":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.refreshRate.toString() === action.payload.paramValue
          );
          break;
      }
    },
    sortTabletsByParameters(
      state,
      action: PayloadAction<{ param: string; paramValue: any }>
    ) {
      state.sortedByRange = true;
      switch (action.payload.param) {
        case "Бренд":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.brand.toString() === action.payload.paramValue
          );
          break;
        case "Лінійка":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.line.toString() === action.payload.paramValue
          );
          break;
        case "Операційна система":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.preinstalledOS.toString() ===
              action.payload.paramValue
          );
          break;
        case "Розмір матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.screenDiagonal.toString() ===
              action.payload.paramValue
          );
          break;
        case "Роздільна здатність":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.resolution.toString() === action.payload.paramValue
          );
          break;

        case "Тип матриці":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.matrixType.toString() === action.payload.paramValue
          );
          break;
        
        case "Обсяг пам'яті RAM":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.memoryRAM.toString() === action.payload.paramValue
          );
          break;
        case "Вбудована пам'ять":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.builtInMemory.toString() === action.payload.paramValue
          );
          break;
        case "Слот розширення пам'яті":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.memoryExpansionSlot.toString() ===
              action.payload.paramValue
          );
          break;
        case "Процесор":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.processor.toString() === action.payload.paramValue
          );
          break;
        case "Частота процесора":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.processorFrequency.toString() ===
              action.payload.paramValue
          );
          break;
        case "Кількість ядер процесора":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.processorCores.toString() ===
              action.payload.paramValue
          );
          break;
        case "Вбудовані динаміки":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.builtInSpeakers.toString() ===
              action.payload.paramValue
          );
          break;
        case "Ємність батареї":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.batteryCapacity.toString() ===
              action.payload.paramValue
          );
          break;
        case "Фронтальна камера":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.frontCamera.toString() === action.payload.paramValue
          );
          break;
        case "Тилова камера":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.rearCamera.toString() === action.payload.paramValue
          );
          break;
        case "Wi-Fi":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.wifi.toString() === action.payload.paramValue
          );
          break;
        case "Мобільна мережа":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.cellularNetwork.toString() ===
              action.payload.paramValue
          );
          break;
        case "Голосова комунікація":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.voiceCommunication.toString() ===
              action.payload.paramValue
          );
          break;
        case "GPS":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.gps.toString() === action.payload.paramValue
          );
          break;
        case "NFC":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.nfc.toString() === action.payload.paramValue
          );
          break;
        case "Зовнішні порти":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.externalPorts.toString() === action.payload.paramValue
          );
          break;
        case "Вага":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.weight.toString() === action.payload.paramValue
          );
          break;
        case "Колір корпусу":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.bodyColor.toLowerCase() ===
              action.payload.paramValue.toLowerCase()
          );
          break;
        case "Колір фронтальної панелі":
          state.itemsSorted.items = state.itemsCategory.items.filter(
            (item: any) =>
              item.fields.frontPanelColor.toLowerCase() ===
              action.payload.paramValue.toLowerCase()
          );
          break;
          case "Колір фронтальної панелі":
            state.itemsSorted.items = state.itemsCategory.items.filter(
              (item: any) =>
                item.fields.frontPanelColor.toLowerCase() ===
                action.payload.paramValue.toLowerCase()
            );
            break;
      }
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
      console.log(state.itemsCategory);
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
  sortLaptopsByParameters,
  sortMonitorsByParameters,
  sortTabletsByParameters,
} = homeSlice.actions;
export default homeSlice.reducer;
