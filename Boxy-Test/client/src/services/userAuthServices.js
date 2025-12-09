import http from "../http-common";

class boxyUserAuthService {

  create(data) {
    return http.post("/authenticate/boxy/createUser", data);
  }

  Login(data) {
    return http.post("/authenticate/boxy/Login", data);
  }

}

export default new boxyUserAuthService();