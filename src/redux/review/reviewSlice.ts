import { createSlice } from "@reduxjs/toolkit";
import { ReviewsDisplay, Status } from "../types";
import { createReview, getItemReviews } from "./asyncActions";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: {} as ReviewsDisplay,
    review: {
      item: "",
      description: "",
      rating: 0,
      advantages: "",
      disadvantages: "",
    },
    status_review: "" as Status,
  },

  reducers: {},
  extraReducers: (builder) => {
    // Post review.
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status_review = "success";
      console.log("PAYLOAD createReview success " + action.payload);
    });
    builder.addCase(createReview.pending, (state, action) => {
      state.status_review = "pending";
      console.log("PAYLOAD createReview pending " + action.payload);
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.status_review = "error";
    });

    // Post review.
    builder.addCase(getItemReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status_review = "success";
      console.log("PAYLOAD createReview success " + action.payload);
    });
    builder.addCase(getItemReviews.pending, (state, action) => {
      state.status_review = "pending";
      console.log("PAYLOAD createReview pending " + action.payload);
    });
    builder.addCase(getItemReviews.rejected, (state, action) => {
      state.status_review = "error";
    });
  },
});

export default reviewSlice.reducer;
