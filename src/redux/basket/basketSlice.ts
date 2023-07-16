import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseBasket } from "../../utils/InitialiseBasket";
import { BasketState, ShippingItemDisplay,  ShippingItemsDisplay} from "../types";
import { addBasketItem, getAllBasketItems, getBasketItemById, getBasketItemByUser } from "./asyncActions";

const initialState: BasketState = InitialiseBasket();

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    SetItemsAmount(state, action: PayloadAction<number>) {
      state.itemsAmount = action.payload;
    },

    SetItemPage(state, action: PayloadAction<boolean>){
      state.isOnItemPage = action.payload;
    }

  },
  extraReducers: (builder) => {

    // All items.
    builder.addCase(getAllBasketItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(getAllBasketItems.pending, (state) => {
      state.status = 'pending';
      state.items = {} as ShippingItemsDisplay;
    });
    builder.addCase(getAllBasketItems.rejected, (state) => {
      state.status = 'error';
      state.items = {} as ShippingItemsDisplay;
    });

    // All items by id.
    builder.addCase(getBasketItemByUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
      
    });
    builder.addCase(getBasketItemByUser.pending, (state) => {
      state.status = 'pending';
      state.items = {} as ShippingItemsDisplay;
      state.itemsAmount = 0 ;
    });
    builder.addCase(getBasketItemByUser.rejected, (state) => {
      state.status = 'error';
      state.items = {} as ShippingItemsDisplay;
      state.itemsAmount = 0 ;
    });

    // Item by id.
    builder.addCase(getBasketItemById.fulfilled, (state, action) => {
      state.status = 'success';
      state.basketItemCurrent = action.payload;
    });
    builder.addCase(getBasketItemById.pending, (state) => {
      state.status = 'pending';
      state.basketItemCurrent = {} as ShippingItemDisplay;
    });
    builder.addCase(getBasketItemById.rejected, (state) => {
      state.status = 'error';
      state.basketItemCurrent = {} as ShippingItemDisplay;
    });

    // Post item.
    builder.addCase(addBasketItem.fulfilled, (state, action) => {
      state.status = 'success';
      console.log("PAYLOAD success " + action.payload)

    });
    builder.addCase(addBasketItem.pending, (state, action) => {
      state.status = 'pending';
      console.log("PAYLOAD pending " + action.payload)

    });
    builder.addCase(addBasketItem.rejected, (state, action) => {
      state.status = 'error';
      alert(action.error.message)
    });
  }
});

export const {
  SetItemsAmount,
  SetItemPage,
} = basketSlice.actions;
export default basketSlice.reducer;
