import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import FormBarang from "../../components/barang/FormBarang";
import barangService from "../../services/barangService";

const BarangModal = ({
    show,
    onClose,
    onSuccess,
    mode,
    selectedData
}) => {

    const initialForm = {
        nama_barang: "",
        harga: "",
        stok: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (!show) return;

        if (mode === "edit" && selectedData) {

            setForm({
                nama_barang: selectedData.nama_barang,
                harga: selectedData.harga,
                stok: selectedData.stok
            });

        } else {

            setForm(initialForm);

        }

    }, [show, mode, selectedData]);

    useEffect(() => {

        const handleEsc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        document.addEventListener("keydown", handleEsc);

        return () => {

            document.removeEventListener("keydown", handleEsc);

        };

    }, []);

    if (!show) return null;

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (mode === "add") {

                await barangService.create(form);

                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data barang berhasil ditambahkan."
                });

            } else {

                await barangService.update(selectedData.id, form);

                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Data barang berhasil diperbarui."
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
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header-custom">

                    <h4>

                        <i className={`bi ${
                            mode === "add"
                                ? "bi-plus-circle-fill"
                                : "bi-pencil-square"
                        } me-2`}></i>

                        {
                            mode === "add"
                                ? "Tambah Data Barang"
                                : "Edit Data Barang"
                        }

                    </h4>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <FormBarang
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    title=""
                    buttonText={
                        mode === "add"
                            ? "Simpan"
                            : "Update"
                    }
                    buttonColor="btn-primary"
                    isModal={true}
                    onClose={onClose}
                />

            </div>

        </div>

    );

};

export default BarangModal;