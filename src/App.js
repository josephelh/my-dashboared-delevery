import Home from './pages/home';
import Layout from './pages/layout';
import Clients from './pages/clients';
import Login from './pages/Login';
import Client from './pages/Client';
import UserOrders from './pages/UserOrders';
import Order from './pages/Order';
import NewOrder from './pages/NewOrder';
import NewClient from './pages/NewClient';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';




function App() {
  const user = useSelector((state) => state.user.userLogin)



  return (

   <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
          <Route path='/' element={<Layout /> }
            // element={user ? <Layout /> : <Navigate to="/login"/>}
            >          
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/client/:id" element={<Client />} />
            <Route path="/myorders" element={<UserOrders />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/neworder" element={<NewOrder />} />
            <Route path="/newclient" element={<NewClient />} />

           
          </Route>
        </Routes>
  );
}

export default App;
