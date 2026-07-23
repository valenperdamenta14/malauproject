import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import pelangganService from "../../services/pelangganService";
import FormPelanggan from "../../components/pelanggan/FormPelanggan";

const PelangganModal = ({
    show,
    onClose,
    onSuccess,
    mode,
    selectedData
}) => {

    const initialForm = {
        nama: "",
        no_hp: "",
        alamat: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (!show) return;

        if (mode === "edit" && selectedData) {

            setForm({

                nama: selectedData.nama,

                no_hp: selectedData.no_hp,

                alamat: selectedData.alamat

            });

        } else {

            setForm(initialForm);

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

                await pelangganService.create(form);

                Swal.fire({

                    icon: "success",

                    title: "Berhasil",

                    text: "Data pelanggan berhasil ditambahkan."

                });

            } else {

                await pelangganService.update(selectedData.id, form);

                Swal.fire({

                    icon: "success",

                    title: "Berhasil",

                    text: "Data pelanggan berhasil diperbarui."

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
                                ? "bi-person-plus-fill"
                                : "bi-pencil-square"
                        } me-2`}></i>

                        {
                            mode === "add"
                                ? "Tambah Pelanggan"
                                : "Edit Pelanggan"
                        }

                    </h4>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <FormPelanggan
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
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

export default PelangganModal;