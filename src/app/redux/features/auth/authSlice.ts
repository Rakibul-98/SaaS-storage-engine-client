import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { AuthState } from "./auth.types";
import { baseApi } from "../../api/baseApi";

const getStoredToken = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem(key);
    if (!token) return null;
    // Validate token is not expired before using it
    if (key === "accessToken") {
      const decoded = jwtDecode<{ exp?: number }>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
    }
    return token;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  accessToken: getStoredToken("accessToken"),
  refreshToken: getStoredToken("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      try {
        state.user = jwtDecode(accessToken);
      } catch {
        state.user = null;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      baseApi.util.resetApiState();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
