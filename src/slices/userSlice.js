import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {  
  userLogin: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: false,
  error: null,
};

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/users/${id}`, config);
    return response.data;
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {
  const { userLogin } = thunkAPI.getState().user;
  const { token } = userLogin;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${baseUrl}/users/${user._id}`, user, config);
  return response.data;
});


export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${baseUrl}/users/login`,
        { email, password },
        config
      );
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {     
        state.user = null;      
      },   
  },
  extraReducers: (build) => {    
    
    build.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    build.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    build.addCase(updateUser.pending, (state) => {
        state.loading = true;
      });
      build.addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userLogin));
      });
      build.addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    build.addCase(login.pending, (state) => {
      state.loading = true;
    });
    build.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userLogin = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userLogin));
    });
    build.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    build.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    build.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.userLogin = null;
    });
    build.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
   fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsError,
  loginStart,
  loginSuccess,
  loginError,
  logoutStart,
  logoutSuccess,
  logoutError,
  udpateUserStart,
  udpateUserSuccess,
  udpateUserError,
  resetUser,  
} = userSlice.actions;

export default userSlice.reducer;
