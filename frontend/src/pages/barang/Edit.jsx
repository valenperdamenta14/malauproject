import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormBarang from "../../components/barang/FormBarang";
import barangService from "../../services/barangService";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama_barang: "",
        harga: "",
        stok: ""
    });

    useEffect(() => {
        loadBarang();
    }, []);

    const loadBarang = async () => {
        try {
            const response = await barangService.getById(id);
            setForm(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await barangService.update(id, form);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data barang berhasil diubah."
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
                title="Edit Data Barang"
                buttonText="Update"
                buttonColor="btn-warning"
                navigate={navigate}
            />
        </MainLayout>
    );
};

export default Edit;