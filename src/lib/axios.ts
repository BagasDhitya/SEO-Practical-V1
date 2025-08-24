// lib/axios.ts
import axios from "axios";

export const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID;
export const API_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_API_KEY;

const instance = axios.create({
  baseURL: `https://api.backendless.com/${APP_ID}/${API_KEY}/data`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
