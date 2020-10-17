import http from "../http-common";

class JournalDataService {
  getAll(year, month) {
    return http.get("journal/?year=" + year + "&month=" + month);
  }

  save(journal) {
    return http.post("journal/", JSON.stringify(journal));
  }
}

export default new JournalDataService();
