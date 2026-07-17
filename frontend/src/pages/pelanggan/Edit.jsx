import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormPelanggan from "../../components/pelanggan/FormPelanggan";
import pelangganService from "../../services/pelangganService";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: "",
        no_hp: "",
        alamat: ""
    });

    useEffect(() => {
        loadPelanggan();
    }, []);

    const loadPelanggan = async () => {
        try {
            const response = await pelangganService.getById(id);
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
            await pelangganService.update(id, form);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data pelanggan berhasil diubah."
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
                title="Edit Data Pelanggan"
                buttonText="Update"
                buttonColor="btn-warning"
                navigate={navigate}
            />
        </MainLayout>
    );
};

export default Edit;