import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import dashboardService from "../services/dashboardService";

const Dashboard = () => {

    const [data, setData] = useState({
        barang: 0,
        pelanggan: 0,
        booking: 0,
        pending: 0,
        selesai: 0,
        pendapatan: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await dashboardService.getSummary();

            setData(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            {/* Header */}

            <div className="mb-4">

                <h2 className="fw-bold">

                    Dashboard

                </h2>

                <p className="text-muted">

                    Selamat datang di Sistem Booking Online.

                </p>

            </div>

            {/* Statistik */}

            <div className="row">

                <div className="col-lg-3 col-md-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>

                                <small className="text-muted">

                                    Total Barang

                                </small>

                                <h2 className="fw-bold mb-0">

                                    {data.barang}

                                </h2>

                            </div>

                            <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "60px",
                                    height: "60px"
                                }}
                            >

                                <i className="bi bi-box-seam fs-3"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>

                                <small className="text-muted">

                                    Total Pelanggan

                                </small>

                                <h2 className="fw-bold mb-0">

                                    {data.pelanggan}

                                </h2>

                            </div>

                            <div
                                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "60px",
                                    height: "60px"
                                }}
                            >

                                <i className="bi bi-people-fill fs-3"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>

                                <small className="text-muted">

                                    Total Booking

                                </small>

                                <h2 className="fw-bold mb-0">

                                    {data.booking}

                                </h2>

                            </div>

                            <div
                                className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "60px",
                                    height: "60px"
                                }}
                            >

                                <i className="bi bi-calendar-check fs-3"></i>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>

                                <small className="text-muted">

                                    Pendapatan

                                </small>

                                <h5 className="fw-bold text-success mb-0">

                                    Rp {Number(data.pendapatan).toLocaleString("id-ID")}

                                </h5>

                            </div>

                            <div
                                className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "60px",
                                    height: "60px"
                                }}
                            >

                                <i className="bi bi-cash-stack fs-3"></i>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Status Booking */}

            <div className="row">

                <div className="col-lg-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body text-center">

                            <i
                                className="bi bi-hourglass-split text-warning"
                                style={{
                                    fontSize: "55px"
                                }}
                            ></i>

                            <h5 className="mt-3">

                                Booking Pending

                            </h5>

                            <h1 className="fw-bold text-warning">

                                {data.pending}

                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6 mb-4">

                    <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                            borderRadius: "15px"
                        }}
                    >

                        <div className="card-body text-center">

                            <i
                                className="bi bi-check-circle-fill text-success"
                                style={{
                                    fontSize: "55px"
                                }}
                            ></i>

                            <h5 className="mt-3">

                                Booking Selesai

                            </h5>

                            <h1 className="fw-bold text-success">

                                {data.selesai}

                            </h1>

                        </div>

                    </div>

                </div>

            </div>

            {/* Informasi */}

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h5 className="fw-bold mb-3">

                        Ringkasan Sistem

                    </h5>

                    <p className="text-muted mb-0">

                        Dashboard ini menampilkan informasi utama mengenai data barang,
                        pelanggan, booking, transaksi serta pendapatan yang diperoleh.
                        Gunakan menu di sebelah kiri untuk mengelola seluruh data
                        pada sistem Booking Online.

                    </p>

                </div>

            </div>

        </MainLayout>

    );

};

export default Dashboard;