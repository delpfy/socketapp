import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  IReviewPOST, ReviewsDisplay,
} from "../types";


export const createReview = createAsyncThunk<"", IReviewPOST>(
  "reviews/createReview",
  async (params) => {
    const { data } = await axios.post(`/reviews`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const updateReview = createAsyncThunk<"", IReviewPOST>(
  "reviews/updateReview",
  async (params) => {
    const { data } = await axios.patch(`/reviews/${params._id}`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const deleteReview = createAsyncThunk<"", {_id: string}>(
  "reviews/deleteReview",
  async (item) => {
    const { data } = await axios.delete(`/reviews/${item._id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const updateAllUserReviews = createAsyncThunk<"", {userName: string}>(
  "reviews/updateAllUserReviews",
  async (params) => {
    const { data } = await axios.patch(`/reviews/user/...`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);



export const getItemReviews = createAsyncThunk<ReviewsDisplay, string>(
  "reviews/getItemReviews",
  async (params) => {
    console.log("DATA " + 1);
    console.log("Params " + params); // Here is Id.
    const { data } = await axios.get<ReviewsDisplay>(`/reviews/${params}`);
    console.log("DATA " + data);
    return data;
  }
);

