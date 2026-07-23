import Swal from "sweetalert2";

const BarangTable = ({
    detail,
    setDetail
}) => {

    const hapusBarang = (index) => {

        Swal.fire({

            title: "Hapus Barang?",

            text: "Barang akan dihapus dari daftar booking.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Ya",

            cancelButtonText: "Batal"

        }).then((result) => {

            if (!result.isConfirmed) return;

            const data = [...detail];

            data.splice(index, 1);

            setDetail(data);

        });

    };

    const total = detail.reduce(

        (sum, item) => sum + Number(item.subtotal),

        0

    );

    return (

        <div className="mt-4">

            <div className="card border-0 shadow-sm">

                <div className="card-header bg-light">

                    <h6 className="mb-0">

                        <i className="bi bi-cart-check me-2"></i>

                        Daftar Barang Booking

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

                                <th width="150">

                                    Harga

                                </th>

                                <th width="100">

                                    Qty

                                </th>

                                <th width="180">

                                    Subtotal

                                </th>

                                <th width="80">

                                    Aksi

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

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => hapusBarang(index)}
                                                >

                                                    <i className="bi bi-trash"></i>

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="6"
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

                                            Belum ada barang ditambahkan.

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="d-flex justify-content-end mt-4">

                <div
                    className="card border-primary shadow-sm"
                    style={{
                        minWidth: "300px"
                    }}
                >

                    <div className="card-body text-end">

                        <small className="text-muted">

                            Total Booking

                        </small>

                        <h3 className="text-primary fw-bold mt-2">

                            Rp {total.toLocaleString("id-ID")}

                        </h3>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default BarangTable;