import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthorization } from "./asyncActions";





const userSlice = createSlice({
  name: "user",
  initialState: { user : {id: '', role: '', avatar: '', name: '',authorized: false} },
  reducers: {
    SetUser(state, action: PayloadAction<string>) {
      state.user.id = action.payload;
    },

  },
  extraReducers: (builder) => {

    // Verify Authorization.
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user.authorized = true;
      state.user.id = action.payload.user._id;
      state.user.role = action.payload.user.role;
      state.user.avatar = action.payload.user.avatarUrl;
      state.user.name = action.payload.user.fullName;
    });
    builder.addCase(checkAuthorization.pending, (state) => {
      state.user.authorized = false;
    });
    builder.addCase(checkAuthorization.rejected, (state, action) => {
      state.user.authorized = false;
      alert("Error: " + action.error.message)
    });


  }});

export const {SetUser} = userSlice.actions;
export default userSlice.reducer;
