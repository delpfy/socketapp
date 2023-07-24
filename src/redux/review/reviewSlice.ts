import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReviewsDisplay, Status } from "../types";
import { createReview, deleteReview, getItemReviews, updateAllUserReviews, updateReview } from "./asyncActions";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: {} as ReviewsDisplay,
    review: {
      id: "",
      item: "",
      user: "",
      userName: "",
      description: "",
      rating: 0,
      advantages: "",
      disadvantages: "",
      updatedAt: ""
    },
    status_review: "" as Status,
    status_PROCESS_review: "" as Status,
  },

  reducers: {
    set_status_PROCESS_review(state, action: PayloadAction<Status>) {
      state.status_PROCESS_review = action.payload;
    },
  },
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
      console.log("PAYLOAD getItemReviews success " + action.payload);
    });
    builder.addCase(getItemReviews.pending, (state, action) => {
      state.status_review = "pending";
      console.log("PAYLOAD getItemReviews pending " + action.payload);
    });
    builder.addCase(getItemReviews.rejected, (state, action) => {
      state.status_review = "error";
    });

    // Update review.
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.status_PROCESS_review = "success";
      state.status_review = "pending";
    });
    builder.addCase(updateReview.pending, (state, action) => {
      state.status_PROCESS_review = "pending";
      state.status_review = "pending";
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      state.status_PROCESS_review = "error";
      state.status_review = "pending";
    });

    // Delete review.
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      console.log("PAYLOAD updateReview success " + action.payload);
    });
    builder.addCase(deleteReview.pending, (state, action) => {
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
    });

    // Update all user reviews.
    builder.addCase(updateAllUserReviews.fulfilled, (state, action) => {
    });
    builder.addCase(updateAllUserReviews.pending, (state, action) => {
    });
    builder.addCase(updateAllUserReviews.rejected, (state, action) => {
    });


    
  },
});

export const { set_status_PROCESS_review } = reviewSlice.actions;
export default reviewSlice.reducer;
