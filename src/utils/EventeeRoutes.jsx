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
import Home from "../pages/home/Home";
import ViewProfile from "../pages/Eventee/ViewProfile";
import MyBookings from "../pages/Eventee/MyBookings";
import EditProfile from "../pages/Eventee/EditProfile";
import ProductDetails from "../pages/product/ProductDetails";
import MainChat from "../pages/Chat/MainChat";
import UpdatePaymentMethod from "../pages/Eventer/paymentMethod/UpdatePaymentMethod";
import AddPaymentMethod from "../pages/Eventer/paymentMethod/AddPaymentMethod";

const EventeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="view-profile" element={<ViewProfile />} />
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="my-bookings" element={<MyBookings />} />
      <Route path="product-detail/:id" element={<ProductDetails />} />
      <Route path="chat" element={<MainChat />} />
      <Route path="add-payment-method" element={<AddPaymentMethod />} />
      <Route path="update-payment-method" element={<UpdatePaymentMethod />} />
      
    </Routes>
  );
};

export default EventeeRoutes;
