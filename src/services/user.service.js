import http from "../http-common";
import { getCookie, eraseCookie } from "../Utils";

class UserDataService {
  getUserFromLocalStorage() {
    return localStorage.getItem("currentUser") != null
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  }

  logout() {
    eraseCookie("token");
    localStorage.removeItem("currentUser");
  }

  validateUserData() {
    var token = getCookie("token");
    if (!token) this.logout();
    var user = localStorage.getItem("currentUser");
    if (!user) {
      this.getCurrentUser()
        .then((res) => {
          if (res.data.data) {
            localStorage.setItem("currentUser", JSON.stringify(res.data.data));
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          this.logout();
        });
    }
  }

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
