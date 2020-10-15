import http from "../http-common";
import Axios from "axios";

const API_URL = "http://localhost:8080/";

class HabitDataService {
  getAll() {
    return http.get("habit");
  }

  create(habit) {
    if (habit.id > 0) {
      return Axios.put(API_URL + "habit/", JSON.stringify(habit));
    } else {
      return Axios.post(API_URL + "habit/", JSON.stringify(habit));
    }
  }

  delete(id) {
    return http.delete("habit/" + id);
    //return Axios.delete(API_URL + "habit/" + id);
  }
}

export default new HabitDataService();
