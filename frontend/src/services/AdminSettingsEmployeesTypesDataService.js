import http from "@/http-common";

class AdminSettingsEmployeesTypesDataService {
  getAll() {
    return http.get("/employees_types");
  }

  get(id) {
    return http.get(`/employees_types/${id}`);
  }

  create(data) {
    return http.post("/employees_types", data);
  }

  update(id, data) {
    return http.put(`/employees_types/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employees_types/${id}`);
  }

  deleteAll() {
    return http.delete(`/employees_types`);
  }
}

export default new AdminSettingsEmployeesTypesDataService();
