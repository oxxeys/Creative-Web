import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", // where we are looking to for the data
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true,
});