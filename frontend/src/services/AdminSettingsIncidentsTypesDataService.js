import http from "@/http-common";

class AdminSettingsIncidentsTypesDataService {
  getAll() {
    return http.get("/incidents_types");
  }

  get(id) {
    return http.get(`/incidents_types/${id}`);
  }

  create(data) {
    return http.post("/incidents_types", data);
  }

  update(id, data) {
    return http.put(`/incidents_types/${id}`, data);
  }

  delete(id) {
    return http.delete(`/incidents_types/${id}`);
  }

  deleteAll() {
    return http.delete(`/incidents_types`);
  }
}

export default new AdminSettingsIncidentsTypesDataService();
