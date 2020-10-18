import axios from "axios";

export default axios.create({
  baseURL: "https://habits-api.smartdev.kz",
  headers: { "Content-type": "application/json" },
});

