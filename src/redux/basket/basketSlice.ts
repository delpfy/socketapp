import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseBasket } from "../../utils/InitialiseBasket";
import { BasketState, TShippingItemsDisplay } from "../types";
import {
  addBasketItem,
  deleteBasketItem,
  getBasketItemsByUser,
  removeBasketItem,
} from "./asyncActions";

const initialState: BasketState = InitialiseBasket();

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    SetItemsAmount(state, action: PayloadAction<number>) {
      state.itemsAmount = action.payload;
    },
    synchronizeBasket(state){
      state.items = JSON.parse(
        localStorage.getItem("basketItems") || "{}"
      );
      
    },
    setAfterOrder(state, action: PayloadAction<boolean>){
      state.afterOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    // All items by id.
    /* builder.addCase(getBasketItemsByUser.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(getBasketItemsByUser.pending, (state) => {
      state.status = "pending";
      state.itemsAmount = 0;
    });
    builder.addCase(getBasketItemsByUser.rejected, (state) => {
      state.status = "error";
      state.items = {} as TShippingItemsDisplay;
      state.itemsAmount = 0;
    }); */

    // Post item.
    builder.addCase(addBasketItem.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addBasketItem.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(addBasketItem.rejected, (state, action) => {
      state.status = "error";
      alert(action.error.message);
    });

    // Remove item.
    builder.addCase(removeBasketItem.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(removeBasketItem.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(removeBasketItem.rejected, (state, action) => {
      state.status = "error";
    });

    // Delete item.
    builder.addCase(deleteBasketItem.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(deleteBasketItem.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(deleteBasketItem.rejected, (state, action) => {
      state.status = "error";
      alert(action.error.message);
    });
  },
});

export const { SetItemsAmount, synchronizeBasket,setAfterOrder} = basketSlice.actions;
export default basketSlice.reducer;
