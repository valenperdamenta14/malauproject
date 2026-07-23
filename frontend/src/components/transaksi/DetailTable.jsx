const DetailTable = ({ detail }) => {

    const total = detail.reduce(
        (sum, item) => sum + Number(item.subtotal),
        0
    );

    return (

        <div className="card shadow-sm border-0 mt-4">

            <div className="card-header bg-light">

                <h6 className="mb-0">

                    <i className="bi bi-cart-check me-2"></i>

                    Detail Booking

                </h6>

            </div>

            <div className="card-body p-0">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-dark">

                        <tr>

                            <th width="60">

                                No

                            </th>

                            <th>

                                Barang

                            </th>

                            <th width="160">

                                Harga

                            </th>

                            <th width="100">

                                Qty

                            </th>

                            <th width="180">

                                Subtotal

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            detail.length > 0 ?

                                detail.map((item, index) => (

                                    <tr key={index}>

                                        <td>

                                            {index + 1}

                                        </td>

                                        <td>

                                            <strong>

                                                {item.nama_barang}

                                            </strong>

                                        </td>

                                        <td>

                                            Rp {Number(item.harga).toLocaleString("id-ID")}

                                        </td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {item.qty}

                                            </span>

                                        </td>

                                        <td>

                                            <strong>

                                                Rp {Number(item.subtotal).toLocaleString("id-ID")}

                                            </strong>

                                        </td>

                                    </tr>

                                ))

                            :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-5 text-muted"
                                    >

                                        <i
                                            className="bi bi-cart-x"
                                            style={{
                                                fontSize: "50px",
                                                display: "block",
                                                marginBottom: "10px"
                                            }}
                                        ></i>

                                        Belum ada detail transaksi.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

            <div className="card-footer bg-white">

                <div className="d-flex justify-content-end">

                    <div
                        className="text-end"
                        style={{
                            minWidth: "250px"
                        }}
                    >

                        <small className="text-muted">

                            Total Pembayaran

                        </small>

                        <h3 className="fw-bold text-success mt-2">

                            Rp {total.toLocaleString("id-ID")}

                        </h3>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DetailTable;