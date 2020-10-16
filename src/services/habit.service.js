import http from "../http-common";

class HabitDataService {
  getAll() {
    return http.get("habit");
  }

  create(habit) {
    if (habit.id > 0) {
      return http.put("habit/" + habit.id, JSON.stringify(habit));
    } else {
      return http.post("habit", JSON.stringify(habit));
    }
  }

  delete(id) {
    return http.delete("habit/" + id);
  }
}

export default new HabitDataService();
