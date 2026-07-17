import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import pelangganService from "../../services/pelangganService";

const Pelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);

    useEffect(() => {
        loadPelanggan();
    }, []);

    const loadPelanggan = async () => {
        try {
            const response = await pelangganService.getAll();
            setPelanggan(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deletePelanggan = async (id) => {
        const result = await Swal.fire({
            title: "Hapus Data?",
            text: "Data pelanggan akan dihapus.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        });

        if (result.isConfirmed) {
            await pelangganService.delete(id);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data pelanggan berhasil dihapus."
            });

            loadPelanggan();
        }
    };

    return (
        <MainLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">
                        Data Pelanggan
                    </h3>

                    <small className="text-muted">
                        Kelola seluruh data pelanggan.
                    </small>
                </div>

                <Link
                    to="/pelanggan/tambah"
                    className="btn btn-primary"
                >
                    + Tambah Pelanggan
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th width="70">No</th>
                                <th>Nama</th>
                                <th>No HP</th>
                                <th>Alamat</th>
                                <th width="180">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                pelanggan.length > 0 ?

                                    pelanggan.map((item, index) => (

                                        <tr key={item.id}>

                                            <td>{index + 1}</td>

                                            <td>{item.nama}</td>

                                            <td>{item.no_hp}</td>

                                            <td>{item.alamat}</td>

                                            <td>

                                                <Link
                                                    to={`/pelanggan/edit/${item.id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deletePelanggan(item.id)}
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
                                            className="text-center"
                                        >
                                            Belum ada data pelanggan.
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

export default Pelanggan;