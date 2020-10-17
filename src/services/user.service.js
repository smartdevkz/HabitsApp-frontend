import http, { request } from "../http-common";
import { getCookie } from "../Utils";

class UserDataService {
  register(user) {
    delete user.password_retype;
    return http.post("user", JSON.stringify(user));
  }

  login(user) {
    return http.post("generateToken", JSON.stringify(user));
  }

  getCurrentUser() {
    let token = getCookie("token");
    return http.get("user/current", {
      headers: { Authorization: "Bearer " + token },
    });
  }
}

export default new UserDataService();
