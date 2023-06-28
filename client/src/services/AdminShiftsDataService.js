import http from "@/http-common";
import auth from '@/services/AuthHeaderService';

class AdminShiftsDataService {
  getAll() {
    return http.get("/api/shifts", { headers: auth() });
  }

  get(id) {
    return http.get(`/api/shifts/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/api/shifts", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/api/shifts/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/api/shifts/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/api/shifts`, { headers: auth() });
  }
}

export default new AdminShiftsDataService();
