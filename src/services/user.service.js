import http from "../http-common";
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
    //TODO нужно пересоздать http c token
    delete require.cache[require.resolve('../http-common')];
    require('../http-common');
    
    return http.get("user/current");
  }
}

export default new UserDataService();
