import http from "../../../http-common";

class AdminIncidentsDataService {
  getAll() {
    return http.get("/api/incidents");
  }

  get(id) {
    return http.get(`/api/incidents/${id}`);
  }

  create(data) {
    return http.post("/api/incidents", data);
  }

  update(id, data) {
    return http.put(`/api/incidents/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/incidents/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/incidents`);
  }
}

export default new AdminIncidentsDataService();
