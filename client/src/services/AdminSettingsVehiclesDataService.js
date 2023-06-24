import http from "@/http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsVehiclesDataService {
  getAll() {
    return http.get("/api/vehicles", { headers: auth() });
  }

  get(id) {
    return http.get(`/api/vehicles/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/api/vehicles", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/api/vehicles/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/api/vehicles/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/api/vehicles`, { headers: auth() });
  }

  getTypes() {
    return http.get(`/api/vehicles_types`, { headers: auth() });
  }
}

export default new AdminSettingsVehiclesDataService();
