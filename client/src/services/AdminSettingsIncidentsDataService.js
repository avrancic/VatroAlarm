import http from "../http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsIncidentsDataService {
  getAll() {
    return http.get("/api/incidents");
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
}

export default new AdminSettingsIncidentsDataService();
