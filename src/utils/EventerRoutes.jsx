/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React from "react";
import { Route, Routes } from "react-router-dom";
import EmptyChat from "../pages/Chat/EmptyChat";
import MainChat from "../pages/Chat/MainChat";
import NoMessage from "../pages/Chat/NoMessage";
import AddProduct from "../pages/Eventer/AddProduct";
import EditProduct from "../pages/Eventer/EditProduct";
import EventerEditProfile from "../pages/Eventer/EventerEditProfile";
import EventerProfile from "../pages/Eventer/EventerProfile";
import MyProduct from "../pages/Eventer/MyProduct";
import Request from "../pages/Eventer/Request";
import UpdatePaymentMethod from "../pages/Eventer/paymentMethod/UpdatePaymentMethod";
import Home from "../pages/home/Home";
import ProductDetails from "../pages/product/ProductDetails";
import AddPaymentMethod from "../pages/Eventer/paymentMethod/AddPaymentMethod";
const EventerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="view-profile" element={<EventerProfile />} />
      <Route path="edit-profile" element={<EventerEditProfile />} />
      <Route path="my-product" element={<MyProduct />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="request" element={<Request />} />
      <Route path="empty-chat" element={<EmptyChat />} />
      <Route path="no-message" element={<NoMessage />} />
      <Route path="update-payment-method" element={<UpdatePaymentMethod />} />
      <Route path="chat" element={<MainChat />} />
      <Route path="product-detail/:id" element={<ProductDetails />} />
      <Route path="add-payment-method" element={<AddPaymentMethod />} />
    </Routes>
  );
};

export default EventerRoutes;
