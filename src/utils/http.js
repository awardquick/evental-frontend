import axios from "axios";
import { toastAlert } from "./SweetAlert";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export const http_multipart = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

/* request interceptor */
http.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;

    if (token) {
      config.headers["authorization"] = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* request multipart interceptor */
http_multipart.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("userDetails"))?.token;
    if (token) {
      config.headers["authorization"] = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/* response interceptor */
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.name === "Network Error") {
      toastAlert("error", error.response.data.message);
      return error.response;
    } else {
      if (error.response?.status === 403) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 400) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 404) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 401) {
        toastAlert("error", error.response.data.detail);
        localStorage.clear();
        window.location.href = "/";
        return error.response;
      }
    }
    return Promise.reject(error);
  }
);

/* response multipart interceptor */
http_multipart.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.name === "Network Error") {
      toastAlert("error", error.response.data.message);
      return error.response;
    } else {
      if (error.response?.status === 403) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 400) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 404) {
        toastAlert("error", error.response.data.message);
        return error.response;
      }
      if (error.response?.status === 401) {
        toastAlert("error", error.response.data.detail);
        localStorage.clear();
        window.location.href = "/";
        return error.response;
      }
    }
    return Promise.reject(error);
  }
);

//   import axios from "axios";
// import { toastAlert } from "./SweetAlert";

// // Create axios instances
// export const http = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export const httpFormData = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

// // Function to get token from localStorage
// const getToken = () => JSON.parse(localStorage.getItem("userDetails"))?.token;

// // Request interceptor function
// const requestInterceptor = (config) => {
//   const token = getToken();
//   if (token) {
//     config.headers["authorization"] = `Token ${token}`;
//   }
//   return config;
// };

// // Response interceptor function
// const responseInterceptor = (response) => response;

// // Error handling function
// const errorInterceptor = (error) => {
//   if (error?.name === "Network Error") {
//     toastAlert("error", error.response?.data.message || "Network Error");
//     return Promise.reject(error);
//   }

//   const { status, data } = error.response || {};
//   const message = data?.message || data?.detail || "An error occurred";

//   if ([400, 401, 403, 404].includes(status)) {
//     toastAlert("error", message);

//     if (status === 401) {
//       localStorage.clear();
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }

//   return Promise.reject(error);
// };

// // Apply interceptors to both instances
// const applyInterceptors = (axiosInstance) => {
//   axiosInstance.interceptors.request.use(requestInterceptor, Promise.reject);
//   axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
// };

// // Applying interceptors to http and httpFormData instances
// applyInterceptors(http);
// applyInterceptors(httpFormData);
