import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialiseBasket } from "../../utils/InitialiseBasket";
import { BasketState, IBasketItemsDisplay} from "../types";
import { addBasketItem, getAllBasketItems } from "./asyncActions";

const initialState: BasketState = InitialiseBasket();

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    IncExpences(state, action: PayloadAction<number>) {
      state.expences += action.payload;
    },
    DecExpences(state, action: PayloadAction<number>) {
      state.expences -= action.payload;
    },

  },
  extraReducers: (builder) => {

    // All items.
    builder.addCase(getAllBasketItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(getAllBasketItems.pending, (state) => {
      state.status = 'pending';
      state.items = {} as IBasketItemsDisplay;
    });
    builder.addCase(getAllBasketItems.rejected, (state) => {
      state.status = 'error';
      state.items = {} as IBasketItemsDisplay;
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
  IncExpences,
  DecExpences,
} = basketSlice.actions;
export default basketSlice.reducer;
