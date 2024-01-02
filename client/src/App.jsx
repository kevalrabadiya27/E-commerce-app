import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Dashboard from './Pages/home/Home'
import UserList from "./Pages/userList/UserList";
import ProductListDash from "./Pages/productList/ProductList";
import User from './Pages/user/User'
import NewUser from './Pages/newUser/NewUser'
import ProductEdit from "./Pages/Editproduct/Product";
import NewProduct from "./Pages/newProduct/NewProduct";
import Protected from "./components/Protected";
import Offer from "./components/Offer";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route exact path="/" element={<Home />}> </Route>
          <Route path="/products/:catagory" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="offer" element={<Offer />} />
          <Route path="/register" element={<Register />} />
          {/* Admin Route */}
          <Route path="/dashboard" element={<Protected Components={Dashboard} />} />
          <Route path="/users" element={<Protected Components={UserList} />} />
          <Route exact path="/products" element={<Protected Components={ProductListDash} />} />
          <Route path="/user/:userId" element={<Protected Components={User} />} />
          <Route path="/newUser" element={<Protected Components={NewUser} />} />
          <Route path="/productlist/:productId" element={<Protected Components={ProductEdit} />} />
          <Route path="/newproduct" element={<Protected Components={NewProduct} />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
