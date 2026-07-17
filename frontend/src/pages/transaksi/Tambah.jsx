import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import FormTransaksi from "../../components/transaksi/FormTransaksi";
import transaksiService from "../../services/transaksiService";

const Tambah = () => {

    const navigate = useNavigate();

    const today =
        new Date().toISOString().split("T")[0];

    const [transaksi, setTransaksi] = useState({

        booking_id: "",

        tanggal_transaksi: today,

        total: 0,

        metode_pembayaran: "Cash"

    });

    const simpan = async () => {

        if (transaksi.booking_id === "") {

            Swal.fire({
                icon: "warning",
                title: "Pilih booking terlebih dahulu"
            });

            return;

        }

        try {

            await transaksiService.create(transaksi);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Transaksi berhasil disimpan."
            });

            navigate("/transaksi");

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

                <div className="card-header bg-success text-white">

                    <h5 className="mb-0">

                        Transaksi Booking

                    </h5>

                </div>

                <div className="card-body">

                    <div className="mb-4">

                        <label className="form-label">

                            Tanggal Transaksi

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={transaksi.tanggal_transaksi}
                            onChange={(e) =>
                                setTransaksi({
                                    ...transaksi,
                                    tanggal_transaksi: e.target.value
                                })
                            }
                        />

                    </div>

                    <FormTransaksi
                        transaksi={transaksi}
                        setTransaksi={setTransaksi}
                    />

                    <div className="text-end mt-4">

                        <button
                            className="btn btn-success"
                            onClick={simpan}
                        >

                            Simpan Transaksi

                        </button>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default Tambah;