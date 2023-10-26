import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TestPage from './TestPage/main.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './loginAndre/Login.jsx'
import Register from './loginAndre/register.jsx'
import ShowItem from './showItem/main.jsx'
import AdminPage from './admin/Admin.jsx'
import CartPage from './cart/Cart.jsx'

export default function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<ShowItem />} />
          {/* <Route path="test" element={<TestPage />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<CartPage/>} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="store" element={<ShowItem />} />
          {/* <Route path="/product/" element={<ItemDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <MainApp />
)
