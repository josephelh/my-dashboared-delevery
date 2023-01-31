import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient } from "../slices/clientSlice";

const NewClient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const user = useSelector((state) => state.user.userLogin);
  const client = useSelector((state) => state.clients.client)

  useEffect(()=> {
    if (client){
        navigate(`/client/${client._id}`)
    }

  },[navigate,dispatch,client ])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        addClient({
        name: name,
        address: address,
        phone: phone,
        user: user._id,
      })
    );   
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-gray-300 max-w-xl">
      <h3 className="text-xl font-extrabold text-blue-900 pb-9">
        Add Client Form :
      </h3>
      <form onSubmit={submitHandler}>
        <div className="form-group mb-6">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control block w-full px-3 py-3 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="Name"
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            className="form-control block w-full px-3 py-3 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Address"
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            className="form-control block w-full text-xl px-3 py-3  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
            placeholder="Phone"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-bold text-xl leading-tight uppercase rounded  shadow-md
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                hover:bg-blue-700 hover:shadow-lg 
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewClient;
