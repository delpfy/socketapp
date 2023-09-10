import { configureStore } from "@reduxjs/toolkit";
import basketReduser from "./basket/basketSlice";
import homeReduser from "./home/homeSlice";
import userReduser from "./user/userSlice";
import adminReduser from "./admin/adminSlice";
import reviewReduser from "./review/reviewSlice";
import orderReduser from "./order/orderSlice";
import postReduser from "./posts/postsSlice";

const store = configureStore({
  reducer: {
    basket: basketReduser,
    home: homeReduser,
    user: userReduser,
    admin: adminReduser,
    reviews: reviewReduser,
    orders: orderReduser,
    posts: postReduser,
    
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
