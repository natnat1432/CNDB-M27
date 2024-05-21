import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
// Define your initial state
const storedToken = secureLocalStorage.getItem("tkn");
let user = secureLocalStorage.getItem("ud");

// Create your slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: user, token: storedToken },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      secureLocalStorage.setItem("ud", user);
      secureLocalStorage.setItem("tkn", accessToken);

    },
    logOut: (state, action) => {
      secureLocalStorage.clear();
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions and reducer
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;


export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
