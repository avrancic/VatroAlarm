import http from "../../../http-common";

class IncidentsDataService {
  getAll() {
    return http.get("/incidents");
  }

  get(id) {
    return http.get(`/incidents/${id}`);
  }

  create(data) {
    return http.post("/incidents", data);
  }

  update(id, data) {
    return http.put(`/incidents/${id}`, data);
  }

  delete(id) {
    return http.delete(`/incidents/${id}`);
  }

  deleteAll() {
    return http.delete(`/incidents`);
  }
}

export default new IncidentsDataService();
