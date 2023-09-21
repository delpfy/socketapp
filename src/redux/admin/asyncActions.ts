import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { Attribute, Category, TOrder, TOrders, UserRegister } from "../types";

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
  { categoryData: { name: string; image: string; subcategories: any[] } }
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
  const { data } = await axios.patch<Category>(
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
    const { data } = await axios.delete(`/categories/${params.categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const createAttributes = createAsyncThunk<
  Attribute,
  { attributesData: { category: string; attributes: any[] } }
>("attributes/createAttributes", async (params) => {
  const { data } = await axios.post<Attribute>(
    "/attributes",
    params.attributesData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const getAllUsers = createAsyncThunk<any>(
  "users/getAllUsers",
  async (params) => {
    const { data } = await axios.get<any>(`/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const getUserById = createAsyncThunk<any, { userId: string }>(
  "users/getUserById",
  async (params) => {
    const { data } = await axios.get<any>(`/users/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const updateUserById = createAsyncThunk<
  any,
  { userId: string; userData: any }
>("home/updateUserById", async function (params) {
  const { data } = await axios.patch<any>(
    `/update/${params.userId}`,
    params.userData,
    {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );

  return data;
});

export const deleteUser = createAsyncThunk<any, { userId: string }>(
  "users/deleteUser",
  async (params) => {
    const { data } = await axios.delete<any>(`/users/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const createUser = createAsyncThunk<any, any>(
  "users/createUser",
  async function (params) {
    const { data } = await axios.post<any>(`/users`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  }
);

export const getAllOrders = createAsyncThunk<any>(
  "orders/getAllOrders",
  async (params) => {
    const { data } = await axios.get<any>(`/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const getOrderById = createAsyncThunk<any, { orderId: string }>(
  "home/getOrderById",
  async function (params) {
    const { data } = await axios.get<any>(`/orders/${params.orderId}`);
    return data;
  }
);

export const updateOrder = createAsyncThunk<any, {orderId: string, order : TOrder} >(
  "home/updateOrder",
  async (params) => {
    
    const { data } = await axios.patch(`/orders/${params.orderId}`, params.order, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return data;
  }
);

export const getAttributesByCategory = createAsyncThunk<
  any,
  { category: string }
>("attributes/getAttributesByCategory", async (params) => {
  const { data } = await axios.get<any>(`/attributes/${params.category}`);
  return data;
});

export const updateAttributes = createAsyncThunk<
  Attribute,
  {
    attributesId: string;
    attributesData: { category: string; attributes: any[] };
  }
>("attributes/updateAttributes", async (params) => {
  const { data } = await axios.patch<Attribute>(
    `/attributes/${params.attributesId}`,
    params.attributesData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
});

export const deleteAttributes = createAsyncThunk<
  string,
  { attributesId: string }
>("attributes/deleteAttributes", async (params) => {
  const { data } = await axios.delete(`/attributes/${params.attributesId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
});
