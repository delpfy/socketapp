import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Authorize,
  checkAuthorization,
  confirmEmail,
  Register,
  ResetPassword,
  Update,
  UpdatePassword,
} from "./asyncActions";
import { Status, UserDisplay } from "../types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "error" as Status,
    user_status: "pending" as Status,
    confirmEmail_status: "error" as Status,
    user: {
      id: "",
      role: "",
      avatar: "",
      name: "",
      email: "",
      authorized: false,
      authorized_admin: false,
      expences: 0,
      emailConfirmed: false,
      newsletterSub: false,
    },
    token: "",
    emailConfirmationToken: "",
    emailConfirmed: false,
    passToken: "",
    avatarFile: {} as any,
  },
  reducers: {
    NullifyToken(state) {
      state.token = "";
      state.user.authorized = false;
      state.user.name = "";
      localStorage.removeItem("token");
    },
    setUserExpences(state, action: PayloadAction<number>) {
      state.user.expences = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },

    authorizeAdmin(state, action: PayloadAction<boolean>) {
      state.user.authorized_admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Verify Authorization.
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      if (action.payload.user.emailConfirmed) {
        state.user.authorized = true;
        state.user.id = action.payload.user._id;
        state.user.email = action.payload.user.email;
        state.user.role = action.payload.user.role;
        state.user.avatar = action.payload.user.avatarUrl;
        state.user.expences = action.payload.user.expences;
        state.user.name = action.payload.user.fullName;
        state.user_status = "success";
      } else {
        state.user_status = "error";
      }
    });

    builder.addCase(checkAuthorization.pending, (state) => {
      state.user.authorized = false;
      state.user_status = "pending";
    });
    builder.addCase(checkAuthorization.rejected, (state, action) => {
      state.user.authorized = false;
      state.user_status = "error";
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

    // Register.
    builder.addCase(Register.fulfilled, (state, action) => {
      state.user.authorized = false;
      state.token = action.payload.token;
      state.emailConfirmationToken = action.payload.emailConfirmationToken;

      state.confirmEmail_status = "success";
    });
    builder.addCase(Register.pending, (state) => {
      state.user.authorized = false;
      state.confirmEmail_status = "pending";
    });
    builder.addCase(Register.rejected, (state, action) => {
      state.user.authorized = false;
      state.confirmEmail_status = "error";
    });

    //Confirm email

    builder.addCase(confirmEmail.fulfilled, (state, action) => {
      console.log("action.payload.success " + action.payload.success);
      if (action.payload.success) {
        state.emailConfirmed = true;
        state.user_status = "success";
      }
    });
    builder.addCase(confirmEmail.pending, (state) => {});
    builder.addCase(confirmEmail.rejected, (state, action) => {});
    // Update.
    builder.addCase(Update.fulfilled, (state, action) => {});
    builder.addCase(Update.pending, (state) => {});
    builder.addCase(Update.rejected, (state, action) => {});

    // Reset Password.
    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.passToken = action.payload.token.slice(2, 8);
      state.status = "success";
    });
    builder.addCase(ResetPassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.status = "error";
    });

    // Update Password.
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {});
    builder.addCase(UpdatePassword.pending, (state) => {});
    builder.addCase(UpdatePassword.rejected, (state, action) => {});
  },
});

export const { NullifyToken, setUserExpences, setUserEmail, authorizeAdmin } =
  userSlice.actions;
export default userSlice.reducer;
