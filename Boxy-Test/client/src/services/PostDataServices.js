import http from "../http-common";

class boxyDataService {
  getAll() {
    return http.get("/boxy");
  }

  mostRecentPost() {
    return http.get("/boxy/mostRecentPost");
  }

  create(data) {
    return http.post("/boxy", data);
  }
}

export default new boxyDataService();