import axios from "axios";
import { getCookie } from "./Utils";

let getHeaders = () => {
  let headers = { "Content-type": "application/json" };
  let token = getCookie("token");
  if (token) {
    console.log(token);
    headers["Authorization"] = "Bearer " + token;
  }
  return headers;
};

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: getHeaders(),
});
