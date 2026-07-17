import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormBooking from "../../components/booking/FormBooking";
import bookingService from "../../services/bookingService";

const Tambah = () => {
    const navigate = useNavigate();

    const generateKodeBooking = () => {
        const now = new Date();

        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const mi = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");

        return `BKG-${yyyy}${mm}${dd}${hh}${mi}${ss}`;
    };

    const today = new Date().toISOString().split("T")[0];

    const [booking, setBooking] = useState({
        kode_booking: generateKodeBooking(),
        pelanggan_id: "",
        tanggal_booking: today,
        status: "Pending",
        detail: []
    });

    const handleSubmit = async () => {
        if (booking.pelanggan_id === "") {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Silahkan pilih pelanggan."
            });

            return;
        }

        if (booking.detail.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Belum ada barang."
            });

            return;
        }

        try {

            await bookingService.create(booking);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Booking berhasil disimpan."
            });

            navigate("/booking");

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

            <div className="card shadow-sm border-0">

                <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">

                        Tambah Booking

                    </h5>

                </div>

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <label className="form-label">

                                Kode Booking

                            </label>

                            <input
                                className="form-control"
                                value={booking.kode_booking}
                                disabled
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Tanggal Booking

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={booking.tanggal_booking}
                                onChange={(e) =>
                                    setBooking({
                                        ...booking,
                                        tanggal_booking: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Status

                            </label>

                            <select
                                className="form-select"
                                value={booking.status}
                                onChange={(e) =>
                                    setBooking({
                                        ...booking,
                                        status: e.target.value
                                    })
                                }
                            >

                                <option>Pending</option>

                                <option>Diproses</option>

                                <option>Selesai</option>

                                <option>Dibatalkan</option>

                            </select>

                        </div>

                    </div>

                    <FormBooking
                        booking={booking}
                        setBooking={setBooking}
                    />

                    <div className="text-end mt-4">

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Simpan Booking
                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
};

export default Tambah;