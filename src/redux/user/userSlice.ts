import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthorization } from "./asyncActions";





const userSlice = createSlice({
  name: "user",
  initialState: { user : {id: '', role: '', avatar: '', name: '',authorized: false, expences: 0} },
  reducers: {
    IncExpences(state, action: PayloadAction<number>) {
      state.user.expences += action.payload;
    },

    DecExpences(state, action: PayloadAction<number>) {
      state.user.expences += action.payload;
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
      console.log("Error: " + action.error.message)
    });


  }});

export const {IncExpences, DecExpences} = userSlice.actions;
export default userSlice.reducer;
