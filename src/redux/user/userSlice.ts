import { createSlice } from "@reduxjs/toolkit";
import {
  Authorize,
  checkAuthorization,
  Register,
  Update,
  UploadAvatar,
} from "./asyncActions";
import { UserDisplay } from "../types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      role: "",
      avatar: "",
      name: "",
      email: "",
      authorized: false,
      expences: 0,
    },
    token: "",
    avatarFile: {} as any,
  },
  reducers: {
    NullifyToken(state) {
      state.token = "";
      state.user.authorized = false;
      state.user.name = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Verify Authorization.
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user.authorized = true;
      state.user.id = action.payload.user._id;
      state.user.email = action.payload.user.email;
      state.user.role = action.payload.user.role;
      state.user.avatar = action.payload.user.avatarUrl;
      state.user.expences = action.payload.user.expences;
      state.user.name = action.payload.user.fullName;
    });

    builder.addCase(checkAuthorization.pending, (state) => {
      state.user.authorized = false;
    });
    builder.addCase(checkAuthorization.rejected, (state, action) => {
      state.user.authorized = false;
    });

    // Authorize.
    builder.addCase(Authorize.fulfilled, (state, action) => {
      state.user.authorized = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(Authorize.pending, (state) => {
      state.user.authorized = false;
    });
    builder.addCase(Authorize.rejected, (state, action) => {
      state.user.authorized = false;
    });

    // Upload avatar.
    builder.addCase(UploadAvatar.fulfilled, (state, action) => {
      state.avatarFile = action.payload.url;
      console.log("action.payload.url " + action.payload.url);
    });
    builder.addCase(UploadAvatar.pending, (state) => {});
    builder.addCase(UploadAvatar.rejected, (state, action) => {});

    // Register.
    builder.addCase(Register.fulfilled, (state, action) => {
      state.user.authorized = false;
      state.token = action.payload.token;
    });
    builder.addCase(Register.pending, (state) => {
      state.user.authorized = false;
    });
    builder.addCase(Register.rejected, (state, action) => {
      state.user.authorized = false;
    });

    // Update.
    builder.addCase(Update.fulfilled, (state, action) => {});
    builder.addCase(Update.pending, (state) => {});
    builder.addCase(Update.rejected, (state, action) => {});
  },
});

export const { NullifyToken } = userSlice.actions;
export default userSlice.reducer;
