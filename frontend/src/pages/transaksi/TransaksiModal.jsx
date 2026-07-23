import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import transaksiService from "../../services/transaksiService";
import FormTransaksi from "../../components/transaksi/FormTransaksi";

const TransaksiModal = ({
    show,
    onClose,
    onSuccess,
    mode,
    selectedData
}) => {

    const today = new Date().toISOString().split("T")[0];

    const initialData = {

        booking_id: "",

        tanggal_transaksi: today,

        total: 0,

        metode_pembayaran: "Cash"

    };

    const [transaksi, setTransaksi] = useState(initialData);

    useEffect(() => {

        if (!show) return;

        if (mode === "edit" && selectedData) {

            setTransaksi({

                booking_id: selectedData.booking_id,

                tanggal_transaksi: selectedData.tanggal_transaksi,

                total: selectedData.total,

                metode_pembayaran: selectedData.metode_pembayaran

            });

        } else {

            setTransaksi(initialData);

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

        if (transaksi.booking_id === "") {

            Swal.fire({

                icon: "warning",

                title: "Pilih booking terlebih dahulu."

            });

            return;

        }

        try {

            if (mode === "add") {

                await transaksiService.create(transaksi);

            } else {

                await transaksiService.update(
                    selectedData.id,
                    transaksi
                );

            }

            Swal.fire({

                icon: "success",

                title: "Berhasil",

                text:
                    mode === "add"
                        ? "Transaksi berhasil ditambahkan."
                        : "Transaksi berhasil diperbarui."

            });

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
                                ? "bi-receipt"
                                : "bi-pencil-square"
                        } me-2`}></i>

                        {

                            mode === "add"

                                ? "Tambah Transaksi"

                                : "Edit Transaksi"

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

                    <FormTransaksi
                        transaksi={transaksi}
                        setTransaksi={setTransaksi}
                    />

                </div>

                <div className="modal-footer-custom">

                    <button
                        className="btn btn-outline-secondary"
                        onClick={onClose}
                    >

                        Batal

                    </button>

                    <button
                        className="btn btn-success"
                        onClick={simpan}
                    >

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

export default TransaksiModal;