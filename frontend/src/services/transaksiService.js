import api from "./api";
const transaksiService = {
    getAll: () => api.get("/transaksi"),
    getBooking: () => api.get("/transaksi/booking"),
    getDetail: (id) => api.get(`/transaksi/detail/${id}`),
    create: (data) => api.post("/transaksi", data),
    delete: (id) => api.delete(`/transaksi/${id}`)
};

export default transaksiService;