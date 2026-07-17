import api from "./api";

const barangService = {
    getAll: () => api.get("/barang"),
    getById: (id) => api.get(`/barang/${id}`),
    create: (data) => api.post("/barang", data),
    update: (id, data) => api.put(`/barang/${id}`, data),
    delete: (id) => api.delete(`/barang/${id}`)
};

export default barangService;