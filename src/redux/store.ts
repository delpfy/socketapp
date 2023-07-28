import { configureStore } from "@reduxjs/toolkit";
import basketReduser from "./basket/basketSlice";
import homeReduser from "./home/homeSlice";
import userReduser from "./user/userSlice";
import reviewReduser from "./review/reviewSlice";
import orderReduser from "./order/orderSlice";

const store = configureStore({
  reducer: {
    basket: basketReduser,
    home: homeReduser,
    user: userReduser,
    reviews: reviewReduser,
    orders: orderReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
