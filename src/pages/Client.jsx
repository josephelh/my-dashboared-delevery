import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";
import { fetchClientDetails, updateClient } from "../slices/clientSlice";
import { clientOrders } from "../slices/orderSlice";
import { HiXCircle, HiCheckCircle } from "react-icons/hi";


const Client = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(16);
  const [page, setPage] = useState(0);

  const { loading, error, client } = useSelector((state) => state.clients);
  const {
    loading: ordersLoading,
    error: ordersError,
    orders,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    const params = {
      id:id,
      page: page,
      pageSize: pageSize,
    };
    if (!client || client._id !== id) {
      dispatch(fetchClientDetails(id));
      dispatch(clientOrders(params));
    } else {
      setName(client.name);
      setAddress(client.address);
      setPhone(client.phone);
      dispatch(clientOrders(params));

    }
  }, [dispatch, id,client, page, pageSize]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateClient({
        _id: client._id,
        name: name,
        address: address,
        phone: phone,
        user: client.user._id,
      })
    );
  };

  const orderForClientHandler = () => {
    navigate('/')
    
  }

  const navigateToOrderHandler = (id) => {
    navigate(`/order/${id}`);
  }

  return (
    <div>
      <div className="flex mb-7">
        {loading ? <Loader /> : null}
        {error ? <Message>{error}</Message> : null}
        <div className="flex flex-col flex-initial w-9/12 bg-slate-300 pt-10 pl-6">
          <div className="underline decoration-indigo-500 decoration-4 text-3xl font-black text-blue-900 pb-9">
            Client Details
          </div>
          <div className="text-2xl font-extrabold text-cyan-900 pb-7">
            Name :{client?.name}
          </div>
          <div className="text-2xl font-bold text-cyan-900 pb-7">
            Address :{client?.address}
          </div>
          <div className="text-2xl font-bold text-cyan-900 pb-7">
            Phone :{client?.phone}
          </div>
          <div className="block p-6 rounded-lg shadow-lg bg-gray-300 max-w-xl">
            <h3 className="text-xl font-extrabold text-blue-900 pb-9">
              Update Client Details :
            </h3>
            <form onSubmit={submitHandler}>
              <div className="form-group mb-6">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control block
        w-full
        px-3
        py-3
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control block
        w-full
        px-3
        py-3
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Address"
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  className="
        form-control
        block
        w-full
        px-3
        py-3
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="Phone"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  shadow-md
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        hover:bg-blue-700 hover:shadow-lg 
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className=" flex justify-center flex-initial w-3/12 bg-white">
        <div className="w-full px-3 mx-3 my-3">
            <button
              onClick={() => orderForClientHandler()}
              className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-800 py-3 px-5 text-2xl font-medium text-white shadow-sm hover:green-700 focus:outline-none focus:ring-2  focus:ring-offset-2"
            >
             Order
            </button>
          </div>          
        </div>
      </div>
      <div className="w-full px-3">
        <h3 className="text-xl font-extrabold text-blue-900 pb-9">
          Client Orders List
        </h3>
        {ordersLoading ? <Loader/> : null }
        {ordersError ? <Message>{error}</Message>: null}
        {orders.orders?.length === 0 && !loading ? (
            <div className="py-3 mb-6"> No Orders Found For This Client</div>
        ): (
             <table className="w-full mb-9">
             <thead className="border-b bg-blue-900 border-gray-500">
               <tr>
                 <th className="text-md font-bold uppercase text-white px-3 py-4 text-left border-r-2 border-gray-300">
                   Oredr Items
                 </th>
   
                 <th
                   scope="col"
                   className="text-md font-bold uppercase  text-white px-3 py-4 text-left border-r-2 border-gray-300"
                 >
                   Delivered
                 </th>
                 <th
                   scope="col"
                   className="text-md font-bold uppercase  text-white px-3 py-4 text-left border-r-2 border-gray-300"
                 >
                   Paid
                 </th>
                 <th
                   scope="col"
                   className="text-md font-bold uppercase text-white px-3 py-4 text-left border-r-2 border-gray-300"
                 >
                   Created At
                 </th>
               </tr>
             </thead>
             <tbody>
               {orders.orders?.map((order) => {
                 return (
                   <tr
                     className="border-b bg-indigo-100 border-indigo-200"
                     key={order._id}
                     onClick={()=> navigateToOrderHandler(order._id)}
                   >
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 border-r-2 border-gray-400">
                       {order.orderItems.map((item, index) => (
                         <div key={index} className="flex mb-1">
                           <div className="pr-3">{item.name}</div>
                           <div className="pr-4"> X {item.qty}</div>
                           <div>{item.price}$</div>
                         </div>
                       ))}
                     </td>
   
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                       <div className="flex justify-between">
                         <p>
                           {order.isDelivered ? "Delivered" : "Not Delivered"}
                         </p>
                         {order.isDelivered ? <HiCheckCircle className="text-green-500 mr-2 text-4xl"/> : <HiXCircle className="mr-2 text-red-500 text-4xl"/>}
                       </div>
                     </td>
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                       <div className="flex justify-between">
                      <p>{order.isPaid ? "Paid" : "Not Paid"}</p> 
                       {order.isPaid ? <HiCheckCircle className="text-green-500 mr-2 text-4xl "/> : <HiXCircle className="mr-2 text-red-500 text-4xl"/>}
   
                       </div>
                     </td>
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                       {order.createdAt}
                     </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
        )}
        <div className="bg-white p-4 flex items-center flex-wrap text-sm font-bold">
            <nav>
              <ul className="inline-flex">
                <li>
                  <button
                    disabled={page === 0}
                    className="px-4 py-2 text-blue-900 transition-colors duration-150 bg-white border border-r-0 border-blue-900 rounded-l-lg focus:shadow-outline hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>
                </li>
                {Array.from({ length: orders?.pages }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i)}
                      className="px-4 py-2 text-blue-900 transition-colors duration-150 bg-white border border-r-0 border-blue-900 focus:shadow-outline "
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={page === orders?.pages - 1}
                    className="px-4 py-2 text-blue-900 transition-colors duration-150 bg-white border border-blue-900 rounded-r-lg focus:shadow-outline hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
       
      </div>
    </div>
  );
};

export default Client;
