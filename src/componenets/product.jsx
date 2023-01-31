import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const Product = ({ image, title, price, id }) => {
  const dispatch = useDispatch();


  const addToCartHandler = () => {
    const existProduct = cartItems.find((p) => p.product === id);
    if (!existProduct){
    dispatch(addToCart({ product:id,name:title,image:image,price:price, qty: 1 }));
    }
  };

  const client = useSelector((state) => state.clients.client);
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="py-3 px-3 h-96 sm:h-80 ">
      <div className="flex flex-col max-w-xs bg-white shadow-lg rounded-lg overflow-hidden h-auto">
        <div className="flex bg-cover justify-center ">
          {" "}
          <img
            className="w-3/4 aspect-square"
            src={
              image
                ? image
                : "https://unctad.org/sites/default/files/inline-images/ccpb_workinggroup_productsafety_800x450.jpg"
            }
          />
        </div>
        <div className="p-4">
          <h1 className="sm:font-semibold sm:text-sm text-gray-900 font-semibold text-base">
            {title}
          </h1>

          <div className="flex item-center justify-between mt-3">
            <h1 className="sm:text-sm text-gray-700 font-bold text-xl">
              ${price}
            </h1>
            <button
              onClick={() => addToCartHandler()}
              disabled={!client}
              className={`sm :px-1 sm:py-1 sm:font-medium px-3 py-2 ${
                !client
                  ? "bg-gray-500 text-white text-xs font-bold uppercase rounded"
                  : "bg-blue-800 text-white text-xs font-bold uppercase rounded"
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
