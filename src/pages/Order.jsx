import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";
import {
  fetchOrder,
  orderIsPaid,
  orderIsDelivered,
} from "../slices/orderSlice";
import { fetchClientDetails } from "../slices/clientSlice";
import { resetOrder , deleteOrder} from "../slices/orderSlice";

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, order } = useSelector((state) => state.orders);
  const client  = useSelector((state) => state.clients.client);
  const date = new Date(order?.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minites = date.getMinutes();

  const paidDate = new Date(order?.paidAt);
  const PaidYear = paidDate.getFullYear();
  const PaidMonth = paidDate.getMonth() + 1;
  const PaidDay = paidDate.getDate();
  const PaidHour = paidDate.getHours();
  const PaidMinites = paidDate.getMinutes();

  const deliveredDate = new Date(order?.deliveredAt);
  const deliveredYear = deliveredDate.getFullYear();
  const deliveredMonth = deliveredDate.getMonth() + 1;
  const deliveredDay = deliveredDate.getDate();
  const deliveredHour = deliveredDate.getHours();
  const deliveredMinites = deliveredDate.getMinutes();


  useEffect(() => {
    
    if (!order || order._id !== id ) {
      dispatch(fetchOrder(id));      
    }else if(order && !client) {
      dispatch(fetchClientDetails(order.client._id));

    }
   
    
  }, [dispatch, id,client, order]);

  const deleteHandler = (id) => {
    if (window.confirm("ete vous sur?")) {
      dispatch(deleteOrder(id));
      navigate(-1);
    }
  };



  useEffect(()=> {
    return ()=>{ dispatch(resetOrder())}
  },[])



  const handelIsPaid = (orderId) => {
    dispatch(orderIsPaid(orderId));
  };
  const handelIsDeleverd = (id) => {
    dispatch(orderIsDelivered(id));
  };

  return (
    <div>
      {loading ? <Loader /> : null}
      {error ? <Message>{error}</Message> : null}
      <div className="flex mt-3 mb-9 px-4">
        <p className="md:text-xl w-1/2 text-2xl font-bold">Order : {order?._id} </p>
        <p className="md:text-xl w-1/2 text-2xl font-bold">
          Order Created At : {`${year}-${month}-${day} at ${hour}:${minites}`}
        </p>
      </div>

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
              </tr>
            </thead>
            <tbody>
              {order?.orderItems.map((item) => {
                return (
                  <tr
                    className="border-b-2 bg-white border-indigo-200"
                    key={item._id}
                  >
                    <td className="text-md text-gray-900 font-semibold px-3 py-4 border-r-2 border-gray-400">
                      {item.name}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                      {item.price}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                      {item.qty}
                    </td>
                    <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                      {item.qty * item.price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col m-7 w-4/5">
            <h2 className="text-2xl mb-4 font-black">Order Client Details</h2>
            <div className="flex mb-3">
              <div className="w-1/2 text-xl font-bold">Client Name</div>
              <div className="w-1/2  text-xl font-bold">: {client?.name}</div>
            </div>
            <div className="flex mb-3">
              <div className="w-1/2  text-xl font-bold">Client Address</div>
              <div className="w-1/2  text-xl font-bold">
                : {client?.address}
              </div>
            </div>
            <div className="flex mb-5">
              <div className="w-1/2  text-xl font-bold">Client Phone</div>
              <div className="w-1/2  text-xl font-bold">: {client?.phone}</div>
            </div>
            {order?.paidAt?(
                <div className="flex mb-3 bg-cyan-200 py-3">
                <div className="w-1/2 bg-cyan-200 text-xl font-bold">Order PAid At</div>
                <div className="w-1/2 text-xl font-bold">: {`${PaidYear}-${PaidMonth}-${PaidDay} at ${PaidHour}:${PaidMinites}`}</div>
              </div>): null}
              {order?.deliveredAt?(
                <div className="flex mb-3 bg-cyan-200 py-3">
                <div className="w-1/2  text-xl font-bold">Order Delivered At</div>
                <div className="w-1/2  text-xl font-bold">: {`${deliveredYear}-${deliveredMonth}-${deliveredDay} at ${deliveredHour}:${deliveredMinites}`}</div>
              </div>): null}
            
          </div>
        </div>
        <div className="flex flex-col items-center w-4/12">
          <div className=" md:mx-1 w-5/6 divide-y mb-7 border border-gray-400 py-3  ">
            <div className="flex mx-6 mb-4 ">
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>Tax Price</p>
              </div>
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>: {order?.taxPrice}</p>
              </div>
            </div>
            <div className="flex mx-6 mb-4">
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>Sub Total</p>
              </div>
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>: {order?.totalPrice - order?.taxPrice} </p>
              </div>
            </div>
            <div className="flex  mx-6">
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>Total </p>
              </div>
              <div className="md:text-xl w-1/2 text-2xl font-bold">
                <p>: {order?.totalPrice}$</p>
              </div>
            </div>
          </div>
          <div className="mx-3 my-3 text-2xl font-bold">
            <button
              disabled={order?.isPaid}
              onClick={() => handelIsPaid(order._id)}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-5 text-2xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-50"
            >
              Mark as Paid
            </button>
          </div>
          <div className="mx-3 my-3">
            <button
              onClick={() => handelIsDeleverd(order._id)}
              type="button"
              disabled={order?.isDelivered}
              className="inline-flex justify-center rounded-md border bg-green-600 border-transparent py-3 px-5 text-2xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:opacity-50"
            >
              Mark as Delivered
            </button>
          </div>
          <div className="mx-3 my-3">
            <button
              onClick={() => deleteHandler(order._id)}
              type="button"
              className="inline-flex justify-center rounded-md border bg-red-600 border-transparent py-3 px-5 text-2xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
