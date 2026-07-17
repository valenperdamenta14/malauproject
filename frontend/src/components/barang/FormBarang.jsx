const FormBarang = ({
    form,
    handleChange,
    handleSubmit,
    title,
    buttonText,
    buttonColor,
    navigate
}) => {
    return (
        <div className="card shadow-sm border-0">
            <div className={`card-header ${buttonColor} text-white`}>
                <h5 className="mb-0">
                    {title}
                </h5>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Nama Barang
                        </label>

                        <input
                            type="text"
                            name="nama_barang"
                            className="form-control"
                            value={form.nama_barang}
                            onChange={handleChange}
                            placeholder="Masukkan nama barang"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Harga
                        </label>

                        <input
                            type="number"
                            name="harga"
                            className="form-control"
                            value={form.harga}
                            onChange={handleChange}
                            placeholder="Masukkan harga"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Stok
                        </label>

                        <input
                            type="number"
                            name="stok"
                            className="form-control"
                            value={form.stok}
                            onChange={handleChange}
                            placeholder="Masukkan stok"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn ${buttonColor} me-2`}
                    >
                        {buttonText}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/barang")}
                    >
                        Kembali
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormBarang;