import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import barangService from "../../services/barangService";
import BarangModal from "./BarangModal";

const Barang = () => {

    const [barang, setBarang] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [mode, setMode] = useState("add");

    const [selectedBarang, setSelectedBarang] = useState(null);

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

    const openTambah = () => {

        setMode("add");

        setSelectedBarang(null);

        setShowModal(true);

    };

    const openEdit = (item) => {

        setMode("edit");

        setSelectedBarang(item);

        setShowModal(true);

    };

    const hapusBarang = async (id) => {

        const result = await Swal.fire({

            title: "Hapus Data Barang?",

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

            await barangService.delete(id);

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text: "Data barang berhasil dihapus."

            });

            loadBarang();

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

                        Data Barang

                    </h3>

                    <small className="text-muted">

                        Kelola seluruh data barang.

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={openTambah}
                >

                    <i className="bi bi-plus-circle me-2"></i>

                    Tambah Barang

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

                                    Nama Barang

                                </th>

                                <th>

                                    Harga

                                </th>

                                <th width="100">

                                    Stok

                                </th>

                                <th width="220">

                                    Aksi

                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                    {
                            barang.length > 0 ?

                                barang.map((item, index) => (

                                    <tr key={item.id}>

                                        <td>{index + 1}</td>

                                        <td>

                                            <strong>{item.nama_barang}</strong>

                                        </td>

                                        <td>

                                            Rp {Number(item.harga).toLocaleString("id-ID")}

                                        </td>

                                        <td>

                                            <span className="badge bg-success">

                                                {item.stok}

                                            </span>

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
                                                onClick={() => hapusBarang(item.id)}
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
                                            className="bi bi-inbox"
                                            style={{
                                                fontSize: "50px",
                                                display: "block",
                                                marginBottom: "10px"
                                            }}
                                        ></i>

                                        Belum ada data barang.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

        <BarangModal
            show={showModal}
            mode={mode}
            selectedData={selectedBarang}
            onClose={() => setShowModal(false)}
            onSuccess={loadBarang}
        />

    </MainLayout>

);

};

export default Barang;