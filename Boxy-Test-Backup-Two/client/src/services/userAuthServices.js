import http from "../http-common";

class boxyUserAuthService {

  create(data) {
    return http.post("/authenticate/boxy/createUser", data);
  }

  Login(data) {
    return http.post("/authenticate/boxy/Login", data);
  }

  checkSession() {
  return http.get("/authenticate/boxy/checkSession");
}

}

export default new boxyUserAuthService();