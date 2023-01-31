import { createSlice } from "@reduxjs/toolkit";
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems },
  reducers: {
    addToCart: (state, action) => {
      const { product,name,price,image, qty = 1 } = action.payload;
      state.cartItems.push({ product, name,image ,price, qty });
      const cartItems = state.cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
      const cartItems = state.cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x.product === id ? { ...x, qty } : x
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
