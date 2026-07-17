const FormPelanggan = ({
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
                            Nama Pelanggan
                        </label>

                        <input
                            type="text"
                            name="nama"
                            className="form-control"
                            value={form.nama}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Nomor HP
                        </label>

                        <input
                            type="text"
                            name="no_hp"
                            className="form-control"
                            value={form.no_hp}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Alamat
                        </label>

                        <textarea
                            name="alamat"
                            rows="4"
                            className="form-control"
                            value={form.alamat}
                            onChange={handleChange}
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
                        onClick={() => navigate("/pelanggan")}
                    >
                        Kembali
                    </button>

                </form>
            </div>
        </div>
    );
};

export default FormPelanggan;