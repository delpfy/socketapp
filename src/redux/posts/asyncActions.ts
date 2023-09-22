import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { TPost, TPostDisplay, TPostGET, TPostPOST } from "../types";

export const getAllPosts = createAsyncThunk<TPostDisplay>(
  "posts/getAllPosts",
  async function () {
    const { data } = await axios.get<TPostDisplay>(`/posts`);
    return data;
  }
);

export const getPostById = createAsyncThunk<TPostGET, string>(
  "posts/getPostById",
  async (params) => {
    const { data } = await axios.get<TPostGET>(`/posts/${params}`);
    console.log(data);
    return data;
  }
);

export const updatePost = createAsyncThunk<
  TPostDisplay,
  { itemId: string; params: {} }
>("posts/updatePost", async (params) => {
  const { data } = await axios.patch<TPostDisplay>(
    `/posts/${params.itemId}`,
    params.params,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const createPost = createAsyncThunk<TPostDisplay, TPostPOST>(
  "posts/createPost",
  async (params) => {
    const { data } = await axios.post<TPostDisplay>(`/posts`, params, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const deletePost = createAsyncThunk<TPostDisplay, { itemId: string }>(
  "posts/deletePost",
  async (params) => {
    const { data } = await axios.delete<TPostDisplay>(
      `/posts/${params.itemId}`,
      {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  }
);
