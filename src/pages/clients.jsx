import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../slices/clientSlice";
import Search from "../componenets/Search";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";


const Clients = () => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { clients, loading, error } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClients(keyword));
  }, [dispatch, keyword]);


  const navigateToClient =(id)=> {
    navigate(`/client/${id}`)
  }

  const navigateBackHandler= ()=> {
    navigate(-1);
  }



  return ( 
    <>
    {loading ? <Loader/> : null}   
    {error ? <Message>{error}</Message> : null}
    <div className="flex flex-col mx-3">      
        <div className="flex justify-between">
        <button
                onClick={()=> navigateBackHandler()}
                className="ml-9 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded  shadow-md
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        hover:bg-blue-700 hover:shadow-lg 
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
              >
                Go Back
              </button>
        <Search >
        <input
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-300 focus:bg-white focus:border-indigo-600"
            />

        </Search>
        </div>
        
        <div className="py-2 inline-block flex-1 ">
          <div className="w-full">
            <table className="w-full">
              <thead className="border-b bg-blue-900 border-blue-500">
                <tr>
                  <th                    
                    className="text-md font-bold uppercase text-white px-3 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-md font-bold uppercase text-white px-3 py-4 text-left"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="text-md font-bold uppercase  text-white px-3 py-4 text-left"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => {
                  return (
                    <tr
                      className="border-b bg-indigo-100 border-indigo-200"
                      key={client._id}
                      onClick={()=> navigateToClient(client._id)}
                    >
                      <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap" >
                          {client.name}
                      </td>
                      <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                        {client.phone}
                      </td>
                      <td className="text-md text-gray-900 font-semibold px-3 py-4 whitespace-nowrap">
                        {client.address}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </>
  );
};

export default Clients;
