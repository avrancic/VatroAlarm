import http from "@/http-common";
import auth from '@/services/AuthHeaderService';

class AdminIncidentsDataService {
  getAll() {
    return http.get("/api/incidents", { headers: auth() });
  }

  get(id) {
    return http.get(`/api/incidents/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/api/incidents", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/api/incidents/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/api/incidents/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/api/incidents`, { headers: auth() });
  }
}

export default new AdminIncidentsDataService();
