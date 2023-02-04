import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders } from '../slices/orderSlice';
import { HiXCircle, HiCheckCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import Loader from "../componenets/Loader";
import Message from "../componenets/Message";



const UserOrders = () => {   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(16);
    const [page, setPage] = useState(0);

    const {error, loading, userOrdersList} = useSelector((state) => state.orders);


    useEffect(() => {
      const params = {
        page: page,
        pageSize: pageSize,
      };
      dispatch(userOrders(params));    
    
     
    }, [dispatch, page, pageSize])



    const navigateToOrderHandler = (id) => {
      navigate(`/order/${id}`);
    }
    
    
  const navigateBackHandler= ()=> {
    navigate(-1);
  }



  return (
    <div>
         {loading ? <Loader/> : null }
        {error ? <Message>{error}</Message>: null}
        {userOrdersList.orders?.length === 0 && !loading ? (
            <div className="py-3 mb-6"> You have not made any orders</div>
        ): (
          <>
          <button
                onClick={()=> navigateBackHandler()}
                className="mb-3 ml-9 px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded  shadow-md
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        hover:bg-blue-700 hover:shadow-lg 
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
              >
                Go Back
              </button>
              <table className="w-full mb-9">
             <thead className="border-b bg-blue-900 border-blue-500">
               <tr>
                 <th className="text-lg font-bold uppercase text-white px-3 py-4 text-left border-r-2 border-gray-300">
                   Name
                 </th>
                 <th className="text-lg font-bold uppercase text-white px-3 py-4 text-left border-r-2 border-gray-300">
                   Oredr Items
                 </th>
   
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase text-white pl-3 pr-2 py-4 text-left border-r-2 border-gray-300"
                 >
                   Delivered
                 </th>
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase  text-white pl-3 pr-2 py-4 text-left border-r-2 border-gray-300"
                 >
                   Paid
                 </th>
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase text-white px-3 py-4 text-left border-r-2 border-gray-300"
                 >
                   Created At
                 </th>
               </tr>
             </thead>
             <tbody>
               {userOrdersList.orders?.map((order) => {
                 return (
                   <tr
                     className="border-b-2 bg-white border-indigo-200"
                     key={order._id}
                     onClick={()=> navigateToOrderHandler(order._id)}
                   >
                     <td className="text-lg text-gray-900 font-semibold px-3 py-4 border-r-2 border-gray-400 whitespace-nowrap">
                       {order.client.name}
                     </td>
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 border-r-2 border-gray-400">
                       {order.orderItems.map((item, index) => (
                         <div key={index} className="flex mb-1">
                           <div className="pr-3">{item.name}</div>
                           <div className="pr-4"> X {item.qty}</div>
                           <div>{item.price}$</div>
                         </div>
                       ))}
                     </td>
   
                     <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                         <p>
                         </p>
                         {order.isDelivered ? <HiCheckCircle className="text-green-500 mr-2 text-4xl"/> : <HiXCircle className="mr-2 text-red-500 text-4xl"/>}
                     </td>
                     <td className="px-3 py-4 whitespace-nowrap border-r-2 border-gray-400">
                       
                       {order.isPaid ? <HiCheckCircle className="text-green-500 mr-2 text-4xl "/> : <HiXCircle className="mr-2 text-red-500 text-4xl"/>}
   
                     </td>
                     <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                       {order.createdAt}
                     </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
          </>
           
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
                {Array.from({ length: userOrdersList?.pages }, (_, i) => (
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
                    disabled={page === userOrdersList?.pages - 1}
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
  )
}

export default UserOrders
