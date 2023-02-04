import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  userOrdersList:[],
  order: null,
  loading: false,
  error: null,
  monthlyOrderTotal: 0,
  productOrderCountByMonth: [],
};

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/orders`, config);
    return response.data;
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (id, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseUrl}/orders/${id}`, config);
    return response.data;
  }
);

export const orderIsPaid = createAsyncThunk(
  "orders/orderIsPaid",
  async (id, thunkAPI) => {
    try {
      const { userLogin } = thunkAPI.getState().user;
      const { token } = userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${baseUrl}/orders/pay/${id}`,{}, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
    
);

export const orderIsDelivered = createAsyncThunk(
  "orders/orderIsDelivered",
  async (id, thunkAPI) => {
    try {
      const { userLogin } = thunkAPI.getState().user;
      const { token } = userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${baseUrl}/orders/${id}/deliver`,{}, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
    
);

export const clientOrders = createAsyncThunk(
  "orders/clientOrders",
  async (params, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const {page, pageSize ,id} = params;


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
        page,
        pageSize,        
      }
    };
    const response = await axios.get(`${baseUrl}/orders/client`, config);
    return response.data;
  }
);

export const userOrders = createAsyncThunk(
  "orders/userOrders",
  async (params, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token ,_id} = userLogin;


    const {page, pageSize } = params;


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: _id,
        page,
        pageSize,        
      }
    };
    const response = await axios.get(`${baseUrl}/orders/user`,config);
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${baseUrl}/orders`, order, config);
    return response.data;
  }
);



export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, thunkAPI) => {
    const { userLogin } = thunkAPI.getState().user;
    const { token } = userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${baseUrl}/orders/${id}`, config);
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    
    },
    resetOrders: (state) => {
      state.orders = [];
    
    },
    resetUserOrders: (state) => {
      state.userOrdersList = [];
    
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderIsPaid.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderIsPaid.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderIsPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderIsDelivered.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderIsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderIsDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clientOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(clientOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(clientOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrdersList = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order =action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })     
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.meta.arg
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });  
  },
});

export const {
  resetOrder,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersError,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderError,
  createOrderStart,
  createOrderSuccess,
  createOrderError, 
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderError,
  clientOrdersStart,
  clientOrdersSuccess,
  clientOrdersError,
  userOrdersStart,
  userOrdersSuccess,
  userOrdersError,
  orderIsPaidStart,
  orderIsPaidSuccess,
  orderIsPaidError,
  orderIsDeliveredStart,
  orderIsDeliveredSuccess,
  orderIsDeliveredError,
  resetOrders,
  resetUserOrders,
 
} = orderSlice.actions;

export default orderSlice.reducer;
