import http from "../http-common";

class boxyDataService {
  getAll() {
    return http.get("/boxy");
  }

  get(id) {
    return http.get(`/boxy/${id}`);
  }

  create(data) {
    return http.post("/boxy", data);
  }

  update(id, data) {
    return http.put(`/boxy/${id}`, data);
  }

  delete(id) {
    return http.delete(`/boxy/${id}`);
  }

  deleteAll() {
    return http.delete(`/boxy`);
  }

  findByTitle(title) {
    return http.get(`/boxy?title=${title}`);
  }
}

export default new boxyDataService();