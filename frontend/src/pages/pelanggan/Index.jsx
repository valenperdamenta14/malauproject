import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import pelangganService from "../../services/pelangganService";
import PelangganModal from "./PelangganModal";

const Pelanggan = () => {

    const [pelanggan, setPelanggan] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [mode, setMode] = useState("add");

    const [selectedData, setSelectedData] = useState(null);

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

    const openTambah = () => {

        setMode("add");

        setSelectedData(null);

        setShowModal(true);

    };

    const openEdit = (item) => {

        setMode("edit");

        setSelectedData(item);

        setShowModal(true);

    };

    const hapusPelanggan = async (id) => {

        const result = await Swal.fire({

            title: "Hapus Data Pelanggan?",

            text: "Data yang dihapus tidak dapat dikembalikan.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Ya, Hapus",

            cancelButtonText: "Batal"

        });

        if (!result.isConfirmed) return;

        try {

            await pelangganService.delete(id);

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text: "Data pelanggan berhasil dihapus."

            });

            loadPelanggan();

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Gagal",

                text:
                    error.response?.data?.message ||
                    "Terjadi kesalahan."

            });

        }

    };

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">

                        Data Pelanggan

                    </h3>

                    <small className="text-muted">

                        Kelola seluruh data pelanggan.

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={openTambah}
                >

                    <i className="bi bi-person-plus me-2"></i>

                    Tambah Pelanggan

                </button>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th width="70">
                                    No
                                </th>

                                <th>
                                    Nama
                                </th>

                                <th>
                                    Nomor HP
                                </th>

                                <th>
                                    Alamat
                                </th>

                                <th width="220">
                                    Aksi
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                pelanggan.length > 0 ?

                                    pelanggan.map((item, index) => (

                                        <tr key={item.id}>

                                            <td>

                                                {index + 1}

                                            </td>

                                            <td>

                                                <strong>

                                                    {item.nama}

                                                </strong>

                                            </td>

                                            <td>

                                                {item.no_hp || "-"}

                                            </td>

                                            <td>

                                                {item.alamat || "-"}

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => openEdit(item)}
                                                >

                                                    <i className="bi bi-pencil-square me-1"></i>

                                                    Edit

                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => hapusPelanggan(item.id)}
                                                >

                                                    <i className="bi bi-trash me-1"></i>

                                                    Hapus

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-5 text-muted"
                                        >

                                            <i
                                                className="bi bi-people"
                                                style={{
                                                    fontSize: "50px",
                                                    display: "block",
                                                    marginBottom: "10px"
                                                }}
                                            ></i>

                                            Belum ada data pelanggan.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <PelangganModal
                show={showModal}
                mode={mode}
                selectedData={selectedData}
                onClose={() => setShowModal(false)}
                onSuccess={loadPelanggan}
            />

        </MainLayout>

    );

};

export default Pelanggan;