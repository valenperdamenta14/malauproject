import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import transaksiService from "../../services/transaksiService";
import TransaksiModal from "./TransaksiModal";

const Transaksi = () => {

    const [transaksi, setTransaksi] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [mode, setMode] = useState("add");

    const [selectedData, setSelectedData] = useState(null);

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

    const hapusTransaksi = async (id) => {

        const result = await Swal.fire({

            title: "Hapus Transaksi?",

            text: "Data transaksi akan dihapus.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

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

                        Data Transaksi

                    </h3>

                    <small className="text-muted">

                        Kelola seluruh data transaksi pembayaran.

                    </small>

                </div>

                <button
                    className="btn btn-success"
                    onClick={openTambah}
                >

                    <i className="bi bi-plus-circle me-2"></i>

                    Tambah Transaksi

                </button>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th width="60">

                                    No

                                </th>

                                <th>

                                    Kode Booking

                                </th>

                                <th>

                                    Pelanggan

                                </th>

                                <th>

                                    Tanggal

                                </th>

                                <th>

                                    Total

                                </th>

                                <th width="150">

                                    Metode

                                </th>

                                <th width="180">

                                    Aksi

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                transaksi.length > 0 ?

                                    transaksi.map((item, index) => (

                                        <tr key={item.id}>

                                            <td>

                                                {index + 1}

                                            </td>

                                            <td>

                                                <strong>

                                                    {item.kode_booking}

                                                </strong>

                                            </td>

                                            <td>

                                                {item.nama}

                                            </td>

                                            <td>

                                                {item.tanggal_transaksi}

                                            </td>

                                            <td>

                                                <strong>

                                                    Rp {Number(item.total).toLocaleString("id-ID")}

                                                </strong>

                                            </td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {item.metode_pembayaran}

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
                                                    onClick={() => hapusTransaksi(item.id)}
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
                                            colSpan="7"
                                            className="text-center py-5 text-muted"
                                        >

                                            <i
                                                className="bi bi-receipt"
                                                style={{
                                                    fontSize: "50px",
                                                    display: "block",
                                                    marginBottom: "10px"
                                                }}
                                            ></i>

                                            Belum ada transaksi.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <TransaksiModal
                show={showModal}
                mode={mode}
                selectedData={selectedData}
                onClose={() => setShowModal(false)}
                onSuccess={loadTransaksi}
            />

        </MainLayout>

    );

};

export default Transaksi;