// src/api.js
import axios from "axios";

export const BACKEND_URL = "https://nn-pms-officers-2dd5ac29e658.herokuapp.com"; // replace with localhost:5000 for local dev

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
