import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import bookingService from "../../services/bookingService";
import BookingModal from "./BookingModal";

const Booking = () => {

    const [booking, setBooking] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [mode, setMode] = useState("add");

    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        loadBooking();
    }, []);

    const loadBooking = async () => {

        try {

            const response = await bookingService.getAll();

            setBooking(response.data.data);

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

    const hapusBooking = async (id) => {

        const result = await Swal.fire({

            title: "Hapus Booking?",

            text: "Data booking akan dihapus.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Ya",

            cancelButtonText: "Batal"

        });

        if (!result.isConfirmed) return;

        try {

            await bookingService.delete(id);

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text: "Booking berhasil dihapus."

            });

            loadBooking();

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

    const badgeStatus = (status) => {

        switch (status) {

            case "Pending":
                return "bg-warning text-dark";

            case "Diproses":
                return "bg-info";

            case "Selesai":
                return "bg-success";

            default:
                return "bg-danger";

        }

    };

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">

                        Data Booking

                    </h3>

                    <small className="text-muted">

                        Kelola seluruh data booking pelanggan.

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={openTambah}
                >

                    <i className="bi bi-calendar-plus me-2"></i>

                    Booking Baru

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

                                <th width="120">

                                    Status

                                </th>

                                <th width="180">

                                    Aksi

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                booking.length > 0 ?

                                    booking.map((item, index) => (

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

                                                {item.tanggal_booking}

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${badgeStatus(item.status)}`}
                                                >

                                                    {item.status}

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
                                                    onClick={() => hapusBooking(item.id)}
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
                                            colSpan="6"
                                            className="text-center py-5 text-muted"
                                        >

                                            <i
                                                className="bi bi-calendar-x"
                                                style={{
                                                    fontSize: "50px",
                                                    display: "block",
                                                    marginBottom: "10px"
                                                }}
                                            ></i>

                                            Belum ada data booking.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <BookingModal
                show={showModal}
                mode={mode}
                selectedData={selectedData}
                onClose={() => setShowModal(false)}
                onSuccess={loadBooking}
            />

        </MainLayout>

    );

};

export default Booking;