const FormBarang = ({
    form,
    handleChange,
    handleSubmit,
    title,
    buttonText,
    buttonColor,
    isModal = false,
    onClose
}) => {

    return (
        <>
            {!isModal && (
                <div className={`card-header ${buttonColor} text-white`}>
                    <h5 className="mb-0">
                        {title}
                    </h5>
                </div>
            )}

            <div className={isModal ? "modal-body-custom" : "card-body"}>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Nama Barang
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="nama_barang"
                            value={form.nama_barang}
                            onChange={handleChange}
                            placeholder="Masukkan nama barang..."
                            autoComplete="off"
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Harga
                        </label>

                        <div className="input-group">

                            <span className="input-group-text">
                                Rp
                            </span>

                            <input
                                type="number"
                                className="form-control"
                                name="harga"
                                value={form.harga}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Stok
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="stok"
                            value={form.stok}
                            onChange={handleChange}
                            placeholder="0"
                            required
                        />

                    </div>

                    {
                        isModal ?

                        <div className="modal-footer-custom">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                            >
                                <i className="bi bi-x-circle me-2"></i>
                                Batal
                            </button>

                            <button
                                type="submit"
                                className={`btn ${buttonColor}`}
                            >
                                <i className={`bi ${
                                    buttonText === "Update"
                                    ? "bi-check-circle"
                                    : "bi-save"
                                } me-2`}></i>

                                {buttonText}
                            </button>

                        </div>

                        :

                        <>
                            <button
                                type="submit"
                                className={`btn ${buttonColor} me-2`}
                            >
                                {buttonText}
                            </button>
                        </>

                    }

                </form>

            </div>

        </>
    );

};

export default FormBarang;