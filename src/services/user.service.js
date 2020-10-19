import http from "../http-common";
import { getCookie } from "../Utils";

class UserDataService {
  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + getCookie("token") },
    };
  }

  register(user) {
    delete user.password_retype;
    return http.post("user", JSON.stringify(user));
  }

  login(user) {
    return http.post("generateToken", JSON.stringify(user));
  }

  getCurrentUser() {
    return http.get("user/current", this.getAuthHeader());
  }
}

export default new UserDataService();
