import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormPelanggan from "../../components/pelanggan/FormPelanggan";
import pelangganService from "../../services/pelangganService";

const Tambah = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: "",
        no_hp: "",
        alamat: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await pelangganService.create(form);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data pelanggan berhasil ditambahkan."
            });

            navigate("/pelanggan");

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
            <FormPelanggan
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                title="Tambah Data Pelanggan"
                buttonText="Simpan"
                buttonColor="btn-primary"
                navigate={navigate}
            />
        </MainLayout>
    );
};

export default Tambah;