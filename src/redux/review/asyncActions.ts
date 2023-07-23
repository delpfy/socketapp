import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  IReview, ReviewsDisplay,
} from "../types";


export const createReview = createAsyncThunk<"", IReview>(
  "reviews/create",
  async (params) => {
    const { data } = await axios.post(`/reviews`, params, {
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

