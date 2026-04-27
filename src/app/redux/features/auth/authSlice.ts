import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { AuthState } from "./auth.types";
import { baseApi } from "../../api/baseApi";

const getInitialToken = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  accessToken: getInitialToken("accessToken"),
  refreshToken: getInitialToken("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = jwtDecode(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      baseApi.util.resetApiState();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
