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

/**
 * Get all category list
 * @param {String} search
 * @returns
 */
export const categoryList = async (search = "") => {
  return await http.get(`/category-list?search=${search}`);
};
/**
 * Eventer signup
 * @returns
 */
export const eventerSignup = async (payload) => {
  return await http_multipart.post(`/eventer-signup`, payload);
};

// *-----------------------------
// Forgot Password
// *-----------------------------

/**
 * forgot password
 * @param {Object} payload
 * @returns
 */
export const userForgetPassword = async (payload) => {
  return await http_multipart.post(`/forget-password`, payload);
};
/**
 * Update eventer profile
 * @param {Object} payload
 * @returns
 */
export const updateEventerProfile = async (payload) => {
  return await http_multipart.patch(`/update-eventer-profile`, payload);
};
/**
 * My product list
 * @param {Number} pageNo
 * @returns
 */
export const myProductList = async (pageNo = "") => {
  return await http.get(`/my-products-list?page=${pageNo}`);
};
/**
 * Single product Details
 * @param {String} product_id
 * @returns
 */
export const productDetails = async (product_id = "") => {
  return await http.get(`/product-details?product_id=${product_id}`);
};

/**
 * Add product by eventer
 * @param {Object} payload
 * @returns
 */
export const addProduct = async (payload) => {
  return await http_multipart.post(`/add-product`, payload);
};

/**
 * delete my product
 * @param {Object} payload
 * @returns
 */
export const deleteProduct = async (payload) => {
  return await http_multipart.post(`/delete-product`, payload);
};
/**
 * Update my product details
 * @param {Object} payload
 * @returns
 */
export const updateMyProductDetails = async (payload) => {
  return await http_multipart.patch(`/update-products-details`, payload);
};
/**
 * Update my card details
 * @param {Object} payload
 * @returns
 */
export const updateCardDetails = async (payload) => {
  return await http_multipart.patch(`/update-card`, payload);
};
/**
 * Delete product image
 * @param {Object} payload
 * @returns
 */
export const deleteProductImage = async (payload) => {
  return await http_multipart.post(`/delete-products-image`, payload);
};
/**
 * Request (Order) List
 * @param {Number} booking_state
 * @returns
 */
export const myRequestList = async (booking_state = "", pageNo = 1) => {
  return await http.get(
    `/booking-requests/?booking_state=${booking_state}&page=${pageNo}`
  );
};
/**
 * Accept Rejcet Booking
 * @param {Object} payload
 * @returns
 */
export const acceptRejectBooking = async (payload) => {
  return await http_multipart.post(`/accept-reject-booking/`, payload);
};
