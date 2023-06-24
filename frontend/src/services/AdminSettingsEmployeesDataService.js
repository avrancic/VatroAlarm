import http from "../http-common";
import auth from '@/services/AuthHeaderService';

class AdminSettingsEmployeesDataService {
  getAll() {
    return http.get("/employees");
  }

  get(id) {
    return http.get(`/employees/${id}`, { headers: auth() });
  }

  create(data) {
    return http.post("/employees", data, { headers: auth() });
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data, { headers: auth() });
  }

  delete(id) {
    return http.delete(`/employees/${id}`, { headers: auth() });
  }

  deleteAll() {
    return http.delete(`/employees`, { headers: auth() });
  }

  getTypes() {
    return http.get(`/employees_types`, { headers: auth() });
  }
}

export default new AdminSettingsEmployeesDataService();
