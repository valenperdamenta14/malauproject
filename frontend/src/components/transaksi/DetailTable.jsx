const DetailTable = ({ detail }) => {

    const total = detail.reduce(
        (sum, item) => sum + Number(item.subtotal),
        0
    );

    return (
        <>
            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th width="60">No</th>

                        <th>Barang</th>

                        <th width="150">Harga</th>

                        <th width="80">Qty</th>

                        <th width="170">Subtotal</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        detail.length > 0 ?

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

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center"
                                >

                                    Belum ada data

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

            <div className="text-end">

                <h3>

                    Total :

                    <span className="text-primary ms-2">

                        Rp {total.toLocaleString("id-ID")}

                    </span>

                </h3>

            </div>

        </>
    );

};

export default DetailTable;