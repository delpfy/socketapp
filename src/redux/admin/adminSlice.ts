import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AdminProcesses,
  Attribute,
  Category,
  Status,
  UserDisplay,
} from "../types";
import {
  createAttributes,
  createCategory,
  deleteAttributes,
  deleteCategory,
  getAllCategories,
  getAttributesByCategory,
  getCategoryById,
  updateAttributes,
  updateCategory,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "./asyncActions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "pending",
    process: "none" as AdminProcesses,
    second_process: "none" as AdminProcesses,
    third_process: "none" as AdminProcesses,
    _categories: [] as any[],
    _attributes: {} as Attribute,
    categoryImage: "",
    subcategoryImage: "",
    selectedItem: {},
    selectedCategory: {} as Category,
  },
  reducers: {
    setProcess(state, action: PayloadAction<AdminProcesses>) {
      state.process = action.payload;
    },
    setSecondProcess(state, action: PayloadAction<AdminProcesses>) {
      state.second_process = action.payload;
    },
    setThirdProcess(state, action: PayloadAction<AdminProcesses>) {
      state.third_process = action.payload;
    },

    clearCurrentImages(state) {
      state.categoryImage = "";
    },
    setCurrentImages(state, action: PayloadAction<string>) {
      state.categoryImage = action.payload;
    },

    clearAttributes(state){
      state._attributes = {} as Attribute
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadCategoryImage.fulfilled, (state, action) => {
      /* state.avatarFile = action.payload.url; */
      state.categoryImage = action.payload.url;
    });
    builder.addCase(uploadCategoryImage.pending, (state) => {});
    builder.addCase(uploadCategoryImage.rejected, (state, action) => {});

    builder.addCase(uploadSubcategoryImage.fulfilled, (state, action) => {
      /* state.avatarFile = action.payload.url; */
      state.subcategoryImage = action.payload.url;
    });
    builder.addCase(uploadSubcategoryImage.pending, (state) => {});
    builder.addCase(uploadSubcategoryImage.rejected, (state, action) => {});

    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.process = "show-many-categories";
        state._categories.push(action.payload);
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
        state.process = "show-many-categories";
        state._categories = action.payload;
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
        state.categoryImage = action.payload.image;
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

    builder
      .addCase(createAttributes.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.process = "show-many-attributes";
      })
      .addCase(createAttributes.pending, (state) => {
        state.status = "pending";
      })

      .addCase(createAttributes.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getAttributesByCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload.items[0]);
        state._attributes._id = action.payload.items[0]
        ? action.payload.items[0]._id
        : '';
        state._attributes.category = action.payload.items[0]
          ? action.payload.items[0].category
          : "";
        state._attributes.attributes = action.payload.items[0]
          ? action.payload.items[0].attributes
          : [];
         
        
      })
      .addCase(getAttributesByCategory.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getAttributesByCategory.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(updateAttributes.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(updateAttributes.pending, (state) => {
        state.status = "pending";
      })

      .addCase(updateAttributes.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(deleteAttributes.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(deleteAttributes.pending, (state) => {
        state.status = "pending";
      })

      .addCase(deleteAttributes.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const {
  setProcess,
  clearAttributes,
  setSecondProcess,
  setThirdProcess,
  clearCurrentImages,
  setCurrentImages,
} = adminSlice.actions;
export default adminSlice.reducer;
