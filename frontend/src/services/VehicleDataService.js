import http from "../http-common";

class VehicleDataService {
  getAll() {
    return http.get("/vehicles");
  }

  get(id) {
    return http.get(`/vehicle/${id}`);
  }

  create(data) {
    return http.post("/vehicles", data);
  }

  update(id, data) {
    return http.put(`/vehicle/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new VehicleDataService();
