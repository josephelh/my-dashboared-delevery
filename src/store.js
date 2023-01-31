import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import clientSlice from "./slices/clientSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
import cartSlice from "./slices/cartSlice"; 


const reducers = combineReducers({
  products : productSlice,
  clients: clientSlice,
  user: userSlice,
  orders :orderSlice,
  cart : cartSlice,
  
 
});

const store = configureStore(
  { reducer: reducers}
  );

export default store;