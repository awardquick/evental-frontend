import { http, http_multipart } from "../utils/http";

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const register = async (payload) => {
  return handleRequest(http_multipart.post(`/eventee-signup`, payload));
};

export const createPassword = async (payload) => {
  return handleRequest(http_multipart.post(`/eventee-new-password`, payload));
};

export const userLogin = async (payload) => {
  return handleRequest(http_multipart.post(`/user-login`, payload));
};

export const checkUser = async () => {
  return handleRequest(http.get(`/check-user`));
};

export const updateProfile = async (payload) => {
  return handleRequest(http_multipart.patch(`/update-profile`, payload));
};

export const contactUs = async (payload) => {
  return handleRequest(http_multipart.post(`/contact-us`, payload));
};

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
  return handleRequest(
    http.get(`/all-products-list`, {
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
    })
  );
};

export const getSingleProductDetails = async (product_id = "") => {
  return handleRequest(http.get(`/product-details?product_id=${product_id}`));
};

// *------------------------------------
// CHAT API START
// *------------------------------------

export const sendMessage = async (payload) => {
  return handleRequest(http_multipart.post(`/send-message`, payload));
};

export const loadMessage = async (payload) => {
  return handleRequest(http_multipart.post(`/load-messages`, payload));
};

export const chatList = async (page = "") => {
  return handleRequest(http.get(`/chats-list`));
};

export const chatDetails = async (payload) => {
  return handleRequest(http_multipart.post(`/message-window`, payload));
};

// *------------------------------------
// CHAT API END
// *------------------------------------

export const addCard = async (payload) => {
  return handleRequest(http_multipart.post(`/add-card`, payload));
};

export const myBookingList = async (booking_state = "", pageNo = 1) => {
  return handleRequest(
    http.get(`/my-booking-list/?booking_state=${booking_state}&page=${pageNo}`)
  );
};

export const cancelBooking = async (payload) => {
  return handleRequest(http_multipart.post(`/cancel-booking/`, payload));
};

export const bookingAvailability = async (payload) => {
  return handleRequest(
    http_multipart.post(`/check-product-availability`, payload)
  );
};

export const createBooking = async (payload) => {
  return handleRequest(http_multipart.post(`/create-booking/`, payload));
};

export const bookingPrice = async (payload) => {
  return handleRequest(http_multipart.post(`/check-booking-price/`, payload));
};

export const ChangeCurrentRole = async (body) => {
  return handleRequest(http.get(`/change-user-role/`, body));
};

export const staticPages = async (payload) => {
  return handleRequest(http_multipart.post(`/static-pages`, payload));
};

export const visitorDetail = async (payload) => {
  return handleRequest(http_multipart.post(`/visitor-detail/`, payload));
};

export const userCardList = async () => {
  return handleRequest(http.get(`/user-cards-list`));
};

export const addCardWithStripe = async (payload) => {
  return handleRequest(http_multipart.post(`/add-card`, payload));
};

export const myNotifications = async (pageNo = "") => {
  return handleRequest(http.get(`/my-notifications/?page=${pageNo}`));
};

export const markReadNotifications = async () => {
  return handleRequest(http.get(`/mark-read-notifications`));
};
