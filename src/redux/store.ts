import { configureStore } from "@reduxjs/toolkit";
import basketReduser from "./basket/basketSlice";
import homeReduser from "./home/homeSlice";
import userReduser from "./user/userSlice";
import reviewReduser from "./review/reviewSlice";

const store = configureStore({
  reducer: {
    basket: basketReduser,
    home: homeReduser,
    user: userReduser,
    review: reviewReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
