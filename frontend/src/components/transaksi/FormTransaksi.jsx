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

        const response =
            await transaksiService.getBooking();

        setBooking(response.data.data);

    };

    const pilihBooking = async (id) => {

        setTransaksi({
            ...transaksi,
            booking_id: id
        });

        const response =
            await transaksiService.getDetail(id);

        setDetail(response.data.data);

        const total =
            response.data.data.reduce(
                (sum, item) =>
                    sum + Number(item.subtotal),
                0
            );

        setTransaksi(prev => ({
            ...prev,
            booking_id: id,
            total
        }));

    };

    return (

        <>

            <div className="mb-4">

                <label className="form-label">

                    Booking

                </label>

                <select

                    className="form-select"

                    value={transaksi.booking_id}

                    onChange={(e)=>pilihBooking(e.target.value)}

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


            <DetailTable

                detail={detail}

            />

            <div className="mt-4">

                <label className="form-label">

                Metode Pembayaran

                </label>

                <div className="form-check">

                <input

                type="radio"

                className="form-check-input"

                name="metode"

                value="Cash"

                checked={transaksi.metode_pembayaran==="Cash"}

                onChange={(e)=>

                setTransaksi({

                ...transaksi,

                metode_pembayaran:e.target.value

                })

                }

                />

                <label className="form-check-label">

                Cash

                </label>

                </div>

                <div className="form-check">

                <input

                type="radio"

                className="form-check-input"

                name="metode"

                value="Transfer"

                checked={transaksi.metode_pembayaran==="Transfer"}

                onChange={(e)=>

                setTransaksi({

                ...transaksi,

                metode_pembayaran:e.target.value

                })

                }

                />

                <label className="form-check-label">

                Transfer

                </label>

                </div>

                <div className="form-check">

                <input

                type="radio"

                className="form-check-input"

                name="metode"

                value="QRIS"

                checked={transaksi.metode_pembayaran==="QRIS"}

                onChange={(e)=>

                setTransaksi({

                ...transaksi,

                metode_pembayaran:e.target.value

                })

                }

                />

                <label className="form-check-label">

                QRIS

                </label>

                </div>

                </div>

                </>
                );

                };

                export default FormTransaksi;