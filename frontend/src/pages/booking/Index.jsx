import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import bookingService from "../../services/bookingService";

const Booking = () => {

    const [booking, setBooking] = useState([]);

    useEffect(() => {
        loadBooking();
    }, []);

    const loadBooking = async () => {

        const response = await bookingService.getAll();

        setBooking(response.data.data);

    };

    const hapus = async (id) => {

        const result = await Swal.fire({
            title: "Hapus booking?",
            icon: "warning",
            showCancelButton: true
        });

        if (result.isConfirmed) {

            await bookingService.delete(id);

            Swal.fire(
                "Berhasil",
                "Booking berhasil dihapus",
                "success"
            );

            loadBooking();

        }

    };

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3>

                    Data Booking

                </h3>

                <Link
                    className="btn btn-primary"
                    to="/booking/tambah"
                >

                    + Booking Baru

                </Link>

            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>No</th>

                                <th>Kode</th>

                                <th>Pelanggan</th>

                                <th>Tanggal</th>

                                <th>Status</th>

                                <th>Aksi</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                booking.map((item, index) => (

                                    <tr key={item.id}>

                                        <td>{index + 1}</td>

                                        <td>{item.kode_booking}</td>

                                        <td>{item.nama}</td>

                                        <td>{item.tanggal_booking}</td>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    item.status === "Pending"
                                                        ? "bg-warning text-dark"
                                                        : item.status === "Diproses"
                                                        ? "bg-info"
                                                        : item.status === "Selesai"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {item.status}
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
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

};

export default Booking;