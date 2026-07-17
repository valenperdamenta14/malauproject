import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import barangService from "../../services/barangService";

const Barang = () => {
    const [barang, setBarang] = useState([]);

    useEffect(() => {
        loadBarang();
    }, []);

    const loadBarang = async () => {
        try {
            const response = await barangService.getAll();
            setBarang(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBarang = async (id) => {
        const result = await Swal.fire({
            title: "Hapus Data?",
            text: "Data yang dihapus tidak dapat dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        });

        if (result.isConfirmed) {
            await barangService.delete(id);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil dihapus."
            });

            loadBarang();
        }
    };

    return (
        <MainLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">Data Barang</h3>
                    <small className="text-muted">
                        Kelola seluruh data barang.
                    </small>
                </div>

                <Link
                    to="/barang/tambah"
                    className="btn btn-primary"
                >
                    + Tambah Barang
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th width="70">No</th>
                                <th>Nama Barang</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th width="180">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                barang.length > 0 ?
                                    barang.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>

                                            <td>{item.nama_barang}</td>

                                            <td>
                                                Rp {Number(item.harga).toLocaleString("id-ID")}
                                            </td>

                                            <td>{item.stok}</td>

                                            <td>
                                                <Link
                                                    to={`/barang/edit/${item.id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteBarang(item.id)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
                                            Belum ada data barang.
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

export default Barang;