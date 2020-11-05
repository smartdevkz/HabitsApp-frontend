import http from "../http-common";

class HabitDataService {
  
  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };
  }

  getAll() {
    return http.get("habit", this.getAuthHeader());
  }

  create(habit) {
    if (habit.id > 0) {
      return http.put(
        "habit/" + habit.id,
        JSON.stringify(habit),
        this.getAuthHeader()
      );
    } else {
      return http.post("habit", JSON.stringify(habit), this.getAuthHeader());
    }
  }

  delete(id) {
    return http.delete("habit/" + id, this.getAuthHeader());
  }
}

export default new HabitDataService();
