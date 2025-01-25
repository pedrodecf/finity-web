import axios from "axios";

console.log(process.env.NEXT_PUBLIC_API_URL);

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
