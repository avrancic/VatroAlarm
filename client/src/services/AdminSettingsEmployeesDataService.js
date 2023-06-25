import http from "@/http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsEmployeesDataService {
  getAll() {
    return http.get("/api/employees", { headers: auth() });
  }

  get(id) {
    return http.get(`/api/employees/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/api/employees", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/api/employees/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/api/employees/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/api/employees`, { headers: auth() });
  }

  getTypes() {
    return http.get(`/api/employees_types`, { headers: auth() });
  }
}

export default new AdminSettingsEmployeesDataService();
