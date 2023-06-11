import http from "../http-common";

class VehiclesDataService {
  getAll() {
    return http.get("/vehicles");
  }

  get(id) {
    return http.get(`/vehicles/${id}`);
  }

  create(data) {
    return http.post("/vehicles", data);
  }

  update(id, data) {
    return http.put(`/vehicles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vehicles/${id}`);
  }

  deleteAll() {
    return http.delete(`/vehicles`);
  }

  findByTitle(title) {
    return http.get(`/vehicles?title=${title}`);
  }
}

export default new VehiclesDataService();
