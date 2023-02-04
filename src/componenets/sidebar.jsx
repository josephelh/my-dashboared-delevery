import React from "react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { resetClient } from "../slices/clientSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();


  const newCLientHandler= () => {
    dispatch(resetClient());
    setOpenMenu(!openMenu);
  }

  return (
    <div
      className={`${
        openMenu ? "w-60 left-0 top-0 h-screen" : "w-1 "
      } z-50  duration-300 fixed h-screen bg-indigo-800 text-2xl`}
    >
      {openMenu ? (
        <HiChevronLeft
          onClick={() => setOpenMenu(!openMenu)}
          className="absolute cursor-pointer -right-3 top-9 w-7 border-2 border-gray-300 bg-white rounded-2xl"
        />
      ) : (
        <HiChevronRight
          onClick={() => setOpenMenu(!openMenu)}
          className="absolute cursor-pointer -right-6 top-9 w-7 border-2 border-gray-300 bg-white rounded-2xl"
        />
      )}
      <div className={`relative duration-1000 ${openMenu ? "" : "hidden"}`}>
        <div className="flex flex-col mt-9 items-center">
          <div className="text-2xl uppercase text-white font-black mb-10">
            Company Logo
          </div>
          <Link
            to="/"
            onClick={() => setOpenMenu(!openMenu)}
            className="w-full py-3 px-2 text-xl pl-3 drop-shadow-xl rounded text-white border-b-2 border-white font-normal uppercase hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600"
          >
            Products
          </Link>
          <Link
            to="/clients"
            onClick={() => setOpenMenu(!openMenu)}
            className="w-full py-3 px-2 text-xl pl-3 drop-shadow-xl rounded text-white border-b-2 border-white font-normal uppercase hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600"
          >
            Clients
          </Link>
          <Link
            to="/myorders"
            onClick={() => setOpenMenu(!openMenu)}
            className="w-full py-3 px-2 text-xl pl-3 drop-shadow-xl rounded text-white border-b-2 border-white font-normal uppercase hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600"
          >
            My Orders
          </Link>
          <Link
            to="/newclient"
            onClick={() => newCLientHandler()}
            className="w-full py-3 px-2 text-xl pl-3 drop-shadow-xl rounded text-white border-b-2 border-white font-normal uppercase hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600"
          >
            New Client
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
