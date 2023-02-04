import React, { useState } from "react";
import {
  HiUserCircle,
  HiUserRemove,
  HiUserAdd,
  HiShoppingBag,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import { clearCart } from "../slices/cartSlice";
import { resetProducts } from "../slices/productSlice";
import { resetUserOrders, resetOrders } from "../slices/orderSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const client = useSelector((state) => state.clients.client);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {name} = useSelector((state) => state.user.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createOrderHandler = () => {
    navigate("/neworder");
  };

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(resetProducts());
    dispatch(resetOrders());
    dispatch(resetUserOrders());
    dispatch(logout());
  };

  return (
    <>
      <nav className="w-full z-40 fixed top-0 left-0 flex flex-wrap items-center px-2 py-1 bg-indigo-900 mb-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <Link to='./' className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              SM Delevery
            </Link>
          </div>
          <div className="flex ">
            <ul className="flex flex-row list-none mr-4">
              <li className="nav-item mr-6">
                <div className="relative" onClick={() => createOrderHandler()} >
                  {!client ? (
                    <HiShoppingBag className="py-2 text-gray-300 text-4xl h-12" />
                  ) : (
                    <>
                      <HiShoppingBag className="py-2 text-white text-4xl h-12" onClick={() => createOrderHandler()} />
                      <div className="absolute inset-0 object-right-top rounded-full">
                        <span className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                          {cartItems.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </li>
              <li className="nav-item">
                {client ? (
                  <Link
                    className="px-2 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75"
                    to={`/client/${client._id}`}
                  >
                    <HiUserAdd className="text-3xl mr-1" />
                    {client?.name}
                  </Link>
                ) : (
                  <div className="px-3 py-2 flex items-center text-4xl uppercase font-bold leading-snug text-white hover:opacity-75">
                    <HiUserRemove />
                  </div>
                )}
              </li>
              <li className="nav-item">
                <div
                  onClick={() => setOpen(!open)}
                  className="px-1 py-2 flex rounded-xl items-center text-4xl uppercase font-bold leading-snug text-white hover:opacity-75 over:bg-indigo-400 "
                >
                  <HiUserCircle />
                  <p className="mr-1 text-xs">{name}</p>
                </div>
                <div className={`${open ? "block" : "hidden"}`}>
                  <ul
                    className={`bg-sky-800 text-white text-xl font-bold mt-2 p-2 mr-2  ${
                      open ? "h-9 absolute overflow-visible" : "h-0 "
                    } `}
                  >
                    <li onClick={() => logoutHandler()}>Logout</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
