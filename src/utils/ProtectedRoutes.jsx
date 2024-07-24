/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */

import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import useToken from "../hooks/useToken";
import { constant } from "./constant";

export const EventerAuth = () => {
  const role = useRole();
  const token = useToken();
  
  if (token) {
    if (role === constant.EVENTER) {
      return <Outlet />;
    } else {
      return <Navigate to="/eventee" />;
    }
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export const EventeeAuth = () => {
  const role = useRole();
  const token = useToken();
  if (token) {
    if (role === constant.EVENTEE) {
      return <Outlet />;
    } else {
      return <Navigate to="/eventer" />;
    }
  } else {
    return <Navigate to="/" replace={true} />;
  }
};
export const PublicAuth = () => {
  const role = useRole();
  const token = useToken();
  if (token) {
    if (role === constant.EVENTEE) {
      return <Navigate to="/eventee" />;
    } else if (role == constant.EVENTER) {
      return <Navigate to="/eventer" />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Outlet />;
  }
};
