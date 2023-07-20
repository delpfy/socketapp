import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseBasket } from "../../utils/InitialiseBasket";
import { BasketState, ShippingItemDisplay,  ShippingItemsDisplay} from "../types";
import { addBasketItem, deleteBasketItem, getAllBasketItems, getBasketItemById, getBasketItemsByUser, removeBasketItem } from "./asyncActions";

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

    // All items by id.
    builder.addCase(getBasketItemsByUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
      
    });
    builder.addCase(getBasketItemsByUser.pending, (state) => {
      state.status = 'pending';
      state.itemsAmount = 0 ;
    });
    builder.addCase(getBasketItemsByUser.rejected, (state) => {
      state.status = 'error';
      state.items = {} as ShippingItemsDisplay;
      state.itemsAmount = 0 ;
    });


    // Post item.
    builder.addCase(addBasketItem.fulfilled, (state, action) => {
      state.status = 'success';
      console.log("PAYLOAD addBasketItem success " + action.payload)

    });
    builder.addCase(addBasketItem.pending, (state, action) => {
      state.status = 'pending';
      console.log("PAYLOAD addBasketItem pending " + action.payload)

    });
    builder.addCase(addBasketItem.rejected, (state, action) => {
      state.status = 'error';
      alert(action.error.message)
    });

    // Remove item.
    builder.addCase(removeBasketItem.fulfilled, (state, action) => {
      state.status = 'success';
      console.log("PAYLOAD success " + action.payload)

    });
    builder.addCase(removeBasketItem.pending, (state, action) => {
      state.status = 'pending';
      console.log("PAYLOAD pending " + action.payload)

    });
    builder.addCase(removeBasketItem.rejected, (state, action) => {
      state.status = 'error';
      alert(action.error.message)
    });

    // Delete item.
    builder.addCase(deleteBasketItem.fulfilled, (state, action) => {
      state.status = 'success';
      console.log("PAYLOAD success " + action.payload)

    });
    builder.addCase(deleteBasketItem.pending, (state, action) => {
      state.status = 'pending';
      console.log("PAYLOAD pending " + action.payload)

    });
    builder.addCase(deleteBasketItem.rejected, (state, action) => {
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
