import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../componenets/navbar";
import Sidebar from "../../componenets/sidebar";

const Layout = () => {

  return (
    <div className="flex relative ">
     
      <Sidebar/>
      <div className="w-screen">
        <Navbar />
        <div className="mt-20">
        <Outlet />

        </div>
      </div>
    </div>
  );
};

export default Layout;

<body>
  <div>Sidebar</div>
  <main></main>
</body>;
