import { useEffect, useState } from "react";

import transaksiService from "../../services/transaksiService";
import DetailTable from "./DetailTable";

const FormTransaksi = ({
    transaksi,
    setTransaksi
}) => {

    const [booking, setBooking] = useState([]);

    const [detail, setDetail] = useState([]);

    useEffect(() => {

        loadBooking();

    }, []);

    const loadBooking = async () => {

        try {

            const response =
                await transaksiService.getBooking();

            setBooking(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const pilihBooking = async (id) => {

        try {

            const response =
                await transaksiService.getDetail(id);

            const data = response.data.data;

            setDetail(data);

            const total =
                data.reduce(
                    (sum, item) =>
                        sum + Number(item.subtotal),
                    0
                );

            setTransaksi(prev => ({

                ...prev,

                booking_id: id,

                total

            }));

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <div className="row">

                <div className="col-md-6 mb-4">

                    <label className="form-label">

                        Tanggal Transaksi

                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={transaksi.tanggal_transaksi}
                        onChange={(e)=>
                            setTransaksi({
                                ...transaksi,
                                tanggal_transaksi:e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6 mb-4">

                    <label className="form-label">

                        Booking

                    </label>

                    <select
                        className="form-select"
                        value={transaksi.booking_id}
                        onChange={(e)=>
                            pilihBooking(e.target.value)
                        }
                    >

                        <option value="">

                            Pilih Booking

                        </option>

                        {

                            booking.map(item=>(

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.kode_booking} - {item.nama}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <DetailTable
                detail={detail}
            />

            <div className="card border-0 shadow-sm mt-4">

                <div className="card-header bg-light">

                    <strong>

                        Metode Pembayaran

                    </strong>

                </div>

                <div className="card-body">

                    <div className="form-check mb-3">

                        <input
                            className="form-check-input"
                            type="radio"
                            value="Cash"
                            name="metode"
                            checked={
                                transaksi.metode_pembayaran === "Cash"
                            }
                            onChange={(e)=>
                                setTransaksi({
                                    ...transaksi,
                                    metode_pembayaran:e.target.value
                                })
                            }
                        />

                        <label className="form-check-label">

                            💵 Cash

                        </label>

                    </div>

                    <div className="form-check mb-3">

                        <input
                            className="form-check-input"
                            type="radio"
                            value="Transfer"
                            name="metode"
                            checked={
                                transaksi.metode_pembayaran==="Transfer"
                            }
                            onChange={(e)=>
                                setTransaksi({
                                    ...transaksi,
                                    metode_pembayaran:e.target.value
                                })
                            }
                        />

                        <label className="form-check-label">

                            🏦 Transfer Bank

                        </label>

                    </div>

                    <div className="form-check">

                        <input
                            className="form-check-input"
                            type="radio"
                            value="QRIS"
                            name="metode"
                            checked={
                                transaksi.metode_pembayaran==="QRIS"
                            }
                            onChange={(e)=>
                                setTransaksi({
                                    ...transaksi,
                                    metode_pembayaran:e.target.value
                                })
                            }
                        />

                        <label className="form-check-label">

                            📱 QRIS

                        </label>

                    </div>

                </div>

            </div>

        </>

    );

};

export default FormTransaksi;