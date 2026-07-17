import api from "./api";

const pelangganService = {
    getAll: () => api.get("/pelanggan"),
    getById: (id) => api.get(`/pelanggan/${id}`),
    create: (data) => api.post("/pelanggan", data),
    update: (id, data) => api.put(`/pelanggan/${id}`, data),
    delete: (id) => api.delete(`/pelanggan/${id}`)
};

export default pelangganService;