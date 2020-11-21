import http from "../http-common";

class JournalDataService {
  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };
  }

  getAll(year, month) {
    return http.get(
      "journal/?year=" + year + "&month=" + month,
      this.getAuthHeader()
    );
  }

  save(journal) {
    return http.post("journal/", JSON.stringify(journal), this.getAuthHeader());
  }

  delete(id) {
    return http.delete("journal/" + id, this.getAuthHeader());
  }

  getYears() {
    return http.get("journal/years", this.getAuthHeader());
  }
}

export default new JournalDataService();
