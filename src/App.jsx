/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccount from "./pages/Account/CreateAccount";
import CreatePassword from "./pages/Account/CreatePassword";
import EmailConformation from "./pages/Account/EmailConformation";
import SelectAccount from "./pages/Account/SelectAccount";
import Contact from "./pages/ContactUs/Contact";
import ProductList from "./pages/ProductList/ProductList";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProductDetails from "./pages/product/ProductDetails";
import Register from "./pages/register/Register";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import EventerSignup from "./pages/EventerSignup/EventerSignup";
import HowWork from "./pages/Howwork/HowWork";
import TermCondition from "./pages/TermCondition/TermCondition";
import EventeeRoutes from "./utils/EventeeRoutes";
import EventerRoutes from "./utils/EventerRoutes";
import { EventeeAuth, EventerAuth, PublicAuth } from "./utils/ProtectedRoutes";
import ForgotPassword from "./pages/Account/ForgetPassword";
import ScrollTop from "./pages/Common/ScrollTop";
import Notification from "./pages/notification/Notification";

function App() {
  return (
    <>
      <Routes>
        {/*********************Eventer Routes*********************/}
        <Route path="*" element={<EventerAuth />}>
          <Route path="eventer/*" element={<EventerRoutes />} />
        </Route>

        {/*********************Eventee Routes*********************/}
        <Route path="*" element={<EventeeAuth />}>
          <Route path="eventee/*" element={<EventeeRoutes />} />
        </Route>

        {/*********************Public Routes Without auth *********************/}
        <Route path="*" element={<PublicAuth />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="product-detail/:id" element={<ProductDetails />} />
          <Route path="eventee-register" element={<Register />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="register-as" element={<SelectAccount />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="email-confirmation" element={<EmailConformation />} />
          <Route path="create-password/:id" element={<CreatePassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="eventer-register" element={<EventerSignup />} />
        </Route>
        <Route path="/notification" element={<Notification />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/term-condition" element={<TermCondition />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/how-it-work" element={<HowWork />} />
        <Route path="/contact-us" element={<Contact />} />
        
      </Routes>
      <ScrollTop />
    </>
  );
}

export default App;
