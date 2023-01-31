import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";
import Message from "../componenets/Message";
import Loader from "../componenets/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, userLogin } = useSelector((state) => state.user);

  useEffect(() => {
    if (userLogin) {
      if (userLogin) {
        navigate("/");
      } else {
        window.alert("you are not a User");
      }
    }
  }, [navigate, userLogin]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="relative flex flex-col justify-center max-h-minoverflow-hidden">
      <h1 className="text-4xl text-green-600 m-auto my-6">Company Logo</h1>
      <div className="w-2/5 p-3 m-auto bg-white rounded-md shadow-xl shadow-gray-600/40 ring-2 ring-cyan-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-cyan-700 underline uppercase">
          Sign in
        </h1>
        {loading ? <Loader /> :  null}
        {error ? <Message>{error.message}</Message> : null }
          <form className="mt-6" onSubmit={submitHandler}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-xl font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-gray-300 border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-xl font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-cyan-700 bg-gray-300 border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 mt-8 text-xl tracking-wide text-white transition-colors duration-200 transform bg-cyan-700 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600"
              >
                Login
              </button>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default Login;
