import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { Category } from "../types"; 


export const uploadCategoryImage = createAsyncThunk<any, FormData>(
    "category/uploadCategoryImage",
    async function (formData) {
      const { data } = await axios.post<any>(`/upload-category-image`, formData, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", 
        },
      });
  
      return data;
    }
  );


  export const uploadSubcategoryImage = createAsyncThunk<any, FormData>(
    "category/uploadSubcategoryImage",
    async function (formData) {
      const { data } = await axios.post<any>(`/upload-category-image`, formData, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", 
        },
      });
  
      return data;
    }
  );

export const createCategory = createAsyncThunk<
  Category,
  { categoryData: {name: string, image: string, subcategories: any[]} }
>("category/createCategory", async (params) => {
  const { data } = await axios.post<Category>(
    "/categories",
    params.categoryData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const getAllCategories = createAsyncThunk<Category[]>(
  "category/getAllCategories",
  async (params) => {
    const { data } = await axios.get<Category[]>("/categories");
    return data;
  }
);

export const getCategoryById = createAsyncThunk<
  Category,
  { categoryId: string }
>("category/getCategoryById", async (params) => {
  const { data } = await axios.get<Category>(
    `/categories/${params.categoryId}`
  );
  return data;
});

export const updateCategory = createAsyncThunk<
  Category,
  { categoryId: string; categoryData: Partial<Category> }
>("category/updateCategory", async (params) => {
  const { data } = await axios.put<Category>(
    `/categories/${params.categoryId}`,
    params.categoryData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const deleteCategory = createAsyncThunk<string, { categoryId: string }>(
  "category/deleteCategory",
  async (params) => {
    const { data } = await axios.delete(
      `/categories/${params.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  }
);
