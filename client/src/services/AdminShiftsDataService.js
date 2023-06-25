import http from "@/http-common";

class AdminShiftsDataService {
  getAll() {
    return http.get("/api/shifts");
  }

  get(id) {
    return http.get(`/api/shifts/${id}`);
  }

  create(data) {
    return http.post("/api/shifts", data);
  }

  update(id, data) {
    return http.put(`/api/shifts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/shifts/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/shifts`);
  }
}

export default new AdminShiftsDataService();
