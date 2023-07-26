import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReviewsDisplay, Status } from "../types";
import {
  createReview,
  deleteReview,
  getItemReviews,
  updateAllUserReviews,
  updateReview,
} from "./asyncActions";

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
      replies: [],
      advantages: "",
      disadvantages: "",
      updatedAt: "",
    },
    status_review: "" as Status,
    status_PROCESS_item: "pending" as Status,

    item_reviewsAmount: 0,
    item_ratingAmount: 0,
    item_totalRating: 0,
    item_noMoreReviews: false,
  },

  reducers: {
    setTotalRating(
      state,
      action: PayloadAction<{ prevStars: number; stars: number; func: string }>
    ) {
      switch (action.payload.func) {
        case "append":
          state.item_reviewsAmount += 1;
          state.item_ratingAmount += parseInt(action.payload.stars.toString());
          state.item_totalRating = Math.round(
            parseInt(state.item_ratingAmount.toString()) /
              state.item_reviewsAmount
          );

          break;
        case "reduce":
          state.item_reviewsAmount -= 1;
          state.item_ratingAmount -= parseInt(action.payload.stars.toString());
          state.item_totalRating = Math.round(
            parseInt(state.item_ratingAmount.toString()) /
              state.item_reviewsAmount
          );
          console.log("state.item_ratingAmount " + state.item_ratingAmount);
          console.log("state.item_reviewsAmount " + state.item_reviewsAmount);
          if (state.item_ratingAmount === 0 && state.item_reviewsAmount === 0) {
            state.item_totalRating = 0;
            state.item_noMoreReviews = true;
          }

          break;
        case "change":
          state.item_ratingAmount -= parseInt(
            action.payload.prevStars.toString()
          );
          state.item_ratingAmount += parseInt(action.payload.stars.toString());
          state.item_totalRating = Math.round(
            parseInt(state.item_ratingAmount.toString()) /
              state.item_reviewsAmount
          );

          break;
      }
    },

    nullifyTotalRating(state) {
      state.item_totalRating = 0;
    },

    disableNoMoreReviews(state) {
      state.item_noMoreReviews = false;
    },

    setRatingAmount(state, action: PayloadAction<number>) {
      state.item_ratingAmount = action.payload;
      console.log(" item_ratingAmount " + action.payload);
    },

    setReviewsAmount(state, action: PayloadAction<number>) {
      state.item_reviewsAmount = action.payload;
      console.log(" item_reviewsAmount " + action.payload);
    },
  },
  extraReducers: (builder) => {
    // Post review.
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.status_review = "success";
    });
    builder.addCase(createReview.pending, (state, action) => {
      state.status_review = "pending";
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.status_review = "error";
    });

    // Post review.
    builder.addCase(getItemReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status_review = "success";
    });
    builder.addCase(getItemReviews.pending, (state, action) => {
      state.status_review = "pending";
    });
    builder.addCase(getItemReviews.rejected, (state, action) => {
      state.status_review = "error";
    });

    // Update review.
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.status_review = "pending";
    });
    builder.addCase(updateReview.pending, (state, action) => {
      state.status_review = "pending";
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      state.status_review = "pending";
    });

    // Delete review.
    builder.addCase(deleteReview.fulfilled, (state, action) => {});
    builder.addCase(deleteReview.pending, (state, action) => {});
    builder.addCase(deleteReview.rejected, (state, action) => {});

    // Update all user reviews.
    builder.addCase(updateAllUserReviews.fulfilled, (state, action) => {});
    builder.addCase(updateAllUserReviews.pending, (state, action) => {});
    builder.addCase(updateAllUserReviews.rejected, (state, action) => {});
  },
});

export const {
  setTotalRating,
  setRatingAmount,
  setReviewsAmount,
  nullifyTotalRating,
  disableNoMoreReviews,
} = reviewSlice.actions;
export default reviewSlice.reducer;
