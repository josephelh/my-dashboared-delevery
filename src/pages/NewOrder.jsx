import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQty, removeFromCart, clearCart } from "../slices/cartSlice";
import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { createOrder,resetOrder } from "../slices/orderSlice";

const NewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);
  const client = useSelector((state) => state.clients.client);
  const user = useSelector((state) => state.user.userLogin);
  const order = useSelector((state) => state.orders.order);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    setSubTotal(
      addDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
    setTaxPrice(addDecimals(Number((0.2 * subTotal).toFixed(2))));
    setTotal((Number(subTotal) + Number(taxPrice)).toFixed(2));
  }, [taxPrice, subTotal, dispatch, cartItems]);

  useEffect(() => {
    if (order) {
      navigate(`/client/${client._id}`);
      dispatch(clearCart());
      dispatch(resetOrder());
    }
  },[dispatch,navigate, order, client._id]);

  const handleQuantityUpdate = (id, qty) => {
    dispatch(updateQty(id, qty));
  };
  const removeFromCartHanler = (id) => {
    dispatch(removeFromCart(id));
  };

  const goBack = () => {
    navigate("/");
  };

  const submitOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        taxPrice: taxPrice,
        totalPrice: total,
        client: client._id,
        user: user._id,
      })
    );
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="mx-3 my-3">
          <h1 className="mb-3 text-3xl font-semibold">
            No Items In the Order{" "}
          </h1>
          <button
            onClick={() => goBack()}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div>
          <div className="flex">
            <div className="w-8/12">
              <table className="w-full ml-2">
                <thead className="border-b bg-green-300 border-green-500">
                  <tr>
                    <th className="text-md text-left font-bold uppercase text-gray-900 px-3 py-4">
                      Products
                    </th>
                    <th
                      scope="col"
                      className="text-md text-left font-bold uppercase text-gray-900 px-3 py-4"
                    >
                      price
                    </th>
                    <th
                      scope="col"
                      className="text-md text-left font-bold uppercase  text-gray-900 px-3 py-4"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="text-md text-left font-bold uppercase  text-gray-900 px-3 py-4"
                    >
                      SubTotal
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    return (
                      <tr
                        className="border-b-2 bg-white border-indigo-200"
                        key={item.product}
                      >
                        <td className="text-md text-gray-900 font-semibold px-3 py-4 border-r-2 border-gray-400">
                          {item.name}
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                          {item.price}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                          {/* <input
                            type="number"
                            min="1"
                            step="1"
                            onChange={(e) =>
                              handleQuantityUpdate({
                                id: item.product,
                                qty: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 w-16 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                            defaultValue={item.qty}
                            required
                          /> */}

                          <select
                            onChange={(e) =>
                                handleQuantityUpdate({
                                  id: item.product,
                                  qty:parseInt(e.target.value),
                                })
                              }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </td>
                        <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                          {(item.qty * item.price).toFixed(2)}
                        </td>
                        <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                          <HiTrash
                            className="mr-2 text-red-500 text-4xl"
                            onClick={() => removeFromCartHanler(item.product)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mx-3 mt-6">
                <button
                  onClick={() => submitOrderHandler()}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-5 text-xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
                >
                  Submit Order
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center w-4/12">
              <div className=" md:mx-1 w-5/6 divide-y mb-7 border border-gray-400 py-3  ">
                <div className="flex mx-4 mb-7">
                  <div className="md:text-xl w-1/2 text-2xl font-bold ">
                    <p>Tax Price</p>
                  </div>
                  <div className="md:text-xl w-1/2 text-2xl font-bold ">
                    <p>: {taxPrice}$</p>
                  </div>
                </div>
                <div className="flex mx-6 mb-7">
                  <div className="md:text-xl w-1/2 text-2xl font-bold">
                    <p>Sub Total</p>
                  </div>
                  <div className="md:text-xl w-1/2 text-2xl font-bold">
                    <p>: {subTotal}$ </p>
                  </div>
                </div>
                <div className="flex  mx-6">
                  <div className="md:text-xl w-1/2 text-2xl font-bold">
                    <p>Total </p>
                  </div>
                  <div className="md:text-xl w-1/2 text-2xl font-bold">
                    <p>: {total}$ </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewOrder;
