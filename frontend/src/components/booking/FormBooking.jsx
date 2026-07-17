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

    const loadBarang = async () => {

        const response = await barangService.getAll();

        setBarang(response.data.data);

    };

    const loadPelanggan = async () => {

        const response = await pelangganService.getAll();

        setPelanggan(response.data.data);

    };

    const barangDipilih = barang.find(
        item => item.id == selectedBarang
    );

    const tambahBarang = () => {

        if (!barangDipilih) return;

        const subtotal =
            Number(barangDipilih.harga) *
            Number(qty);

        setDetail([
            ...detail,
            {
                barang_id: barangDipilih.id,
                nama_barang: barangDipilih.nama_barang,
                harga: barangDipilih.harga,
                qty,
                subtotal
            }
        ]);

        setSelectedBarang("");

        setQty(1);

    };

    useEffect(() => {

        setBooking({
            ...booking,
            detail
        });

    }, [detail]);

    return (
        <>
            <div className="mb-3">
                <label className="form-label">
                    Pelanggan
                </label>

                <select
                    className="form-select"
                    value={booking.pelanggan_id}
                    onChange={(e)=>setBooking({
                        ...booking,
                        pelanggan_id:e.target.value
                    })}
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

            <div className="row">
                <div className="col-md-5">
                    <label>
                        Barang
                    </label>

                    <select
                        className="form-select"
                        value={selectedBarang}
                        onChange={(e)=>setSelectedBarang(e.target.value)}
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
                    <label>
                        Harga
                    </label>

                    <input
                        className="form-control"
                        value={
                        barangDipilih
                        ?
                        Number(barangDipilih.harga).toLocaleString("id-ID")
                        :
                        ""
                        }

                        disabled

                    />

                </div>

                <div className="col-md-2">

                    <label>
                        Qty
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={qty}
                        onChange={(e)=>setQty(e.target.value)}
                    />
                </div>

                <div className="col-md-2 d-flex align-items-end">
                    <button
                        className="btn btn-primary w-100"
                        type="button"
                        onClick={tambahBarang}
                    >
                        Tambah
                    </button>
                </div>

                <BarangTable
                    detail={detail}
                    setDetail={setDetail}
                />

                <h4 className="text-end mt-3">
                    Total :
                    Rp {
                    detail
                    .reduce(
                    (total,item)=>
                    total+Number(item.subtotal),
                    0
                    )
                    .toLocaleString("id-ID")
                    }
                </h4>
            </div>
        </>
    )
};

export default FormBooking;