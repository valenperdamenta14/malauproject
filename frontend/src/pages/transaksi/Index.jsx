import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import MainLayout from "../../layouts/MainLayout";
import transaksiService from "../../services/transaksiService";

const Transaksi = () => {
    const [transaksi, setTransaksi] = useState([]);
    useEffect(() => {
        loadTransaksi();
    }, []);

    const loadTransaksi = async () => {
        try {
            const response = await transaksiService.getAll();
            setTransaksi(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const hapus = async (id) => {
        const result = await Swal.fire({
            title: "Hapus Transaksi?",
            text: "Data transaksi akan dihapus.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        });
        if (!result.isConfirmed) return;
        try {
            await transaksiService.delete(id);
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Transaksi berhasil dihapus."
            });
            loadTransaksi();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.response?.data?.message || "Terjadi kesalahan."
            });
        }
    };

    return (
        <MainLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Data Transaksi</h3>

                <Link
                    to="/transaksi/tambah"
                    className="btn btn-success"
                >
                    + Tambah Transaksi
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th width="60">No</th>
                                <th>Kode Booking</th>
                                <th>Pelanggan</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                                <th>Metode</th>
                                <th width="120">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                transaksi.length > 0 ?
                                    transaksi.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.kode_booking}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.tanggal_transaksi}</td>
                                            <td>Rp {Number(item.total).toLocaleString("id-ID")}</td>
                                            <td>
                                                <span className="badge bg-primary">
                                                    {item.metode_pembayaran}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => hapus(item.id)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >
                                            Belum ada data transaksi
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Transaksi;