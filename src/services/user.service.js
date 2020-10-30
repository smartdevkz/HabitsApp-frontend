import http from "../http-common";

class UserDataService {
  getUserFromLocalStorage() {
    return localStorage.getItem("currentUser") != null
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem("currentUser");
  }

  validateUserData() {
    var token = localStorage.getItem('token');
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
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
