import http from "../http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsIncidentsDataService {
  getAll() {
    return http.get("/incidents");
  }

  create(data) {
    return http.post("/incidents", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/incidents/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/incidents/${id}`, { headers: auth() });
  }
}

export default new AdminSettingsIncidentsDataService();
