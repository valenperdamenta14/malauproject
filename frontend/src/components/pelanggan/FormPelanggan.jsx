const FormPelanggan = ({
    form,
    handleChange,
    handleSubmit,
    buttonText,
    buttonColor,
    isModal = false,
    onClose
}) => {

    return (
        <>
            <div className={isModal ? "modal-body-custom" : "card-body"}>

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
                            placeholder="Masukkan nama pelanggan..."
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
                            placeholder="08xxxxxxxxxx"
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
                            placeholder="Masukkan alamat pelanggan..."
                        />

                    </div>

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

                </form>

            </div>

        </>
    );

};

export default FormPelanggan;