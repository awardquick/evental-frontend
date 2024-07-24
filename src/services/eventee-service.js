/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import { http, http_multipart } from "../utils/http";

export const register = async (payload) => {
  return await http_multipart.post(`/eventee-signup`, payload);
};

export const createPassword = async (payload) => {
  return await http_multipart.post(`/eventee-new-password`, payload);
};

export const userLogin = async (payload) => {
  return await http_multipart.post(`/user-login`, payload);
};

export const checkUser = async () => {
  return await http.get(`/check-user`);
};

export const updateProfile = async (payload) => {
  return await http_multipart.patch(`/update-profile`, payload);
};
/**
 * Contact us
 * @param {Object} payload
 * @returns
 */
export const contactUs = async (payload) => {
  return await http_multipart.post(`/contact-us`, payload);
};
/**
 * Get All Product List
 * @param {Number} page
 * @param {Number} product_type
 * @param {String} address
 * @param {Date} start_date
 * @param {Date} end_date
 * @returns
 */
export const allProductsList = async (
  page = 1,
  product_type = "",
  address = "",
  start_date = "",
  end_date = "",
  latitude = "",
  longitude = "",
  timezone
) => {
  return await http.get(`/all-products-list`, {
    params: {
      page,
      product_type,
      address,
      start_date,
      end_date,
      latitude,
      longitude,
      timezone,
    },
  });
};
/**
 * Get single product details
 * @param {String} product_id
 * @returns
 */
export const getSingleProductDetails = async (product_id = "") => {
  return await http.get(`/product-details?product_id=${product_id}`);
};

// *------------------------------------
// CHAT API START
// *------------------------------------

/**
 * Send Message
 * @param {Object} payload
 * @returns
 */
export const sendMessage = async (payload) => {
  return await http_multipart.post(`/send-message`, payload);
};

/**
 * Load new message
 * @param {Object} payload
 * @returns
 */
export const loadMessage = async (payload) => {
  return await http_multipart.post(`/load-messages`, payload);
};
/**
 * Chat List
 * @param {Number} page
 * @returns
 */
export const chatList = async (page = "") => {
  return await http.get(`/chats-list`);
};
/**
 * Chat details
 * @param {Object} payload
 * @returns
 */
export const chatDetails = async (payload) => {
  return await http_multipart.post(`/message-window`, payload);
};
// *------------------------------------
// CHAT API END
// *------------------------------------

{
  /***************** Add Payment Method API ***************************/
}
/**
 * Add Payment method
 * @param {Object} payload
 * @returns
 */
export const addCard = async (payload) => {
  return await http_multipart.post(`/add-card`, payload);
};
{
  /***************** Add Payment Method API ***************************/
}
/**
 * My Booking List
 * @param {Number} booking_state
 * @returns
 */
export const myBookingList = async (booking_state = "", pageNo = 1) => {
  return await http.get(
    `/my-booking-list/?booking_state=${booking_state}&page=${pageNo}`
  );
};
/**
 * Cancel Booking
 * @param {Object} payload
 * @returns
 */
export const cancelBooking = async (payload) => {
  return await http_multipart.post(`/cancel-booking/`, payload);
};
export const bookingAvailability = async (payload) => {
  return await http_multipart.post(`/check-product-availability`, payload);
};
/**
 * Create booking (Rent Now)
 * @param {Object} payload
 * @returns
 */
export const createBooking = async (payload) => {
  return await http_multipart.post(`/create-booking/`, payload);
};

export const bookingPrice = async (payload) => {
  return await http_multipart.post(`/check-booking-price/`, payload);
};
/**
 * Switch role
 * @param {Object} body
 * @returns
 */
export const ChangeCurrentRole = async (body) => {
  return await http.get(`/change-user-role/`, body);
};

{
  /********************** Static Pages***************************/
}
/**
 * Static pages
 * @param {Object} payload
 * @returns
 */
export const staticPages = async (payload) => {
  return await http_multipart.post(`/static-pages`, payload);
};

/**
 * Visitor detail
 * @param {Object} payload
 * @returns
 */
export const visitorDetail = async (payload) => {
  return await http_multipart.post(`/visitor-detail/`, payload);
};
/**
 * user card list
 * @returns
 */
export const userCardList = async () => {
  return await http.get(`/user-cards-list`);
};
/**
 * add card with stripe
 * @param {Object} payload
 * @returns
 */
export const addCardWithStripe = async (payload) => {
  return await http_multipart.post(`/add-card`, payload);
};
/**
 * My notifications
 * @param {Number} page
 * @returns
 */
export const myNotifications = async (pageNo = "") => {
  return await http.get(`/my-notifications/?page=${pageNo}`);
};
/**
 * Mark Read Notifications
 * @returns
 */
export const markReadNotifications = async () => {
  return await http.get(`/mark-read-notifications/`);
};
