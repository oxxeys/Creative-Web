import http from "../http-common";

class boxyUserAuthService {

  create(data) {
    return http.post("/authenticate/boxy/createUser", data);
  }

}

export default new boxyUserAuthService();