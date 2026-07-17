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

        const response =
            await dashboardService.getSummary();

        setData(response.data.data);

    };

    return (

        <MainLayout>

            <h3 className="mb-4">

                Dashboard

            </h3>

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6>Total Barang</h6>

                            <h2>{data.barang}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6>Total Pelanggan</h6>

                            <h2>{data.pelanggan}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6>Total Booking</h6>

                            <h2>{data.booking}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <h6>Pendapatan</h6>

                            <h4>

                                Rp {Number(data.pendapatan).toLocaleString("id-ID")}

                            </h4>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-md-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5>

                                Booking Pending

                            </h5>

                            <h1 className="text-warning">

                                {data.pending}

                            </h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5>

                                Booking Selesai

                            </h5>

                            <h1 className="text-success">

                                {data.selesai}

                            </h1>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

};

export default Dashboard;