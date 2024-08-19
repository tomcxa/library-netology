import axios from "axios";

export const requestClient = axios.create({
  baseURL: "http://localhost:3000/api",
});
