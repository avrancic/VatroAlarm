import http from "@/http-common";

class UserDataService {
  login(data) {
    return http.post("/users/login", data);
  }
}

export default new UserDataService();