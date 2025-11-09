import axios from "axios";

// ⚠️ For phone testing: replace "localhost" with your computer’s LAN IP
// Example: http://192.168.1.10/phone_shop/api.php
const API_BASE_URL = "http://localhost/phone_shop/api.php";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const phoneShopAPI = {
  // 🔹 CUSTOMER REGISTRATION
  registerCustomer: (data) =>
    axios.post(`${API_BASE_URL}?path=register`, data, {
      headers: { "Content-Type": "application/json" },
    }),

  // 🔹 UNIVERSAL LOGIN (admin, employee, customer)
  login: (credentials) =>
    axios.post(`${API_BASE_URL}?path=login`, credentials, {
      headers: { "Content-Type": "application/json" },
    }),

  // 🔹 PRODUCTS CRUD
  getAllProducts: () => axios.get(`${API_BASE_URL}?path=products`),
  getProduct: (id) => axios.get(`${API_BASE_URL}?path=products&id=${id}`),
  createProduct: (data) =>
    axios.post(`${API_BASE_URL}?path=products`, data, {
      headers: { "Content-Type": "application/json" },
    }),
  updateProduct: (id, data) =>
    axios.put(`${API_BASE_URL}?path=products&id=${id}`, data, {
      headers: { "Content-Type": "application/json" },
    }),
  deleteProduct: (id) => axios.delete(`${API_BASE_URL}?path=products&id=${id}`),
};

export default api;
