const BarangTable = ({
    detail,
    setDetail
}) => {

    const hapus = (index) => {

        const data = [...detail];

        data.splice(index, 1);

        setDetail(data);

    };

    return (

        <table className="table table-bordered mt-4">

            <thead className="table-dark">

                <tr>

                    <th>No</th>

                    <th>Barang</th>

                    <th>Harga</th>

                    <th>Qty</th>

                    <th>Subtotal</th>

                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody>

                {
                    detail.map((item, index) => (

                        <tr key={index}>

                            <td>{index + 1}</td>

                            <td>{item.nama_barang}</td>

                            <td>

                                Rp {Number(item.harga).toLocaleString("id-ID")}

                            </td>

                            <td>

                                {item.qty}

                            </td>

                            <td>

                                Rp {Number(item.subtotal).toLocaleString("id-ID")}

                            </td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => hapus(index)}
                                >

                                    Hapus

                                </button>

                            </td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

    );

};

export default BarangTable;