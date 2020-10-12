import http from "../http-common";

class HabitDataService{
    getAll(){
        return http.get('habit');
    }
}

export default new HabitDataService();