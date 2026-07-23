import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import bookingService from "../../services/bookingService";
import FormBooking from "../../components/booking/FormBooking";

const BookingModal = ({
    show,
    onClose,
    onSuccess,
    mode,
    selectedData
}) => {

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

    const initialBooking = {

        kode_booking: generateKodeBooking(),

        pelanggan_id: "",

        tanggal_booking: today,

        status: "Pending",

        detail: []

    };

    const [booking, setBooking] = useState(initialBooking);

    useEffect(() => {

        if (!show) return;

        if (mode === "edit" && selectedData) {

            setBooking({

                kode_booking: selectedData.kode_booking,

                pelanggan_id: selectedData.pelanggan_id,

                tanggal_booking: selectedData.tanggal_booking,

                status: selectedData.status,

                detail: []

            });

        } else {

            setBooking({

                ...initialBooking,

                kode_booking: generateKodeBooking()

            });

        }

    }, [show, mode, selectedData]);

    useEffect(() => {

        const esc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        document.addEventListener("keydown", esc);

        return () => {

            document.removeEventListener("keydown", esc);

        };

    }, []);

    if (!show) return null;

    const simpan = async () => {

        if (booking.pelanggan_id === "") {

            Swal.fire({

                icon: "warning",

                title: "Pilih pelanggan terlebih dahulu."

            });

            return;

        }

        if (booking.detail.length === 0) {

            Swal.fire({

                icon: "warning",

                title: "Belum ada barang."

            });

            return;

        }

        try {

            if (mode === "add") {

                await bookingService.create(booking);

                Swal.fire({

                    icon: "success",

                    title: "Berhasil",

                    text: "Booking berhasil ditambahkan."

                });

            } else {

                await bookingService.update(selectedData.id, booking);

                Swal.fire({

                    icon: "success",

                    title: "Berhasil",

                    text: "Booking berhasil diperbarui."

                });

            }

            onSuccess();

            onClose();

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

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-content-custom"
                style={{
                    maxWidth: "900px"
                }}
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header-custom">

                    <h4>

                        <i className={`bi ${
                            mode === "add"
                                ? "bi-calendar-plus"
                                : "bi-pencil-square"
                        } me-2`}></i>

                        {

                            mode === "add"

                                ? "Tambah Booking"

                                : "Edit Booking"

                        }

                    </h4>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="modal-body-custom">

                    <FormBooking

                        booking={booking}

                        setBooking={setBooking}

                    />

                </div>

                <div className="modal-footer-custom">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={onClose}
                    >

                        <i className="bi bi-x-circle me-2"></i>

                        Batal

                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={simpan}
                    >

                        <i className="bi bi-save me-2"></i>

                        {
                            mode === "add"
                                ? "Simpan"
                                : "Update"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default BookingModal;