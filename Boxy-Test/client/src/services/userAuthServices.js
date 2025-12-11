// Calls to backend are written here

import http from "../http-common";



class boxyUserAuthService {

  create(data) {
    return http.post("/authenticate/boxy/createUser", data);
  }

  Login(data) {
    return http.post("/authenticate/boxy/Login", data);
  }

  logout() {
    return http.get("/authenticate/boxy/logout");
  }

  checkSession() {
    return http.get("/authenticate/boxy/checkSession");
  }

  fetchUserInfo() {
    return http.get("/authenticate/boxy/fetchUserInfo");
  }

  changeUsername() {
    return http.get("/authenticate/boxy/changeUsername");
  }
}

export default new boxyUserAuthService();