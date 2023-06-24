import http from "@/http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsVehiclesDataService {
  getAll() {
    return http.get("/vehicles", { headers: auth() });
  }

  get(id) {
    return http.get(`/vehicles/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/vehicles", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/vehicles/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/vehicles/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/vehicles`, { headers: auth() });
  }

  getTypes() {
    return http.get(`/vehicles_types`, { headers: auth() });
  }
}

export default new AdminSettingsVehiclesDataService();
