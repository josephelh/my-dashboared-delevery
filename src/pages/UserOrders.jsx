import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders } from '../slices/orderSlice';
import { HiXCircle, HiCheckCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';


const UserOrders = () => {   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {error, loading, userOrdersList} = useSelector((state) => state.orders);


    useEffect(() => {
      dispatch(userOrders());    
    
     
    }, [dispatch])



    const navigateToOrderHandler = (id) => {
      navigate(`/order/${id}`);
    }
    


  return (
    <div>
        {userOrdersList.length === 0 && !loading ? (
            <div className="py-3 mb-6"> No Orders Found For This Client</div>
        ): (
             <table className="w-full mb-9">
             <thead className="border-b bg-green-300 border-gray-500">
               <tr>
                 <th className="text-lg font-bold uppercase text-gray-900 px-3 py-4 text-left border-r-2 border-gray-300">
                   Name
                 </th>
                 <th className="text-lg font-bold uppercase text-gray-900 px-3 py-4 text-left border-r-2 border-gray-300">
                   Oredr Items
                 </th>
   
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase text-gray-900 pl-3 pr-2 py-4 text-left border-r-2 border-gray-300"
                 >
                   Delivered
                 </th>
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase  text-gray-900 pl-3 pr-2 py-4 text-left border-r-2 border-gray-300"
                 >
                   Paid
                 </th>
                 <th
                   scope="col"
                   className="text-lg font-bold uppercase text-gray-900 px-3 py-4 text-left border-r-2 border-gray-300"
                 >
                   Created At
                 </th>
               </tr>
             </thead>
             <tbody>
               {userOrdersList.map((order) => {
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
        )} 
      
    </div>
  )
}

export default UserOrders
