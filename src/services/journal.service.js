import Axios from "axios";
import Api from "../http-common";

const API_URL="http://localhost:8080/"; 

class JournalDataService {

  getAll(year, month) {
    console.log("journal/?year=" + year + "&month=" + month);
    return Api.get("journal/?year=" + year + "&month=" + month);
  }

  save(journal) {
    return Axios.post(API_URL+"journal/", JSON.stringify(journal));
  }
}

export default new JournalDataService();
