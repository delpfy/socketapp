import { createSlice } from "@reduxjs/toolkit";
import { Authorize, checkAuthorization, Register } from "./asyncActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      role: "",
      avatar: "",
      name: "",
      authorized: false,
      expences: 0,
    },
    token: "",
  },
  reducers: {
    NullifyToken(state) {
      state.token = "";
      state.user.authorized = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Verify Authorization.
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user.authorized = true;
      state.user.id = action.payload.user._id;
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
      console.log("ACTION " + action.meta.requestStatus)
    });
    builder.addCase(Authorize.pending, (state) => {
      state.user.authorized = false;
    });
    builder.addCase(Authorize.rejected, (state) => {
      state.user.authorized = false;
      
    });

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
  },
});

export const { NullifyToken } = userSlice.actions;
export default userSlice.reducer;
