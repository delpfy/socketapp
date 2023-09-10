import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AdminProcesses, Category, Status, UserDisplay } from "../types";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "./asyncActions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "pending",
    process: 'show-many-categories' as AdminProcesses,
    second_process: 'none' as AdminProcesses,
    third_process: 'none' as AdminProcesses,
    categories: [] as any[],
    categoryImage: '',
    subcategoryImage: '',
    selectedCategory: {} as Category,
  },
  reducers: {
    setProcess (state, action: PayloadAction<AdminProcesses>) {
        state.process = action.payload;
      },
      setSecondProcess (state, action: PayloadAction<AdminProcesses>) {
        state.second_process = action.payload;
      },
      setThirdProcess (state, action: PayloadAction<AdminProcesses>) {
        state.third_process = action.payload;
      },
      
      clearCurrentImages(state) {
        state.categoryImage = '';
      },
      setCurrentImages(state, action: PayloadAction<string>) {
        state.categoryImage = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadCategoryImage.fulfilled, (state, action) => {
        /* state.avatarFile = action.payload.url; */
        state.categoryImage = action.payload.url
      });
      builder.addCase(uploadCategoryImage.pending, (state) => {});
      builder.addCase(uploadCategoryImage.rejected, (state, action) => {});

      builder.addCase(uploadSubcategoryImage.fulfilled, (state, action) => {
        /* state.avatarFile = action.payload.url; */
        state.subcategoryImage = action.payload.url
      });
      builder.addCase(uploadSubcategoryImage.pending, (state) => {});
      builder.addCase(uploadSubcategoryImage.rejected, (state, action) => {});


    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.process = 'show-many-categories';
        state.categories.push(action.payload);
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "pending";
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.process = 'show-many-categories';
        state.categories = action.payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.selectedCategory = action.payload;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "pending";
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "pending";
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const {
    setProcess,
    setSecondProcess,
    setThirdProcess,
    clearCurrentImages,
setCurrentImages,
  } = adminSlice.actions;
export default adminSlice.reducer;
