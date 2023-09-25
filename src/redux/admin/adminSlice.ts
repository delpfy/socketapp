import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AdminProcesses,
  Attribute,
  Category,
  Status,
  TOrder,
  UserDisplay,
} from "../types";
import {
  createAttributes,
  createBanner,
  createCategory,
  createUser,
  deleteAttributes,
  deleteBanner,
  deleteCategory,
  getAllBanners,
  getAllCategories,
  getAllOrders,
  getAllUsers,
  getAttributesByCategory,
  getBannerById,
  getCategoryById,
  getOrderById,
  getUserById,
  updateAttributes,
  updateBanner,
  updateCategory,
  updateOrder,
  uploadBannerImage,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "./asyncActions";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: "pending",
    process: "show-many-categories" as AdminProcesses,
    second_process: "none" as AdminProcesses,
    third_process: "none" as AdminProcesses,
    _categories: [] as any[],
    _users: [] as any[],
    _currentUser: {} as any,
    _orders: [] as any[],
    _currentOrder: {} as TOrder,
    _reviews: [] as any[],
    _attributes: {} as Attribute,
    _banners: [] as any[],
    bannerImage: "",
    categoryImage: "",
    subcategoryImage: "",
    selectedItem: {},
    selectedCategory: {} as Category,
    selectedBanner: {} as Category,
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

    clearCurrentCategoryImages(state) {
      state.categoryImage = "";
    },

    clearCurrentBannerImages(state) {
      state.bannerImage = "";
    },
    setCurrentCategoryImages(state, action: PayloadAction<string>) {
      state.categoryImage = action.payload;
    },

    clearAttributes(state) {
      state._attributes = {} as Attribute;
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

    builder.addCase(uploadBannerImage.fulfilled, (state, action) => {
      /* state.avatarFile = action.payload.url; */
      state.bannerImage = action.payload.url;
    });
    builder.addCase(uploadBannerImage.pending, (state) => {});
    builder.addCase(uploadBannerImage.rejected, (state, action) => {});

    builder
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.process = "show-many-banners";
        state._banners.push(action.payload);
      })
      .addCase(createBanner.pending, (state) => {
        state.status = "pending";
      })

      .addCase(createBanner.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.status = "fulfilled";
        
        state._banners = action.payload;
      })
      .addCase(getAllBanners.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getAllBanners.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getBannerById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.selectedBanner = action.payload;
        state.bannerImage = action.payload.image;
      })
      .addCase(getBannerById.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getBannerById.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(updateBanner.pending, (state) => {
        state.status = "pending";
      })

      .addCase(updateBanner.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(deleteBanner.pending, (state) => {
        state.status = "pending";
      })

      .addCase(deleteBanner.rejected, (state, action) => {
        state.status = "rejected";
      });

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

        state._attributes._id = action.payload.items[0]
          ? action.payload.items[0]._id
          : "";
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

    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state._users = action.payload.users;
        console.log(action.payload.users);
        state.status = "fulfilled";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state._orders = action.payload.orders;

        state.status = "fulfilled";
      })
      .addCase(getAllOrders.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getOrderById.fulfilled, (state, action) => {
        state._currentOrder = action.payload.order;

        state.status = "fulfilled";
      })
      .addCase(getOrderById.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(updateOrder.fulfilled, (state, action) => {
        state._orders = action.payload.orders;
        state.status = "fulfilled";
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "pending";
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state._currentUser = action.payload;
        console.log(action.payload);
        state.status = "fulfilled";
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.status = "rejected";
      });

    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(createUser.pending, (state) => {
        state.status = "pending";
      })

      .addCase(createUser.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const {
  setProcess,
  clearAttributes,
  setSecondProcess,
  setThirdProcess,
  clearCurrentCategoryImages,
  setCurrentCategoryImages,
  clearCurrentBannerImages,
} = adminSlice.actions;
export default adminSlice.reducer;
