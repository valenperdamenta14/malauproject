import { useEffect, useState } from "react";

import barangService from "../../services/barangService";
import pelangganService from "../../services/pelangganService";

import BarangTable from "./BarangTable";

const FormBooking = ({
    booking,
    setBooking
}) => {

    const [barang, setBarang] = useState([]);

    const [pelanggan, setPelanggan] = useState([]);

    const [selectedBarang, setSelectedBarang] = useState("");

    const [qty, setQty] = useState(1);

    const [detail, setDetail] = useState([]);

    useEffect(() => {

        loadBarang();

        loadPelanggan();

    }, []);

    useEffect(() => {

        setBooking(prev => ({
            ...prev,
            detail
        }));

    }, [detail]);

    const loadBarang = async () => {

        try {

            const response = await barangService.getAll();

            setBarang(response.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const loadPelanggan = async () => {

        try {

            const response = await pelangganService.getAll();

            setPelanggan(response.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const barangDipilih =
        barang.find(item => item.id == selectedBarang);

    const tambahBarang = () => {

        if (!barangDipilih) return;

        const sudahAda =
            detail.find(item => item.barang_id == barangDipilih.id);

        if (sudahAda) {

            const update = detail.map(item => {

                if (item.barang_id == barangDipilih.id) {

                    const qtyBaru =
                        Number(item.qty) + Number(qty);

                    return {

                        ...item,

                        qty: qtyBaru,

                        subtotal:
                            qtyBaru *
                            Number(item.harga)

                    };

                }

                return item;

            });

            setDetail(update);

        } else {

            setDetail([

                ...detail,

                {

                    barang_id: barangDipilih.id,

                    nama_barang: barangDipilih.nama_barang,

                    harga: barangDipilih.harga,

                    qty: Number(qty),

                    subtotal:
                        Number(barangDipilih.harga) *
                        Number(qty)

                }

            ]);

        }

        setSelectedBarang("");

        setQty(1);

    };

    return (

        <>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Kode Booking

                    </label>

                    <input
                        className="form-control"
                        value={booking.kode_booking}
                        disabled
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Tanggal Booking

                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={booking.tanggal_booking}
                        onChange={(e)=>
                            setBooking({
                                ...booking,
                                tanggal_booking:e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">

                        Status

                    </label>

                    <select
                        className="form-select"
                        value={booking.status}
                        onChange={(e)=>
                            setBooking({
                                ...booking,
                                status:e.target.value
                            })
                        }
                    >

                        <option>Pending</option>

                        <option>Diproses</option>

                        <option>Selesai</option>

                        <option>Dibatalkan</option>

                    </select>

                </div>

            </div>

            <div className="mb-4">

                <label className="form-label">

                    Pelanggan

                </label>

                <select
                    className="form-select"
                    value={booking.pelanggan_id}
                    onChange={(e)=>
                        setBooking({
                            ...booking,
                            pelanggan_id:e.target.value
                        })
                    }
                >

                    <option value="">

                        Pilih Pelanggan

                    </option>

                    {

                        pelanggan.map(item=>(

                            <option
                                key={item.id}
                                value={item.id}
                            >

                                {item.nama}

                            </option>

                        ))

                    }

                </select>

            </div>

            <hr />

            <h5 className="mb-3">

                Tambah Barang

            </h5>

            <div className="row">

                <div className="col-md-5">

                    <label className="form-label">

                        Barang

                    </label>

                    <select
                        className="form-select"
                        value={selectedBarang}
                        onChange={(e)=>
                            setSelectedBarang(e.target.value)
                        }
                    >

                        <option value="">

                            Pilih Barang

                        </option>

                        {

                            barang.map(item=>(

                                <option
                                    key={item.id}
                                    value={item.id}
                                >

                                    {item.nama_barang}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="col-md-3">

                    <label className="form-label">

                        Harga

                    </label>

                    <input
                        className="form-control"
                        disabled
                        value={
                            barangDipilih
                            ?
                            Number(barangDipilih.harga)
                            .toLocaleString("id-ID")
                            :
                            ""
                        }
                    />

                </div>

                <div className="col-md-2">

                    <label className="form-label">

                        Qty

                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={qty}
                        onChange={(e)=>
                            setQty(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-2 d-flex align-items-end">

                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={tambahBarang}
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Tambah

                    </button>

                </div>

            </div>

            <BarangTable
                detail={detail}
                setDetail={setDetail}
            />

        </>

    );

};

export default FormBooking;