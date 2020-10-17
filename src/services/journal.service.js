import http from "../http-common";
import { getCookie } from "../Utils";

class JournalDataService {
  
  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + getCookie("token") },
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
}

export default new JournalDataService();
