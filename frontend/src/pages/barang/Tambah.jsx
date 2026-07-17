import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormBarang from "../../components/barang/FormBarang";
import barangService from "../../services/barangService";

const Tambah = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama_barang: "",
        harga: "",
        stok: ""
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
            await barangService.create(form);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data barang berhasil ditambahkan."
            });

            navigate("/barang");

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
            <FormBarang
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                title="Tambah Data Barang"
                buttonText="Simpan"
                buttonColor="btn-primary"
                navigate={navigate}
            />
        </MainLayout>
    );
};

export default Tambah;